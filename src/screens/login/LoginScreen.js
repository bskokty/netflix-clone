import React from "react";
import logo from "../../assets/img/Logonetflix.png";
import "./LoginScreen.css";

function LoginScreen() {
  return (
    <div className="loginScreen">
      <div className="loginScreen__background">
        <img className="loginScreen_logo" src={logo} alt="" />
      </div>

      <button className="loginScreen__button">Sign In</button>
    </div>
  );
}

export default LoginScreen;
