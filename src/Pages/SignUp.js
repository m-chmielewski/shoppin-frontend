import React, { useState } from "react";
import Axios from "axios";

import "./SignUp.css";

const SignUp = ({ lowVisionOn }) => {
 const [credentials, setCredentials] = useState();

 const signUpUser = () => {
  Axios.post(
   `${process.env.REACT_APP_BACKEND_URL}/auth/signUp/`,
   credentials
  ).then(response => {});
 };

 return (
  <div className={`content-wrapper signup ${lowVisionOn ? "low-vision" : ""}`}>
   <form onSubmit={e => e.preventDefault()}>
    <fieldset>
     <legend>Sign Up</legend>
     <input
      type={"text"}
      placeholder="Login"
      onChange={e =>
       setCredentials(current => {
        return {
         ...current,
         login: e.target.value,
        };
       })
      }
     />
     <input
      type={"password"}
      placeholder="Password"
      onChange={e =>
       setCredentials(current => {
        return {
         ...current,
         password: e.target.value,
        };
       })
      }
     />
     <input
      type={"password"}
      placeholder="Repeat password"
      onChange={e =>
       setCredentials(current => {
        return {
         ...current,
         repeatedPassword: e.target.value,
        };
       })
      }
     />
    </fieldset>
    <button
     className="btn done"
     onClick={signUpUser}
    >
     Sign up
    </button>
    <button className="btn done">Guest</button>
    <p>Already signed up?</p>
    <button className="btn done">Sign in</button>
   </form>
  </div>
 );
};

export default SignUp;
