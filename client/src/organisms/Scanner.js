import List from '../atoms/List'
import Buttons from '../atoms/Buttons'
import ButtonGroup from '../molecules/ButtonGroup'
import List from '../atoms/List'

const Scanner = {
    Buttons: function ({ handleSearch, handleDone }) {
        return (
            <ButtonGroup>
                <Buttons.Search callback={handleSearch} />
                <Buttons.Scan callback={null} disabled />
                <Buttons.Done callback={handleDone} />
            </ButtonGroup>
        )
    },
    Table: function ({ items, handleAccept }) {
        return (
            <div className='row border border-info mt-3'>
                <div className='container-fluid p-2 border border-info'>
                    <List Head={Scanner.Head}>
                        {items.map((item,i) => {
                            return (
                                <tr key={i}>
                                    <Scanner.SearchResults item={item} handleAccept={() => handleAccept(item)} />
                                </tr>
                            )
                        })}
                    </List>
                </div>
            </div>
        )
    },
    SearchResults: function ({ item, handleAccept }) {
            return [
                <td key={0}>{item.upc}</td>,
                <td key={1}>{item.description}</td>,
                <td key={2}>{item.labelNutrients['calories']}</td>,
                <td key={3}></td>,
                <td key={4}>{item.brandOwner}</td>,
                <td key={5}>{item.gtinUpc}</td>,
                <td key={6}><Buttons.Accept callback={handleAccept} /></td>,
            ]
    },
    Head: function ({}) {
        return [
            <td key={0}>UPC</td>,
            <td key={1}>description</td>,
            <td key={2}>Calories</td>,
            <td key={3}>Action</td>,
            <td key={4}><strike>Brand Owner</strike></td>,
            <td key={5}><strike>GTIN UPC</strike></td>,
            <td key={6}>Accept?</td>,
        ]
    },
}

export default Scanner