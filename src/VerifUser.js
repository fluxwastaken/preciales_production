import React, { useState, useEffect } from 'react';

function VerifUser() {
  const [inputValue, setInputValue] = useState('');
  const [code, setCode] = useState('');

  useEffect(() => {
    generateCode();
  }, []);

  const generateCode = () => {
    let numbers = '0123456789';
    let code = '';

    for (let index = 0; index < 4; index++) {
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers.charAt(randomIndex);

      code += randomNumber;
    }

    console.log(code);
    setCode(code);
  };

  const handleinputValueChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleVerifySubmit = async (event) => {
    event.preventDefault();
    // Perform verification logic using the inputValue
    console.log('Code submitted:', inputValue);

    setInputValue('');
  };

  return (
    <div className="mainDiv">
      <form onSubmit={handleVerifySubmit}>
        <div className="verifyInputContainer">
          <input
            type="text"
            placeholder="Enter code sent to email"
            value={inputValue}
            onChange={handleinputValueChange}
            className="inputValue"
          />
          <button type="submit" className="verifyButton">
            Verify
          </button>
        </div>
      </form>
    </div>
  );
}

export default VerifUser;
