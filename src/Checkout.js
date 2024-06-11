import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import './Checkout.css';
import NavBar1 from './components/NavBar1';
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import Table from 'react-bootstrap/Table';

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
  const[grandTotalPrice,setGrandTotalPrice] = useState('')

  useEffect(() => {
    getBuyerDetails();
    getCartItems();
    getGrandTotalPrice();
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

  const getGrandTotalPrice = () => {
  let tempTotal = 0;

  carts.forEach(cart => {
    const productTotal = cart.price * cart.quantity;
    tempTotal += productTotal;
  });

  const formattedTotal = tempTotal.toFixed(2); // Format total with two decimal places
  setGrandTotalPrice(formattedTotal);
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
 
  const handleCheckoutClick = async () => {
    try {
      // Iterate over each cart item
      carts.forEach(async (cart) => {
        const response = await fetch(`http://localhost:8080/decrementProductQuantity/${cart.product_id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
             'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            quantity: cart.quantity,
          }),
        });
  
        if (response.ok) {
          // Product quantity updated successfully
          console.log(`Product ${cart.product_id} quantity updated`);
        } else {
          // Handle error response
          console.log(`Failed to update product ${cart.product_id} quantity`);
        }
      });
  
      // Delete the carts for the buyer
      const deleteResponse = await fetch(`http://localhost:8080/deleteCartsByBuyerId/${buyer.buyer_id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
  
      if (deleteResponse.ok) {
        // Carts deleted successfully
        console.log('Delete Cart request successful');
      } else {
        // Handle error response
        console.log('Delete request failed');
      }
  
      // Navigate to the final checkout page
      navigate(`/finalCheckout/${buyer.buyer_id}`);
    } catch (error) {
      // Handle network error
      console.log('An error occurred while updating product information:', error);
    }
  };
  
    
  
    


  const grandTotal = carts.reduce((total, cart) => {
    const productTotal = cart.price * cart.quantity;
    return total + productTotal;
  }, 0);
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
      <div id="body1co-container">
        <Table striped bordered>
          <thead>
            <tr>
              <th id="title-table" scope="col">Product</th>
              <th id="title-table" scope="col">Price</th>
              <th id="title-table" scope="col">Quantity</th>
              <th id="title-table" scope="col">Total</th>
            </tr>
          </thead>
          <tbody id="body-table">
            {carts.map((cart) => (
              <tr key={cart.cart_id}>
                <td id="info-table">{cart.product_name}</td>
                <td id="info-table">{cart.price}</td>
                <td id="info-table">{cart.quantity}</td>
                <td id="info-table">{cart.price * cart.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      
      <div id='body2-container'>
      <div id="co-1">
        <button onClick={handleCheckoutClick}>Checkout</button>
      </div>
        <br />
        <label>Total:</label>
        <br />
        <label> {grandTotal.toFixed(2)}</label>
    
        <label> PHP</label>
      </div>
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
