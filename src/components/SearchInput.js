const SearchInput = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="text"
        value={search}
        placeholder="Search for a game..."
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
    </div>
  );
};

export default SearchInput;
