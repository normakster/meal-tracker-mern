import { useState, useEffect } from 'react';

const FoodItem = ({ food, cache, handleUpdate }) => {
  const [inCache, setInCache] = useState(false);

  useEffect(() => {
    setInCache(false);
    cache.forEach((c) => {
      if(food._id === c.food._id) {
        setInCache(true);
      }
    });
  },[cache])

  function handleClick() {
    let added = !inCache;
    setInCache(added);
    handleUpdate(food,added);
  }

  return (
    <ReadOnly food={food} onClick={handleClick} inCache={inCache} />
  )
}

const ReadOnly = ({ food, onClick, inCache }) => {
  return (
    <div className='row'>
      <div className='col'>{food.name}</div>
      <div className='col'>{inCache ? 'TRUE' : 'FALSE'}</div>
      <div className='col'>{food.kCal}</div>
      <div className='col'><button onClick={onClick}>{inCache ? '[X]' : '[ ]'}</button></div>
    </div>
  )
}

  //
  // <tr key={food._id}>
  //   <td>{food.name}</td>
  //   <td>{inCache ? 'TRUE' : 'FALSE'}</td>
  //   <td>{food.kCal}</td>
  //   <td><button onClick={handleClick}>{inCache ? '[X]' : '[ ]'}</button></td>
  // </tr>

const Editable = ({ food, onClick, inCache }) => {
  const [name, setName] = useState(food.name);
  const [desc, setDesc] = useState(food.desc);
  const [kCal, setKCal] = useState(food.kCal);

  function onSubmit() {

  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label>Name</label>
          <input
              required
              name='name'
              type='text'
              className='form-control'
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
              />
        </div>
        <div className='form-group'>
          <label>Desc.</label>
          <input
              required
              name='desc'
              type='text'
              className='form-control'
              value={desc}
              onChange={(e)=>{setDesc(e.target.value)}}
              />
        </div>
        <div className='form-group'>
          <label>kCal</label>
          <input
              required
              name='kCal'
              type='text'
              className='form-control'
              value={kCal}
              onChange={(e)=>{setKCal(e.target.value)}}
              />
        </div>
        <div className='form-group'>
          <input type='submit' value='Save' className='btn btn-primary' />
        </div>
      </form>
    </div>
  )
}

export {
  FoodItem
}
