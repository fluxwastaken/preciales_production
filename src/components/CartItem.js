import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './CartItem.css';

function CartItem(props) {
  const { cart } = props;
  const [buttonText, setButtonText] = useState('Delete from Cart');
  const [stockValue, setStockValue] = useState('');

  const handleDeleteFromCart = async () => {
    setButtonText('Deleted');

    setTimeout(() => {
      setButtonText('Delete from Cart');
    }, 400); // Revert to 'Delete Product' after 2 seconds (adjust the delay as needed)

    await fetch(`http://localhost:8080/deleteCart/${cart.cart_id}`)
    window.location.reload()
  };

  const handleStockChange = (event) => {
    setStockValue(event.target.value);
  };

  const handleAddStock = async () => {
    console.log('Stock added:', stockValue * 1);
    // Make the API call or perform any other desired action
    try {
      await fetch(`http://localhost:8080/updateCart?buyer_id=${cart.buyer_id}&product_id=${cart.product_id}&quantity=${cart.quantity + (stockValue * 1)}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "PUT"
      })

    } catch (error) {
      console.error(error)
    }
    window.location.reload()
    setStockValue(''); // Clear the input field after adding stock
  };

  const handleDecreaseStock = async () => {
    console.log('Stock decreased:', stockValue * -1);
    if (cart.quantity + (stockValue * -1) <= 0) {
      await fetch(`http://localhost:8080/deleteCart/${cart.cart_id}`)
      window.location.reload()
    } else {
      // Make the API call or perform any other desired action
      try {
        await fetch(`http://localhost:8080/updateCart?buyer_id=${cart.buyer_id}&product_id=${cart.product_id}&quantity=${cart.quantity + (stockValue * -1)}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PUT"
        })

      } catch (error) {
        console.error(error)
      }
      window.location.reload()
    }
    setStockValue(''); // Clear the input field after adding stock
  };


  return (
    <div className="cartitem-container">
      <Card className="cartitem-card">
        <Card.Img src={cart.picture} alt={cart.product_name} className='cartitem-card-image' />
        <Card.Body>
          <div className="cartitemContext">
            {/* <Card.Title className="product-card-title">Buyer ID: {cart.buyer_id}</Card.Title>
            <Card.Text className="product-card-title">Product ID: {cart.product_id}</Card.Text> */}
            <Card.Title className="cartitem-card-title">{cart.product_name}</Card.Title>
            <Card.Text className="cartitem-card-text price">PHP {cart.price}</Card.Text>
            <Card.Text className="cartitem-card-text">Quantity in Cart: {cart.quantity}</Card.Text>

          
            <div className="cartitem-input-container">
              <div className="cartitem-input-wrapper">
                <Button className="add-cartitem-button sub" onClick={handleDecreaseStock}>-</Button>
                <input
                  type="text"
                  value={stockValue}
                  onChange={handleStockChange}
                  className="stock-cartitem"
                  placeholder="Quantity" />
                <Button className="add-cartitem-button add" onClick={handleAddStock}>+</Button>
              </div>
            </div>
          </div>
          <Button className="delete-cartitem-button" onClick={handleDeleteFromCart}>{buttonText}</Button>
        </Card.Body>
      </Card>
    </div>

  );
}

export default CartItem;
