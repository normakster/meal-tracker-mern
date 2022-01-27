import { useState, useReducer, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api'
import SearchInput from '../atoms/SearchInput'
import Buttons from '../atoms/Buttons'
import ButtonGroup from '../atoms/ButtonGroup'
import InspectionBox from '../molecules/InspectionBox'
import Pantry from '../organisms/Pantry'
import pantryReducer from '../reducers/pantry.reducer';

const PantryPageNew = () => {
    let history = useHistory();
    const [items, dispatch] = useReducer(pantryReducer,[]);
    const [filterValue, setFilterValue] = useState('');
    let filtered = items.filter(({ food }) => food.description.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1);

    function handleAdd() {
        history.push('/Scanner');
    }

    useEffect(() => {
      async function fetch() {
        dispatch({type:'pantry/fetch',payload:(await api.pantry.getAll())})
      }
      fetch()
    },[])

    return (
        <div id='Pantry' className='container-fluid'>
            <SearchInput label={'Filter :'} search={filterValue} setSearch={setFilterValue} reset={() => setFilterValue('')} />
            
            {(filtered.length>0) && 
                <Pantry.Tables.Standard items={filtered} dispatch={dispatch} />
            }

            <ButtonGroup>
                <Buttons.Add callback={handleAdd} />
            </ButtonGroup>
            

            <InspectionBox name='Filtered Items'>
                <pre>{JSON.stringify(filtered, null, 1)}</pre>
            </InspectionBox>
        </div>
    )
}

export default PantryPageNew;
