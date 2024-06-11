import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Product.css';

function Product(props) {
  const { product,buyer_id,product_id} = props;

  const [carts, setCarts] = useState({
  buyer_id:buyer_id,
  product_id:product_id,
  product_name:product.product_name,
  quantity:1,
  price:product.price,
  picture:product.picture
  }); 

  const [buttonText, setButtonText] = useState('Add to Cart');

  const handleAddToCart = () => {
    setButtonText('Added');

    setTimeout(() => {
      setButtonText('Add to Cart');
    }, 400); // Revert to 'Add to Cart' after 2 seconds (adjust the delay as needed)

    // Make the API call or perform any other desired action
    fetch('http://localhost:8080/addCartProduct', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(carts)
    })
      .then(response => {
        console.log("Valid Add to Cart")
      })
      .catch(error => {
        console.log("Error Adding to Cart")
      });
  };

  return (
    <div className="product-container">
    <Card className="product-card">
      <div className="product-card-content">
        <Card.Img src={product.picture} alt={product.product_name} className="product-card-image" />
        <Card.Title className="product-card-title">{product.product_name}</Card.Title>
        <Card.Text className="product-card-text price">PHP {product.price}</Card.Text>
        <Card.Text className="product-card-text cat">Category: {product.category}</Card.Text>
        <Card.Text className="product-card-text qty1">Quantity: {product.quantity}</Card.Text>
        <Card.Text className="product-card-text descript">{product.description}</Card.Text>
      </div>
      <Button className="product-card-button" onClick={handleAddToCart}>{buttonText}</Button>
    </Card>
  </div>
  );
}

export default Product;
