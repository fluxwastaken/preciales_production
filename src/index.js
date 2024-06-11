import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Buyers from './BuyersPage';
import Signup from './Signup';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import LoginBuyer from './LoginBuyer';
import BuyersPage from './BuyersPage';
import SellersStock from './SellersStock';
import CartPage from './CartPage';
import LandingPage from './LandingPage';
import EditStock from './components/EditStock';
import SellersSales from './SellersSales';
import Checkout from './Checkout';
import Farewell from './components/Farewell'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="" element= {<LandingPage></LandingPage>}></Route>
      <Route path='/buyers' element ={<Buyers></Buyers>}></Route>
      <Route path ='/newUser' element ={<Signup></Signup>}></Route>
      <Route path='/home/loginBuyer=true/:buyer_email' element = {<BuyersPage></BuyersPage>}></Route>
      <Route path='/home/loginSeller=true/:seller_email' element = {<SellersStock></SellersStock>}></Route>
      <Route path="/home" element= {<LandingPage></LandingPage>}></Route>
      <Route path="/loginUser" element = {<LoginBuyer></LoginBuyer>}></Route>
      <Route path="/viewCart/:buyer_id" element={<CartPage></CartPage>}></Route>
      <Route path="/editStock/:product_id" element={<EditStock></EditStock>}></Route>
      <Route path="/viewSales/:seller_email" element={<SellersSales></SellersSales>}></Route>
      <Route path="/checkout/:buyer_id" element={<Checkout></Checkout>}></Route>
      <Route path="/finalCheckout/:buyer_id" element={<Farewell></Farewell>}></Route>
    </Routes>
  </BrowserRouter>
);


