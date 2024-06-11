import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="HELLO"
        value={searchValue}
        onChange={handleInputChange}
        className="search-input"
      />
      <button className="search-button">Search</button>
    </div>
  );
};

export default SearchBar;
