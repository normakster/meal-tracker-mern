const Rows = ({ item, dispatch, keys, isEditable, editBtns, roBtns}) => {
  return (
    <div>
    { (isEditable)
      ? <Editable
      item={item}
      dispatch={dispatch}
      keys={keys}
      buttons={editBtns}
      />
      : <ReadOnly
      item={item}
      keys={keys}
      buttons={roBtns}
      />
    }
    </div>
  )
}

const Editable = ({ item, dispatch, buttons, keys }) => {

  function onSubmit(e) {
    e.preventDefault();
  }

  function inputItem(definition,data) {
    return (
      <div className='col-auto' key={definition.key}>
        <label className='sr-only' >{definition.placeholder}</label>
        <input
            required
            name={definition.key}
            type={definition.type}
            className='form-control mb-2'
            value={data[definition.key]}
            placeholder={definition.placeholder}
            onChange={(e)=>{eval('dispatch')({type:(definition.dispatch),payload:e.target.value})}}
          />
      </div>
    )
  }

  function displayButtons(btns) {
    return (
      <div className='col-auto'>
          {btns}
      </div>
    )
  }

  function displayData() {
    return keys.map((key, i) => {
      return inputItem(key,item)
    })
  }

  return (
      <form onSubmit={onSubmit} >
        <div className='row'>
          { displayData() }
          { displayButtons(buttons()) }
        </div>
      </form>
  )
}

const ReadOnly = ({ item, keys, buttons }) => {

  function displayData(data) {
    return keys.map((definition,i) => {
      return (
        <div className='col' key={i}>
        {data[definition.key]}
        </div>
      )
    })
  }

  return (
    <div className='row border rounded'>
      { displayData(item) }
      <div className='col'>
          {buttons()}
      </div>
    </div>
  )
}

export {
  Rows,
  Editable,
  ReadOnly,
}
