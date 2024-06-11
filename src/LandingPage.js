import './LandingPage.css';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import landing2Image from './landing page/landing-2.png';
import landing4Image from './landing page/landing-4.png';
import NavBar1 from './components/NavBar1';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);



function useScrollAnimation(ref) {
  useEffect(() => {
    const element = ref.current;
    if (element) {
      gsap.from(element, {
        opacity: 0,
        y: 100,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  }, [ref]);
}

function LandingPage() {
  const navigate = useNavigate();

  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const scrollRef3 = useRef(null);
  
  useScrollAnimation(scrollRef1);
  useScrollAnimation(scrollRef2);
  useScrollAnimation(scrollRef3);

  const handleShopClick = () => {
    navigate('/loginUser');
  };

   return (
    <div className="mainlp-container">
      <div id="headerlp-container">
      <NavBar1 />
      </div>

      <div id="imagelp-container">
        <div id="lp-1">
          <div id="btn-lp-1">
            <button onClick={handleShopClick}>shop now</button>
          </div>
        </div>
      </div>

      <div className="body1lp-container">
        <div id="imglp-circle">
          <img id="lp-2" src={landing2Image} height="400" width="400" alt="Landing 2" />
        </div>
        <div id="body1lp-txt">
          <p id="body1lp-txt1">hello, beautiful.</p>
          <p id="body1lp-txt2">
            Welcome to your one-stop shop for freshness and wellness.
            <br />
            {/* <br />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit sed
            <br /> */}
            <br />
            Preciales gives you the power to radiate with just a few clicks. We at Preciales 
            <br />
            provide products from both local and international merchants, giving all of you
            <br />
            the best options your beauty needs to stay fresh and glowing.
          </p>
        </div>
      </div>
      <div className="body2lp-container">
        <div id="brownsqrlp-container">
          <div id="brownsqrlp"><p id="textBrownSqrlp">keeping the glow real</p></div>
        </div>
        <div id="body2lp-img">
          <img src={landing4Image} height="400" width="400" alt="Landing 4" />
        </div>
      </div>
      <div id="body3lp-container">
        <div id="column"  ref={scrollRef1}>
          <h2>Preciales</h2>
          <p id="b3-text">Your one-stop shop for freshness and wellness.</p>
        </div>
        <div id="column"  ref={scrollRef2}>
          <h2>About Us</h2>
          <p id="b3-text">
            Preciales is an online store created for everyone to
            <br />
            be able to have quick and easy access to the best items the community has to offer.
            <br />
            <br />
            The goal of Preciales is to empower everyone to feel confident in their own skin, and to keep their glow radiating.
          </p>
        </div>
        <div id="column"  ref={scrollRef3}>
          <h2>Contact Us</h2>
          <p id="b3-text">
            1 Lesciapre St., Opre Avenue,
            <br />
            Manila City, Philippines
            <br />
            Postal Code 1000
            <br />
            <br />
            preciales@email.com
            <br />
            8888-1234
          </p>
        </div>
      </div>
      <div id="footer-container">
        <p id="footer-txt1">
          Copyright © 2023 Preciales Store All rights reserved
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
