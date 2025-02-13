import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../redux/searchSlice'; 
import { useNavigate, useLocation } from 'react-router-dom';

const SearchForm = ({ showSearchBar, setShowSearchBar }) => {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation(); // Used to check the current query in the URL

  // Check if there's an existing query in the URL on initial render
  React.useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    if (query) {
      setSearch(query); // Set the search state from the URL query
      dispatch(fetchSearchResults(query)); // Dispatch to fetch search results
    }
  }, [location.search, dispatch]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (search.trim()) {
      dispatch(fetchSearchResults(search));
      navigate(`/search-results?query=${search}`); // Update the URL with the query
    }
  };

  return (
    <form onSubmit={handleSearch}>
      <div
        className={`flex-align-center relative h-9 w-9 transition-all border-slate-300 dark:border-hover-color rounded-full ${
          showSearchBar && "!w-[150px] md:!w-[300px] border"
        }`}
      >
        <input
          type="search"
          className={`outline-none border-none h-0 w-0 bg-transparent transition-all ${
            showSearchBar && "!w-full !h-full px-4"
          }`}
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span
          className="w-9 h-9 grid place-items-center hover:bg-slate-100 sm:cursor-pointer dark:hover:bg-hover-color rounded-full flex-shrink-0"
          onClick={() => setShowSearchBar(!showSearchBar)}
        >
          <BiSearch className="text-muted" />
        </span>
      </div>
    </form>
  );
};

export default SearchForm;
