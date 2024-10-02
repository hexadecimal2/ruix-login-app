import React from 'react';
import '../style.css'

const LogInPage = () => {

    const handleClick = () => {

       const email = document.getElementById('emailValue').value;
       const password = document.getElementById('passwordValue').value;
       
//change this to get

        const requestOptions = {
            method : "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify(
            {
                //what we're sending goes here
                Email : email,
                Password : password

            })
        }
  
       fetch('http://localhost:5000/add', requestOptions).then((response) => response.json()).then((data) =>  alert(data.message));

    }

    return (
    <div className="container">
      
      
      <div className="left-section">
        
      <div className="logo">
      <svg width="166" height="51" viewBox="0 0 166 51" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
     <rect width="166" height="51" fill="url(#pattern0_1_53)"/>
     <defs>
     <pattern id="pattern0_1_53" patternContentUnits="objectBoundingBox" width="1" height="1">
     <use xlinkHref="#image0_1_53" transform="matrix(0.0024456 0 0 0.008 0.00124352 0)"/>
     </pattern>
     <image id="image0_1_53" width="410" height="125" xlinkHref="data:image/png;base64,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"/>
    </defs>
    </svg>

        </div>
        
        
        <h1>LOG IN</h1>
        <p>Log into your account.</p>

        <div className="form">
          <div className="google-button">
            <img
              src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              alt="Google logo"
              width="20"
            />
            Continue With Google
          </div>

          <div className="or-divider"> ------- Or -------</div>

          <input type="email" placeholder="Email" id='emailValue'/>
          <input type="password" placeholder="Password" id='passwordValue'/>

          <button onClick={() => handleClick()}>Register</button>
        </div>

        <p className="login-link"> <br/> No account? Sign Up</p>
      </div>

      <div className="right-section">
        {/* Right section is for the abstract design or image */}
      </div>
    </div>
  );
};

export default LogInPage;
