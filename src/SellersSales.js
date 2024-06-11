import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './SellersSales.css';
import NavBar2 from './components/NavBar2';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stock from './components/Stock';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function SellersSales() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [sales, setSales] = useState([]);
  const{seller_email} = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
    getSales();
    getSellerDetails();
  }, []);

  const [seller, setSeller] = useState({
    seller_id: '',
    seller_name: '',
    seller_email: '',
    seller_password: ''
  });


  useEffect(() => {
    console.log(sales);
  }, [sales]);

  const getSellerDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/searchSellerEmail?keyword=${seller_email}`);
      const sellerData = await response.json();
      if (sellerData) {
        setSeller(sellerData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      let response = await fetch('http://localhost:8080/getProducts');
      let productsData = await response.json();
      setProducts(productsData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearchSubmit = async(event) => {
    event.preventDefault();
    // Perform search logic or trigger a search API request using the searchValue
    console.log('Search submitted:', searchValue);

    try {
      let response = await fetch(`http://localhost:8080/searchProduct?keyword=${searchValue}`)
      let productsData = await response.json()
      setProducts(productsData)
    } catch (error) {
      console.error(error)
    }
  };
  
  const getSales = async () => {
    try {
      let response = await fetch('http://localhost:8080/getSales');
      let salesData = await response.json();
      console.log(salesData);
      setSales(salesData);
    } catch (error) {
      console.error(error);
    }
  };
  const handleSalesClick=()=>{
    navigate(`/viewSales/${seller_email}`)
  }
  const handleStocksClick=()=>{
    navigate(`/home/loginSeller=true/${seller_email}`)
  }

  const handleLogoutClick=()=>{
    navigate('/home')
  }


  return (
    <div>

<header>
        <div className="navbar">
          <div className="headerContent">
            <p className="headerTitle">preciales</p>
            {/* <div className="buttonContainer_left">
              <button className="products">Products</button>
            </div> */}

            {/* <div className="searchBarContainerSeller">
              <form onSubmit={handleSearchSubmit}>
                <div className="searchInputContainer">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    value={searchValue}
                    onChange={handleSearchInputChange}
                    className="searchInput"
                  />
                  <button type="submit" className="searchButton">
                    Search
                  </button>
                </div>
              </form>
            </div> */}

            <div className="buttonContainer_right">
              <button className="headerBtn" onClick={handleSalesClick}>Sales</button>
              <button className="headerBtn" onClick={handleStocksClick}>Stocks</button>
              <button className="headerBtn" onClick={handleLogoutClick}>Log-out</button>
              <p className="usernameDisplay">{seller.seller_name}</p>
            </div>
          </div>
        </div>
      </header>


      <div className="bodyContainer">
        <h1 className="salesTitle">Purchases</h1>
        <div className="tableContainer">
          <Table striped bordered>
            <thead>
              <tr>
                <th id ="tableHead" scope="col">EMAIL</th>
                <th id ="tableHead" scope="col">ITEMS</th>
                <th id ="tableHead" scope="col">QUANTITY</th>
                <th id ="tableHead" scope="col">TOTAL PRICE</th>
                <th id ="tableHead" scope="col">DATE PURCHASED</th>
              </tr>
            </thead>
            <tbody>
            {sales.map((sale) => (
                <tr key={sale.transaction_id}>
                  <td id ="tableInfo">{sale.buyer_email}</td>
                  <td id ="tableInfo">{sale.items}</td>
                  <td id ="tableInfo">{sale.sale_quantity}</td>
                  <td id ="tableInfo">{sale.sale_price}</td>
                  <td id ="tableInfo">{sale.date_purchased}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* <footer className="footer">
        <div className="footerContainer">
          <p>All rights reserved.</p>
        </div>
      </footer> */}

    </div>
  );
}

export default SellersSales;
