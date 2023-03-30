import React, { useState, useEffect } from "react";
import Banner from "./Banner";
import "./HomeScreen.css";
import Nav from "./Nav";

function HomeScreen() {
  return (
    <div className="homeScreen">
      <Nav />
      <Banner />
    </div>
  );
}

export default HomeScreen;
