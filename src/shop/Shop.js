import './Shop.css';
import React from 'react';

function Shop(){

    return(
        
<div class="main-container">

<div id="header-container"> 

</div>

<div id="image-container">
    <div id="lp-1">
        <div id="btn-lp-1">
            <button>Shop Now</button>
        </div>
    
    </div>
</div>


<div id="body1-container"> 

 <div id="item1">
    <img src="shopitem-1.png"></img>
 </div>
 <div id="item2">
    <img src="shopitem-2.png"></img>
    
 </div>
 <div id="item3">
    <img src="shopitem-3.png"></img>
   
 </div>

    <button class="button button1">Add to Cart</button>
    <button class="button button2">Add to Cart</button>
    <button class="button button3">Add to Cart</button>
    
    <div id="item4">
        <img src="shopitem-4.png"></img>
 
      
     </div>
     <div id="item5">
        <img src="shopitem-5.png"></img>
     
     </div>
     <div id="item6">
        <img src="shopitem-6.png"></img>
       
     </div>
     <button class="button button4">Add to Cart</button>
     <button class="button button5">Add to Cart</button>
     <button class="button button6">Add to Cart</button>


</div>
</div>
    );
}

export default Shop.js