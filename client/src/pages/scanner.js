import { useState, useReducer, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../api'
import SearchInput from '../atoms/SearchInput'
import Buttons from '../atoms/Buttons'
import ButtonGroup from '../atoms/ButtonGroup'
import InspectionBox from '../molecules/InspectionBox'
import Scanner from '../organisms/Scanner'
import Pantry from '../organisms/Pantry'
import scannerReducer from '../reducers/scanner.reducer';
import pantryReducer from '../reducers/pantry.reducer';

const ScannerNew = () => {
    let history = useHistory();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, dispatch] = useReducer(scannerReducer,{foods:[],selected:[]});
    const [pantry, pantryDispatch] = useReducer(pantryReducer,[]);

    async function handleSearch() {
        if( searchTerm === '' ) {
            alert('Please enter a UPC or search term.');
            // dispatch({
            //     type:'scanner/init',
            //     payload:( await api.upc.getAll() )
            // });
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
        history.push('/Pantry')
    }

    function handleReset() {
        dispatch({
            type:'scanner/reset',
            payload:( {foods:[],selected:[]} )
        });
        setSearchTerm('');
    }

    // useEffect(async () => {
    //     let res = await api.upcSearch.post({query: searchTerm, requireAllWords:false});
    //     setSearchResults(res);
    // },[searchTerm])

    return (
        <div id='Scanner' className='container-fluid'>
            <SearchInput label={'Search :'} placeholder={'Enter part of a UPC or search term'} search={searchTerm} setSearch={setSearchTerm} reset={handleReset} />
            
            <ButtonGroup>
                <Buttons.Search callback={handleSearch} disabled={(searchTerm === '')} />
                {/* <Buttons.Scan callback={null} disabled /> */}
            </ButtonGroup>

            {(searchResults.foods.length>0) && 
                <Scanner.Tables.Standard items={searchResults.foods} dispatch={pantryDispatch} pantry={pantry} />
            }
            
            {(pantry.length>0) && 
                <Pantry.Tables.Standard items={pantry} dispatch={pantryDispatch} />
            }
            
            <ButtonGroup>
                <Buttons.Process callback={handleDone} disabled={pantry.length==0} />
            </ButtonGroup>


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