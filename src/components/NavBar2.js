import React, { useState } from 'react';
import './NavBar2.css';
import SearchBar from '../SearchBar';

function NavBar2() {
    const SearchBar = () => {
        const [searchValue, setSearchValue] = useState('');
    
        const handleInputChange = (event) => {
          setSearchValue(event.target.value);
        };
    
        return (
          <div className="search-container">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={handleInputChange}
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>
        );
      };
    
      return (
        <div>
            <div className="header">
                <div className="headerContent">
                    <p className="headerTitle">preciales</p>
                <div className="buttonContainer_left">
                    <button className="products">Products</button>
                </div>
              
                <div className="searchBar">
                    <SearchBar/>
                </div>
    
                <div className="buttonContainer_right">
                    <button className="headerBtn">Shopping Cart</button>
                    {/* idk how to make this change depending on the username */}
                    {/* <button className="headerBtn">username</button> */}
                    <p className="username_display">username</p>
                </div>
                </div>
            </div>
        </div>
      );
}

export default NavBar2;
