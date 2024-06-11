import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import './Signup.css';
import NavBar1 from './components/NavBar1';

class AddBuyer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      buyer: {
        buyer_id: "",
        buyer_name: "",
        buyer_email: "",
        buyer_password: ""
      },
      seller: {
        seller_id: "",
        seller_name: "",
        seller_email: "",
        seller_password: ""
      },
      buyerButtonText: "BUYER",
      sellerButtonText: "SELLER",
      inputValue1:"",
      inputValue2:"",
      inputValue3:""
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitBuyer = this.handleSubmitBuyer.bind(this)
    this.handleSubmitSeller = this.handleSubmitSeller.bind(this)
  }

  handleChange(e) {
    let target = e.target;
  let value = target.value;
  let name = target.name;
  this.setState({
    [name]: value
  });

    // let target = e.target
    // let value = target.value
    // let name = target.name
    // let temp = this.state.buyer
    // temp[name] = value
    // console.log(temp)
    // this.setState({ buyer: temp })
  }

  async handleSubmitBuyer(e) {
    e.preventDefault();
  
    // Transfer the input values to the buyer object
    const { inputValue1, inputValue2, inputValue3 } = this.state;
    this.setState(prevState => ({
      buyer: {
        ...prevState.buyer,
        buyer_name: inputValue1,
        buyer_email: inputValue2,
        buyer_password: inputValue3
      }
    }), () => {
      // Log the updated buyer state
      console.log(this.state.buyer);
  
      // Make the API call or perform any other desired action
      let buyers = this.state.buyer;
      // this is the one in spring, u get this so that u can execute d command
      //this is connected to database
      fetch('http://localhost:8080/addBuyer', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(buyers)
      })
      .then(response => {
        console.log("Valid Buyer Sign-up")
      })
      .catch(error => {
        console.log("Error Signing-up Buyer")
      });
    });
  }
  async handleSubmitSeller(e) {
    e.preventDefault();
  
    // Transfer the input values to the buyer object
    const { inputValue1, inputValue2, inputValue3 } = this.state;
    this.setState(prevState => ({
      seller: {
        ...prevState.seller,
        seller_name: inputValue1,
        seller_email: inputValue2,
        seller_password: inputValue3
      }
    }), () => {
      // Log the updated seller state
      console.log(this.state.seller);
  
      // Make the API call or perform any other desired action
      let sellers = this.state.seller;
      fetch('http://localhost:8080/addSeller', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(sellers)
      })
      .then(response => {
        console.log("Valid Seller Sign-up")
      })
      .catch(error => {
        console.log("Error Signing-up Seller")
      });
    });
  }
  
//   async handleSubmitSeller(e) {
//     e.preventDefault()
//     let sellers = this.state.seller
//     fetch('http://localhost:8080/addSeller', {
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       },
//       method: "POST",
//       body: JSON.stringify(sellers)
//     })
//   }

  componentDidMount() {
    // Making buyer into login when mouseover
    const buyerButton = document.getElementById('buyer');
    buyerButton.addEventListener('mouseover', () => {
      this.setState({ buyerButtonText: 'SIGN-UP' });
    });
    buyerButton.addEventListener('mouseout', () => {
      this.setState({ buyerButtonText: 'BUYER' });
    });

    // Making seller into login when mouseover
    const sellerButton = document.getElementById('seller');
    sellerButton.addEventListener('mouseover', () => {
      this.setState({ sellerButtonText: 'SIGN-UP' });
    });
    sellerButton.addEventListener('mouseout', () => {
      this.setState({ sellerButtonText: 'SELLER' });
    });
    // Making the body unscrollable
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    const buyerButton = document.getElementById('buyer');
    buyerButton.removeEventListener('mouseover', () => {
      this.setState({ buyerButtonText: 'SIGN-UP' });
    });
    buyerButton.removeEventListener('mouseout', () => {
      this.setState({ buyerButtonText: 'BUYER' });
    });

    const sellerButton = document.getElementById('seller');
    sellerButton.removeEventListener('mouseover', () => {
      this.setState({ sellerButtonText: 'SIGN-UP' });
    });
    sellerButton.removeEventListener('mouseout', () => {
      this.setState({ sellerButtonText: 'SELLER' });
    });
    // Making the body unscrollable
    document.body.style.overflow = 'hidden';
  }

  render() {
    const {
      buyerButtonText,
      sellerButtonText
    } = this.state;

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
                    onChange={this.handleChange}
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
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td className="cell_left">password*</td>
                <td className="cell_right">
                  <input
                    className="password_input"
                    type="text"
                   name="inputValue3"
                    onChange={this.handleChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          </div>

          <div className="enterContainer">
            <p className="question_enter">what are you signing up as?</p>
            <div className="buttonRow">
              <button id="buyer" className="buyer" onClick={this.handleSubmitBuyer}>{buyerButtonText}</button>
              <button id="seller" className="seller" onClick={this.handleSubmitSeller}>{sellerButtonText}</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AddBuyer;
