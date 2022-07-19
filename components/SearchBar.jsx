import React from "react";
import { useStores } from "../stores";
import { observer } from "mobx-react-lite";

const SearchBar = () => {
  const { coin_store, watchlist_store } = useStores();
  const searchInput = React.useRef(null);

  const handleChange = () => {
    const inputValue = searchInput.current.value;
    coin_store.setSearch(inputValue);
    console.log("searchInput: ", coin_store.search);
  };

  return (
    <div>
      <div className="mt-24 ml-20 mr-20 relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          type="text"
          name="coin-search"
          ref={searchInput}
          onChange={handleChange}
          id="coin-search"
          className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
          placeholder="Search for a coin..."
        />
      </div>
    </div>
  );
};

export default observer(SearchBar);
