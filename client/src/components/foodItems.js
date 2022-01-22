import { useReducer, useEffect, useState, useContext } from 'react';
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import api from './../api'
import { Assembled, InputItem, FormItem } from '../services/utilities'
import { nestMerge, nest, str2obj, merge, update, updateObject, copyDeep } from '../services/utilities'
import { XsetItem } from './scanner'


const FormShort = ({ title, item, dispatch, index }) => {
}

export const Meta = (props) => {
  const { dispatch, ...rest } = props;
  const keys = ['upc','description','servingSize'];
  const handleChange = e => dispatch({type:'food/update',payload:{key:e.target.name,value:e.target.value}});
  return <FoodForm keys={keys} handleChange={handleChange} {...rest} />
}

export const Nutrient = (props) => {
  const { dispatch, ...rest } = props;
  const keys = ['fat','carbohydrates','protein','calories'];
  const handleChange = e => dispatch({type:'food_nutri/update',payload:{key:e.target.name,value:e.target.value}});
  return <FoodForm keys={keys} handleChange={handleChange} {...rest} />
}

const FoodForm = (props) => {
  const { item, keys, handleChange } = props;
  return (
    <Col>
      {keys.map((key,i) => {
        return <div key={i}>
          <input type='text'
            className={''}
            placeholder={key}
            name={key}
            value={item[key]}
            onChange={handleChange}
          />
        </div>
      })}
    </Col>
  )
}


const FoodItems = {
  Basic: {
    Head: function () {
      return [
        <td key={0}>upc</td>,
        <td key={1}>description</td>,
        <td key={2}>Calories</td>,
        <td key={3}>Action</td>,
      ]
    },
    Body: function ({ item }) {
      return [
        <td key={0}>{item.upc}</td>,
        <td key={1}>{item.description}</td>,
        <td key={2}>{item.labelNutrients['calories']}</td>,
        <td key={3}></td>,
      ]
    },
    Buttons: {},
    Table: ({ items }) => <Assembled Head={FoodItems.Basic.Head} Body={FoodItems.Basic.Body} items={items} />,
  },
  Selected: {
    Head: function () {
      return [
        <td key={0}>Quantity</td>,
        <td key={1}>Name</td>,
        <td key={2}>Brand Owner</td>,
        <td key={3}>Accept?</td>,
        <td key={4}>Reject?</td>,
      ]
    },
    Body: function ({ item }) {
      const setItem = useContext(XsetItem);
      const [quantity, setQuantity] = useState('');
      async function handleAccept() {
        const accepted = { quantity: quantity || 0, food: item };
        await api.pantry.post(accepted)
        .then(() => {
          // alert('Accepting...' + JSON.stringify(accepted, null, 1))
          setItem(null);
        })
        .catch((err) => {
          console.log(err);
          alert('NOT Accepted.');
        })
      }
      function handleReject() {
        alert('Rejecting...');
        setItem(null);
      }
      return [
        <td key={0}>
          <input type='text' name='quantity' className=''
            value={quantity} onChange={(e) => {setQuantity(e.target.value)}}
            placeholder='Units (required)'
          />
        </td>,
        <td key={1}>{item.description}</td>,
        <td key={2}>{item.brandOwner}</td>,
        <td key={3}>
          {FoodItems.Selected.Buttons.Accept(handleAccept)}
        </td>,
        <td key={4}>
          {FoodItems.Selected.Buttons.Reject(handleReject)}
        </td>,
      ]
    },
    Table: ({ items }) => <Assembled Head={FoodItems.Selected.Head} Body={FoodItems.Selected.Body} items={items} /> ,
    Buttons: {
      Accept:  (callback) => <Button variant={'success'} onClick={callback} >Save</Button>,
      Reject:  (callback) => <Button variant={'danger'} onClick={callback} >X</Button>
    }
  },
  SearchResults: {
    Head: function () {
      return [
        <FoodItems.Basic.Head key={0} />,
        <td key={2}>Brand Owner</td>,
        <td key={3}>GTIN UPC</td>,
        <td key={4}>Accept?</td>,
      ]
    },
    Body: function ({ item }) {
      const setItem = useContext(XsetItem);
      async function handleAccept() {
        setItem(item)
      }
      return [
        <FoodItems.Basic.Body key={0} item={item} />,
        <td key={2}>{item.brandOwner}</td>,
        <td key={3}>{item.gtinUpc}</td>,
        <td key={4}>{FoodItems.SearchResults.Buttons.Accept(handleAccept)}</td>,
      ]
    },
    Table: ({ items }) => <Assembled Head={FoodItems.SearchResults.Head} Body={FoodItems.SearchResults.Body} items={items} /> ,
    Buttons: {
      Accept:  (callback) => <Button variant={'success'} onClick={callback} >X</Button>
    },
  },
  itemReducer: (state, action) => {
    switch (action.type) {
      case 'food/update':
        return {...state, [(action.payload.key)]:action.payload.value}
      case 'food_nutri/update':
        return {...state, ['labelNutrients']:Object.assign({}, state['labelNutrients'], {[(action.payload.key)]:action.payload.value})}
      case 'food/init':
        return copyDeep(action.payload)
      default:
        return state
    }
  },
  Reducer: (state, action) => {
    switch (action.type) {
      case 'food/update':
        return state.map((item,i) => {
          if(i!==action.payload.index) return item

          console.log((action.payload.key));
          item[(action.payload.key)] = action.payload.value;
        })
      case 'foods/init':
        if(action.payload !== null){
          if(action.payload) {
            return [...(action.payload)]
          }
        }
        return state
      default:
        return state
    }
  },
  Form: {
    Long: {
      Meta: ({item,dispatch,index}) => {
        let displayArray = [];
        function onChange(e) {
          dispatch({type:'food/update',payload:{index,key:e.target.name,value:e.target.value}})
        }
        Object.keys(item).forEach(key => {
          if ( typeof item[key] !== 'object' ) {
            displayArray.push(
              FormItem({obj:item,onChange,title:key,className:'',field:key,name:key})
            )
          }
        })
        return (
          <Col>
            <h5>Meta:</h5>
            {(displayArray.length >= 1)? displayArray : 'Empty'}
          </Col>
        )
      },
      Nutrients: ({item,dispatch}) => {
        function onChange(e) {
          dispatch({type:'food_nutri/update',payload:{key:e.target.name,value:e.target.value}})
        }
        let displayArray = [];
        const nutri = item.labelNutrients;
        if(nutri) {
          Object.keys(nutri).forEach(key => {
            if ( typeof nutri[key] !== 'object' ) {
              displayArray.push(
                FormItem({obj:item,onChange,title:key,className:'',field:key,name:key})
              )
            }
          })
        }
        return (
          <Col>
            <h5>Nutri:</h5>
            {(displayArray.length >= 1)? displayArray : 'Empty'}
          </Col>
        )
      },
    },
  },
  empty: () => {
    return {
      upc: '',
      description: '',
      brandOwner: '',
      dataSource: '',
      brandedFoodCategory: '',
      ingredients: '',
      servingSize: '',
      servingSizeUnit: '',
      labelNutrients: {
        fat: '',
        saturatedFat: '',
        transFat: '',
        cholesterol: '',
        sodium: '',
        carbohydrates: '',
        fiber: '',
        sugars: '',
        protein: '',
        calcium: '',
        iron: '',
        potassium: '',
        addedSugar: '',
        calories: '',
      },
      dataType: '',
    }
  },
}

export default FoodItems
