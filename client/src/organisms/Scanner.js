import Table from '../atoms/Table'
import Buttons from '../atoms/Buttons'

const Scanner = {
    Tables: {
        Standard: (props) => <Table Head={Scanner.Heads.Standard} Row={Scanner.Rows.SearchResults} {...props} />,
    },
    Rows: {
        SearchResults: function (props) {
            const { item, dispatch, pantry } = props;

            function handleAccept() {
                !(pantry.some(inv => inv.food._id === item._id)) &&
                    dispatch({ type:'pantry/add', payload:({quantity:1,food:item}) })
            }

            const Action = [Buttons.Accept,handleAccept];
            const ActionButton = Action[0];

            return [
                <td key={0}>{item.upc}</td>,
                <td key={1}>{item.description}</td>,
                <td key={2}>{item.labelNutrients['calories']}</td>,
                <td key={3}></td>,
                <td key={4}>{item.brandOwner}</td>,
                <td key={5}>{item.gtinUpc}</td>,
                <td key={6}><ActionButton width='col-md-6' callback={Action[1]} /></td>,
            ]
        },
    },
    Heads: {
        Standard: function ({}) {
            return [
                <th key={0}>UPC</th>,
                <th key={1}>description</th>,
                <th key={2}>Calories</th>,
                <th key={3}>Action</th>,
                <th key={4}><strike>Brand Owner</strike></th>,
                <th key={5}><strike>GTIN UPC</strike></th>,
                <th key={6}>Accept?</th>,
            ]
        },
    },
}

export default Scanner