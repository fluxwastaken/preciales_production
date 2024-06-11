import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import './Stock.css';

function Product(props) {
  const { product } = props;
  const [buttonText, setButtonText] = useState('Delete Product');
  const [stockValue, setStockValue] = useState('');

  const handleDeleteStock = async () => {
    setButtonText('Deleted');
  
    setTimeout(() => {
      setButtonText('Delete Product');
    }, 400); // Revert to 'Delete Product' after 2 seconds (adjust the delay as needed)
  
    fetch(`http://localhost:8080/deleteCartsByProductId/${product.product_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.ok) {
          // Handle successful response
          console.log('Delete request successful');
          return deleteProduct();
        } else {
          // Handle error response
          console.log('Delete request failed');
        }
      })
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        // Handle network error
        console.log('An error occurred while making the delete request:', error);
      });
  };
  
  const deleteProduct = async () => {
    await fetch(`http://localhost:8080/deleteProduct/${product.product_id}`);
  };
  

  const handleStockChange = (event) => {
    setStockValue(event.target.value);
  };

  const handleEditStock = () => {
    console.log('Stock added:', stockValue);
    setStockValue(''); // Clear the input field after adding stock
    window.open(`/editStock/${product.product_id}`, 'Add Stock', 'width=600,height=400');
  };

  return (
    <div className="stock-container">
      <Card className="product-card-stock">
        <Card.Img src={product.picture} alt={product.product_name} className='product-card-image' />
        <Card.Body>
          <div className = "stockContext">
          <Card.Title className="stock-card-title">{product.product_name}</Card.Title>
          <Card.Text className="stock-card-text qty">Quantity: {product.quantity}</Card.Text>
          <Card.Text className="stock-card-text php">PHP {product.price}</Card.Text>
          <Card.Text className="stock-card-text cat">Category: {product.category}</Card.Text>
          <Card.Text className="stock-card-text descript">{product.description}</Card.Text>
          </div>
          
          <div className="stock-input-container">
            {/* <input
              type="number"
              value={stockValue}
              onChange={handleStockChange}
              className="stock-input"
              placeholder="Quantity"
            /> */}
            <Button className="edit-stock-button1" onClick={handleEditStock}>Edit Product</Button>
            <Button className="stock-card-delete" onClick={handleDeleteStock}>{buttonText}</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}


export default Product;
