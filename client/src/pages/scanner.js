import { useState, useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api'
import SearchBar from '../molecules/SearchBar'
import InspectionBox from '../molecules/InspectionBox'
import Scanner from '../organisms/Scanner'
import Pantry from '../organisms/Pantry'
import scannerReducer from '../reducers/scanner.reducer';
import SearchBar from '../modules/SearchBar'
import InspectionBox from '../modules/InspectionBox'
import api from '../api'
import Pantry from '../organisms/Pantry'
import pantryReducer from '../reducers/pantry.reducer';

const ScannerNew = () => {
    let history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, dispatch] = useReducer(scannerReducer,{foods:[],selected:[]});
    const [pantry, pantryDispatch] = useReducer(pantryReducer,[]);

    async function handleSearch() {
        if( searchTerm === '' ) {
            dispatch({
                type:'scanner/init',
                payload:( await api.upc.getAll() )
            });
        } else {
            dispatch({
                type:'scanner/init',
                payload:( await api.upcSearch.post({query: searchTerm, requireAllWords:false}) )
            });
        }
    }

    async function handleDone() {
        await pantry.forEach(async (item) => {
            await api.pantry.post(item)
                .then(() => {console.log('Accepted: '+item.food.description)})
                .catch((err) => console.log('Rejected: '+err));
            console.log(item.food.description);
        });
        history.push('/PantryNew')
    }

    function handleAccept(item) {
        !(pantry.some(inv => inv.food._id === item._id)) &&
            pantryDispatch({ type:'pantry/add', payload:({quantity:1,food:item}) })
    }

    return (
        <div id='Scanner' className='container-fluid'>
            <SearchBar search={searchTerm} setSearch={setSearchTerm} />
            <Scanner.Buttons handleSearch={handleSearch} handleDone={handleDone} />
            <Scanner.Table items={searchResults.foods} handleAccept={handleAccept} />
            {(pantry.length>0) && <Pantry.Table items={pantry} dispatch={pantryDispatch} />}
            <InspectionBox name='Pantry'>
                <pre>{JSON.stringify(pantry, null, 1)}</pre>
            </InspectionBox>
            <InspectionBox name='SearchResults'>
                <pre>{JSON.stringify(searchResults, null, 1)}</pre>
            </InspectionBox>
            <InspectionBox name='Selected'>
                <pre>{JSON.stringify(searchResults.selected, null, 1)}</pre>
            </InspectionBox>
        </div>
    )
}

export default ScannerNew