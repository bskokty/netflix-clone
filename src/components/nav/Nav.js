import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../assets/img/Logonetflix.png";
import acc_logo from "../../assets/img/Netflix-avatar.png";
import "./Nav.css";

function Nav() {
  const [show, handleShow] = useState(false);
  const history = useHistory(false);
  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  return (
    <div className={`nav ${show && `nav__black`}`}>
      <div className="nav__content">
        <img
          src={logo}
          alt="Netflix"
          className="nav__logo"
          onClick={() => history.push("/")}
        ></img>
        <img
          src={acc_logo}
          alt="Netflix"
          className="nav__avatar"
          onClick={() => history.push("/profile")}
        ></img>
      </div>
    </div>
  );
}

export default Nav;
