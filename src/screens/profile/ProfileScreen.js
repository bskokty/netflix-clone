import React from "react";
import { useSelector } from "react-redux";
import Nav from "../../components/nav/Nav";
import { selectUser } from "../../features/userSlice";
import "./ProfileScreen.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import acc_logo from "../../assets/img/Netflix-avatar.png";
import PlansScreen from "../plans/PlansScreen";

function ProfileScreen() {
  const user = useSelector(selectUser);

  return (
    <div className="profileScreen">
      <Nav />
      <div className="profileScreen__body">
        <h1>Edit Profile</h1>
        <div className="profileScreen__info">
          <img src={acc_logo} alt=""></img>
          <div className="profileScreen__details">
            <h2>{user.email}</h2>
            <div className="profileScreen__plans">
              <h3>Plans</h3>
              <PlansScreen />
              <button
                className="profileScreen__signOut"
                onClick={() => signOut(auth)}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
