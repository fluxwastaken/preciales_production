import React from 'react';
import './NavBar1.css';
import { useNavigate } from 'react-router-dom';

function NavBar1() {
  const navigate = useNavigate();

  const handleLoginClick = (e) =>{
    navigate('/loginUser')
  }

  const handleSignupClick =(e)=>{
    navigate('/newUser')
  }
    return(
        <div className="header">
        <div className="headerContent">
          <p className="headerTitle">preciales</p>
          <div className="buttonContainer">
            <button className="headerBtn" onClick={handleSignupClick}>Sign-up</button>
            <button className="headerBtn" onClick={handleLoginClick}>Login</button>
          </div>
        </div>
      </div>
    );
}

export default NavBar1;