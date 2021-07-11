const SearchInput = ({ filterValue, setFilterValue  }) => {
  const label = 'Search: ';

  function handleClear() {
    setFilterValue('');
  }

  return (
    <div className='row'>
      <label className='col-auto'>{label}</label>
      <input
        type="text"
        name='searchInput'
        className="col-2"
        value={filterValue}
        onChange={(e) => {setFilterValue(e.target.value)}}
      />
      <div className='col-auto btn btn-light' onClick={() => handleClear()}>X</div>
    </div>
  )
}

export default SearchInput
