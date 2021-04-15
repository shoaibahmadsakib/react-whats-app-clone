import { Button } from "@material-ui/core";
import React from "react";
import { auth, provider } from "../Firebase";
import "./Login.css";
import { actionTypes } from "./Redux/reducer";
import { useStateValue } from "./StateProvider";
function Login() {

    const [{} ,dispatch] = useStateValue();

    const signIn =()=>{
        auth
        .signInWithPopup(provider)
        .then(result=>{
            dispatch({
                type:actionTypes.SET_USER,
                user:result.user,
            })
        }).catch(error=> alert(error.messsage))
    };
  return (
    <div className="login">
      <div className="login-container">
        <img
          src="https://logodownload.org/wp-content/uploads/2015/04/whatsapp-logo-1.png"
          alt="whats app"
        />
        <div className="login-text">
          <h1>Sign in to What's app</h1>
          <Button onClick={signIn}>Sign in with google</Button>
        </div>
       
      </div>
    </div>
  );
}

export default Login;
