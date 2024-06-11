import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Farewell.css';
import NavBar1 from './NavBar1';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

function Checkout() {
  const navigate = useNavigate();
  const [carts, setCarts] = useState([]);
  const { buyer_id } = useParams();
  const [buyer, setBuyer] = useState({
    buyer_id: '',
    buyer_name: '',
    buyer_email: '',
    buyer_password: ''
  });

  useEffect(() => {
    getBuyerDetails();
    getCartItems();
  }, []);

  const getCartItems = async () => {
    try {
      let response = await fetch(`http://localhost:8080/getCart/${buyer_id}`);
      let cartData = await response.json();
      setCarts(cartData);
    } catch (error) {
      console.error(error);
    }
  };

  const getBuyerDetails = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getBuyerInfo/${buyer_id}`);
      const buyerData = await response.json();
      if (buyerData) {
        setBuyer(buyerData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleCartClick = () => {
    console.log(buyer.buyer_id);
    navigate(`/viewCart/${buyer.buyer_id}`);
  };

  const handleLogoutClick = () => {
    navigate('/home');
  };

  const handleProductsClick = () => {
    navigate(`/home/loginBuyer=true/${buyer.buyer_email}`);
  };

  const handleShopeForMore = () => {
    navigate(`/home/loginBuyer=true/${buyer.buyer_email}`)
  }
  return (
    <div className="mainco-container">
      <header>
        <div className="navbar">
          <div className="headerContent">
            <p className="headTitle">preciales</p>
            <div className="buttonContainer_left1">
              <button className="productsBtn" onClick={handleProductsClick}>Products</button>
            </div>
            <div className="buttonContainer_right">
              <button className="headerBtn" onClick={handleCartClick}>Shopping Cart</button>
              <button className="headerBtn" onClick={handleLogoutClick}>Log-out</button>
              <p className="usernameDisplay">{buyer.buyer_name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="row-container">
      <p className="farewell">checkout success, gorgeous!</p>
      <Button className = "fareShop" onClick={handleShopeForMore}>shop for more</Button>
      </div>

    

      <div id="footerco-container">
        <p id="footerco-txt1">
          Copyright © 2023 Preciales Store All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Checkout;
