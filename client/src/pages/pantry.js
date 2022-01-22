import { useState, useReducer, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api'
import Pantry from '../organisms/Pantry'
import SearchBar from '../molecules/SearchBar'
import InspectionBox from '../molecules/InspectionBox'
import pantryReducer from '../reducers/pantry.reducer';
import api from '../api'

const PantryPageNew = () => {
    let history = useHistory();
    const [items, dispatch] = useReducer(pantryReducer,[]);
    const [filterValue, setFilterValue] = useState('');
    let filtered = items.filter(({ food }) => food.description.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

    function handleAdd() {
        history.push('/ScannerNew');
    }

    useEffect(() => {
      async function fetch() {
        dispatch({type:'pantry/fetch',payload:(await api.pantry.getAll())})
      }
      fetch()
    },[])

    return (
        <div id='Pantry' className='container-fluid'>
            <SearchBar search={filterValue} setSearch={setFilterValue} />
            <Pantry.Buttons handleAdd={handleAdd} />
            <Pantry.Table items={filtered} dispatch={dispatch} />
            <InspectionBox name='Filtered Items'>
                <pre>{JSON.stringify(filtered, null, 1)}</pre>
            </InspectionBox>
        </div>
    )
}

export default PantryPageNew;
