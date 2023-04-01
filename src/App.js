import React, { useEffect } from "react";
import "./App.css";
import HomeScreen from "./screens/home/HomeScreen";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginScreen from "./screens/login/LoginScreen";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout, login, selectUser } from "./features/userSlice";
import ProfileScreen from "./screens/profile/ProfileScreen";

function App() {
  const user = useSelector(selectUser);
  const distpatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //logged in user
        distpatch(login({ uid: user.uid, email: user.email }));
      } else {
        //logged out user
        distpatch(logout());
      }
    });
    return unsubscribe;
  }, [distpatch]);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <LoginScreen />
        ) : (
          <Switch>
            <Route exact path="/">
              <HomeScreen />
            </Route>
            <Route path="/profile">
              <ProfileScreen />
            </Route>
          </Switch>
        )}
      </Router>
    </div>
  );
}

export default App;
