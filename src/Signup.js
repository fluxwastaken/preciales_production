import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css';
import NavBar1 from './components/NavBar1';

const Signup = () => {
  const [buyer, setBuyer] = useState({
    buyer_id: "",
    buyer_name: "",
    buyer_email: "",
    buyer_password: ""
  });

  const [seller, setSeller] = useState({
    seller_id: "",
    seller_name: "",
    seller_email: "",
    seller_password: ""
  });

  const [buyerButtonText, setBuyerButtonText] = useState("BUYER");
  const [sellerButtonText, setSellerButtonText] = useState("SELLER");

  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    let target = e.target;
    let value = target.value;
    let name = target.name;

    if (name === "inputValue1") {
      setInputValue1(value);
    } else if (name === "inputValue2") {
      setInputValue2(value);
    } else if (name === "inputValue3") {
      setInputValue3(value);
    }
  };

  const handleSubmitBuyer = (e) => {
    e.preventDefault();

    const updatedBuyer = {
      ...buyer,
      buyer_name: inputValue1,
      buyer_email: inputValue2,
      buyer_password: inputValue3
    };

    setBuyer(updatedBuyer);

    console.log(updatedBuyer);

    // Make the API call or perform any other desired action
    fetch('http://localhost:8080/addBuyer', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(updatedBuyer)
    })
      .then(response => {
        console.log("Valid Buyer Sign-up")
        navigate('/loginUser');
      })
      .catch(error => {
        console.log("Error Signing-up Buyer")
      });
  };

  const handleSubmitSeller = (e) => {
    e.preventDefault();

    const updatedSeller = {
      ...seller,
      seller_name: inputValue1,
      seller_email: inputValue2,
      seller_password: inputValue3
    };

    setSeller(updatedSeller);

    console.log(updatedSeller);

    // Make the API call or perform any other desired action
    fetch('http://localhost:8080/addSeller', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(updatedSeller)
    })
      .then(response => {
        console.log("Valid Seller Sign-up")
        navigate('/loginUser');
      })
      .catch(error => {
        console.log("Error Signing-up Seller")
      });
  };

  useEffect(() => {
    const handleBuyerMouseOver = () => {
      setBuyerButtonText('SIGN-UP');
    };

    const handleBuyerMouseOut = () => {
      setBuyerButtonText('BUYER');
    };

    const handleSellerMouseOver = () => {
      setSellerButtonText('SIGN-UP');
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

  return (
    <div>
      <div className="header">
        <NavBar1 />
      </div>

      <div className="body">
        <div className="welcome-container">
          <p className="welcome">hey there, beautiful!</p>
        </div>

        <div className="tableContainer">
          <table className="table">
            <tbody>
              <tr>
                <td className="cell_left">username*</td>
                <td className="cell_right">
                  <input
                    className="username_input"
                    type="text"
                    name="inputValue1"
                    value={inputValue1}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="cell_left">email*</td>
                <td className="cell_right">
                  <input
                    className="email_input"
                    type="text"
                    name="inputValue2"
                    value={inputValue2}
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
                    name="inputValue3"
                    value={inputValue3}
                    onChange={handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="enterContainer">
          <p className="question_enter">what are you signing up as?</p>
          <div className="buttonRow">
            <button id="buyer" className="buyer" onClick={handleSubmitBuyer}>{buyerButtonText}</button>
            <button id="seller" className="seller" onClick={handleSubmitSeller}>{sellerButtonText}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
