function SearchInput({ label, search, setSearch  }) {
  return (
    <div className='row'>
      <label className='col-auto'>{label || 'Search: -'}</label>
      <input
        type="text"
        name='searchInput'
        className="col-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className='col-auto btn btn-light' onClick={() => setSearch('')}>X</div>
    </div>
  )
}

export default SearchInput
