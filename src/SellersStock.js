import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import './SellersStock.css';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stock from './components/Stock';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function SellersPage() {
  const [products, setProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const {seller_email} = useParams();
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState({
    product_name:"",
    category:"",
    quantity:"",
    price:"",
    description:"",
    picture:""
  })
  const [seller, setSeller] = useState({
    seller_id: '',
    seller_name: '',
    seller_email: '',
    seller_password: ''
  });


  useEffect(() => {
    getProducts();
    getSellerDetails();
  }, []);

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
  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const controlId = target.id;

    setNewProduct((prevProduct)=>({
      ...prevProduct,
      [controlId]: value
    }))
    console.log(newProduct)
    
  };
  const handleSearchInputChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFileChange = (event) => {
    event.preventDefault();
    const file = event.target.files[0];
    setSelectedFile(file);
    
    // Assuming "filename" is the desired name for the uploaded file
    const picturePath = `/images/${file.name}`;
  
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      picture: picturePath
    }));
  
    console.log(newProduct);
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
    setSearchValue('')
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    const formData = new FormData();
    formData.append('image', selectedFile);
  
    try {
      const response = await fetch('http://localhost:8080/uploadImage', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        console.log('File uploaded successfully');
        // Perform any additional actions here, such as updating the database with the image link
      } else {
        console.error('File upload failed');
      }
    } catch (error) {
      console.error(error);
    }

    fetch('http://localhost:8080/addProduct', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(newProduct)
    })
      .then(response => {
        console.log("Valid Add product")
        window.location.reload()
      })
      .catch(error => {
        console.log("Error Adding Product")
      });
  };

  const handleLogoutClick=()=>{
    navigate('/home')
  }
  const handleSalesClick=()=>{
    navigate(`/viewSales/${seller.seller_email}`)
  }
  const handleStocksClick=()=>{
    navigate(`/home/loginSeller=true/${seller.seller_email}`)
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

            <div className="searchBarContainerSeller">
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
            </div>

            <div className="buttonContainer_right">
              <button className="headerBtn" onClick={handleSalesClick}>Sales</button>
              <button className="headerBtn" onClick={handleStocksClick}>Stocks</button>
              <button className="headerBtn" onClick={handleLogoutClick}>Log-out</button>
              <p className="usernameDisplay">{seller.seller_name}</p>
            </div>
          </div>
        </div>
      </header>

      <div className="tabContainer">
      <Tab.Container defaultActiveKey="productDiv">
        <Nav variant="tabs" className="nav-tabs">
          <Nav.Item>
            <Nav.Link eventKey="productDiv" className ="navTitle">Stocks Hub</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="addProd" className ="navTitle">Add Product</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="productDiv">
          <div id='productDiv'>
            <h1 className = "stockTitle">Stocks Hub</h1>
            <Row>
              {products.map((product) => (
                <Col key={product.product_id} sm={6} md={4} lg={3} className="mb-3 product-column">
                  <Stock product = {product}></Stock>
                </Col>
              ))}
            </Row>
          </div>
          </Tab.Pane>
          <Tab.Pane eventKey="addProd">
            <div id="addProdDiv">
              <h1 className="stockTitle">Add Product</h1>
              <div className="addProdForm">
        <Form>
          <Form.Group className="titleProd" controlId="product_name">
            <div className="formRow">
              <Form.Label className="prodLabel">Product Name</Form.Label>
              <Form.Control className="prodText" type="text" placeholder="Enter product name" onChange={handleChange} />
            </div>
          </Form.Group>
          <Form.Group className="titleProd" controlId="price">
            <div className="formRow">
              <Form.Label className="prodLabel">Price</Form.Label>
              <Form.Control className="prodText" type="number" placeholder="Enter price" onChange={handleChange} />
            </div>
          </Form.Group>
          <Form.Group className="titleProd" controlId="category">
            <div className="formRow">
              <Form.Label className="prodLabel">Category</Form.Label>
              <Form.Control className="prodText" type="text" placeholder="Enter category" onChange={handleChange} />
            </div>
          </Form.Group>
          <Form.Group className="titleProd" controlId="quantity">
            <div className="formRow">
              <Form.Label className="prodLabel">Quantity</Form.Label>
              <Form.Control className="prodText" type="number" placeholder="Enter quantity" onChange={handleChange} />
            </div>
          </Form.Group>
          <Form.Group className="titleProd" controlId="description">
            <div className="formRow">
              <Form.Label className="prodLabel">Description</Form.Label>
              <Form.Control className="prodText" as="textarea" rows={3} placeholder="Enter description" onChange={handleChange} />
            </div>
          </Form.Group>
          <Form.Group className="titleProd" controlId="picture">
            <div className="formRow">
              <Form.Label className="prodLabel">Image</Form.Label>
              <Form.Control className="prodText" type="file" label="Choose file" onChange={handleFileChange} />
            </div>
          </Form.Group>
          <Button className="addproduct" variant="primary" type="submit" onClick={handleFormSubmit}>
            Add Product
          </Button>
        </Form>
      </div>
            </div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
      </div>
      <footer>
        {/* <div className = "footerContainer">
          <p>All rights reserved.</p>
        </div> */}
        <div id="footer-container">
              <p id="footer-txt1">
                Copyright © 2023 Preciales Store All rights reserved
              </p>
              </div>
      </footer>

    </div>
  );
}

export default SellersPage;
