import React, { useState } from "react";
import Axios from "axios";

import "./SignIn.css";

const SignIn = ({ lowVisionOn, setToken }) => {
 const [credentials, setCredentials] = useState();

 const signInUser = () => {
  Axios.post(
   `${process.env.REACT_APP_BACKEND_URL}/auth/signIn/`,
   credentials
  ).then(response => setToken(response.data.token));
 };

 return (
  <div className={`content-wrapper signin ${lowVisionOn ? "low-vision" : ""}`}>
   <form onSubmit={e => e.preventDefault()}>
    <fieldset>
     <legend>Sign in</legend>
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
    </fieldset>
    <button
     className="btn done"
     onClick={signInUser}
    >
     Sign in
    </button>
    <button className="btn done">Guest</button>
    <p>Don't have an account yet?</p>
    <button className="btn done">Sign up</button>
   </form>
  </div>
 );
};

export default SignIn;
