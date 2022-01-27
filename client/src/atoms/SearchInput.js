import Buttons from '../atoms/Buttons'

const SearchInput = (props) => {
  const { label, placeholder, search, reset, setSearch } = props;

  return (
    <div className='input-group'>
      <label className='input-group-text'>{label || 'Search: -'}</label>
      <input type="text" name='searchInput'
        className="form-control" placeholder={placeholder}
        value={search} onChange={(e) => setSearch(e.target.value)}
      />
      <Buttons.Close callback={reset} />
    </div>
  )
}

export default SearchInput
