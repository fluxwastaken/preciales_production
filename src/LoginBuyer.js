import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar1 from './components/NavBar1';

const LoginBuyer = () => {
  const [buyer, setBuyer] = useState({
    buyer_id: '',
    buyer_name: '',
    buyer_email: '',
    buyer_password: ''
  });
  const [seller, setSeller] = useState({
    seller_id: '',
    seller_name: '',
    seller_email: '',
    seller_password: ''
  });
  const [buyerButtonText, setBuyerButtonText] = useState('BUYER');
  const [sellerButtonText, setSellerButtonText] = useState('SELLER');
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleBuyerMouseOver = () => {
      setBuyerButtonText('LOG-IN');
    };

    const handleBuyerMouseOut = () => {
      setBuyerButtonText('BUYER');
    };

    const handleSellerMouseOver = () => {
      setSellerButtonText('LOG-IN');
    };

    const handleSellerMouseOut = () => {
      setSellerButtonText('SELLER');
    };

    const buyerButton = document.getElementById('buyer');
    buyerButton.addEventListener('mouseover', handleBuyerMouseOver);
    buyerButton.addEventListener('mouseout', handleBuyerMouseOut);

    const sellerButton = document.getElementById('seller');
    sellerButton.addEventListener('mouseover', handleSellerMouseOver);
    sellerButton.addEventListener('mouseout', handleSellerMouseOut);

    // Making the body unscrollable
    document.body.style.overflow = 'hidden';

    return () => {
      buyerButton.removeEventListener('mouseover', handleBuyerMouseOver);
      buyerButton.removeEventListener('mouseout', handleBuyerMouseOut);
      sellerButton.removeEventListener('mouseover', handleSellerMouseOver);
      sellerButton.removeEventListener('mouseout', handleSellerMouseOut);

      // Making the body scrollable again
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (name === 'inputValue1') {
      setInputValue1(value);
    } else if (name === 'inputValue2') {
      setInputValue2(value);
    }
  };

  const handleSubmitBuyer = async (e) => {
    e.preventDefault();

    const updatedBuyer = {
      ...buyer,
      buyer_email: inputValue1,
      buyer_password: inputValue2
    };

    setBuyer(updatedBuyer);

    try {
      const response = await fetch(`http://localhost:8080/searchBuyerEmail?keyword=${updatedBuyer.buyer_email}`);
      const buyerData = await response.json();

      if (buyerData && updatedBuyer.buyer_password === buyerData.buyer_password) {
        setBuyer({ ...updatedBuyer, buyer_id: buyerData.buyer_id });
        setError('Valid');
        // Proceed to the next step or perform any desired action here
        navigate(`/home/loginBuyer=true/${updatedBuyer.buyer_email}`)
      } else {
        setError('Invalid email or password');
        console.log('Invalid email/password');
      }
    } catch (error) {
      console.log('Error occurred while logging in buyer:', error);
    }
  };

  const handleSubmitSeller = async (e) => {
    e.preventDefault();

    const updatedSeller = {
      ...seller,
      seller_email: inputValue1,
      seller_password: inputValue2
    };

    setSeller(updatedSeller);

    try {
      const response = await fetch(`http://localhost:8080/searchSellerEmail?keyword=${updatedSeller.seller_email}`);
      const sellerData = await response.json();

      if (sellerData && updatedSeller.seller_password === sellerData.seller_password) {
        setSeller({ ...updatedSeller, seller_id: sellerData.seller_id });
        setError('Valid');
        // Proceed to the next step or perform any desired action here
        navigate(`/home/loginSeller=true/${updatedSeller.seller_email}`)
      } else {
        setError('Invalid email or password');
        console.log('Invalid email/password');
      }
    } catch (error) {
      console.log('Error occurred while logging in seller:', error);
    }
  };

  return (
    <div>
      <div className="header">
        <NavBar1 />
      </div>

      <div className="body">
        <div className="welcome-container">
          <p className="welcome">welcome back, gorgeous!</p>
        </div>

        <div className="tableContainer">
          <table className="table">
            <tbody>
              <tr>
                <td className="cell_left">e-mail*</td>
                <td className="cell_right">
                  <input
                    className="email_input"
                    type="text"
                    name="inputValue1"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="cell_left">password*</td>
                <td className="cell_right">
                  <input
                    className="password_input"
                    type="password"
                    name="inputValue2"
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className='errorInput'>{error}</td>
              </tr>

            </tbody>
          </table>
        </div>

        <div className="buttonRow">
          <button id="buyer" className="buyer" onClick={handleSubmitBuyer}>
            {buyerButtonText}
          </button>
          <button id="seller" className="seller" onClick={handleSubmitSeller}>
            {sellerButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBuyer;
