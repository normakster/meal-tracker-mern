import React, { Fragment, useState, useContext } from 'react';
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'

import { Assembled } from '../services/utilities'
import api from './../api'
import { XsetItem } from './scanner'

const FdaItems = {
  Basic: {
    Head: function () {
      return [
        <td key={0}>Name</td>,
        <td key={1}>Brand Name</td>,
      ]
    },
    Body: function ({ item }) {
      function handleAccept() {
        alert('Accepting...');
      }
      return [
        <td key={0}>{item.description}</td>,
        <td key={1}>{item.brandName}</td>,
      ]
    },
    Table: ({ items }) => <Assembled Head={FdaItems.Basic.Head} Body={FdaItems.Basic.Body} items={items} /> ,
    Buttons: {}
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
      // const quantity = useContext(Xquantity);
      // const setQuantity = useContext(XsetQuantity);
      const setItem = useContext(XsetItem);
      const [quantity, setQuantity] = useState('');

      async function handleAccept() {
        const accepted = { quantity: quantity || 0, food: item };
        await api.pantry.post(accepted)
        .then(() => alert('Accepting...' + JSON.stringify(accepted, null, 1)))
        .catch((err) => {
          console.log(err);
          alert('NOT Accepted.');
        })
      }

      function handleReject() {
        alert('Rejecting...');
        setItem(null);
      }

      // <td key={1}>{item.brandName}</td>,
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
          {FdaItems.Selected.Buttons.Accept(handleAccept)}
        </td>,
        <td key={4}>
          {FdaItems.Selected.Buttons.Reject(handleReject)}
        </td>,
      ]
    },
    Table: ({ items }) => <Assembled Head={FdaItems.Selected.Head} Body={FdaItems.Selected.Body} items={items} /> ,
    Buttons: {
      Accept:  (callback) => <Button variant={'success'} onClick={callback} >Save</Button>,
      Reject:  (callback) => <Button variant={'danger'} onClick={callback} >X</Button>
    }
  },

  SearchResults: {
    Head: function () {
      return [
        <FdaItems.Basic.Head key={0} />,
        <td key={2}>Brand Owner</td>,
        <td key={3}>GTIN UPC</td>,
        <td key={4}>Accept?</td>,
      ]
    },
    Body: function ({ item }) {
      const setItem = useContext(XsetItem);
      async function handleAccept() {
        // setItem(item);
        // setItem(fdaFood);
        setItem(await api.fdaFoodSearch.get(item.fdcId))
        // alert('Accepting...'+item.fdcId);
      }
      return [
        <FdaItems.Basic.Body key={0} item={item} />,
        <td key={2}>{item.brandOwner}</td>,
        <td key={3}>{item.gtinUpc}</td>,
        <td key={4}>{FdaItems.SearchResults.Buttons.Accept(handleAccept)}</td>,
      ]
    },
    Table: ({ items }) => <Assembled Head={FdaItems.SearchResults.Head} Body={FdaItems.SearchResults.Body} items={items} /> ,
    Buttons: {
      Accept:  (callback) => <Button variant={'success'} onClick={callback} >X</Button>
    },
  }
};

export default FdaItems
