import SearchInput from '../atoms/SearchInput'

const SearchBar = (props) => {
  const { search, setSearch } = props;

  return (
    <div className='row p-1 border border-info mt-3'>
        <SearchInput key={0} label='Search: ' search={search} setSearch={setSearch} />
    </div>
  )
}

export default SearchBar;