import Buttons from './Buttons'

const SearchInput = (props) => {
  const { label, search, setSearch } = props;

  return (
    <div className='input-group col border border-info'>
      <label className='input-group-text'>{label || 'Search: -'}</label>
      <input
        type="text"
        name='searchInput'
        className="form-control"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Buttons.Close callback={() => setSearch('')} />
    </div>
  )
}

export default SearchInput
