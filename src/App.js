import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";
import http from "./services/httpService";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Gallery from "./components/Gallery";
import Accommodation from "./components/Accommodation";
import Reservation from "./components/Reservation";
import Contact from "./components/Contact";
import Account from "./components/Account";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Login from "./components/Login";

const initialState = {
  userJwt: {},
};

function App() {
  const [appState, setAppState] = useState(initialState);

  useEffect(() => {
    let isMounted = true;
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      http.setJwt(token);
      if (isMounted) {
        setAppState({ userJwt: decoded });
      }
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const loggedIn = appState.userJwt.email;

  return (
    <>
      {loggedIn && <NavBar />}
      <div className="app">
        <ToastContainer />
        <Routes>
          {loggedIn && (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/accommodation" element={<Accommodation />} />
              <Route path="/reservation" element={<Reservation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/account" element={<Account />} />
            </>
          )}
          {!loggedIn && <Route path="/login" element={<Login />} />}
          {!loggedIn && <Route path="/" element={<Login />} />}
        </Routes>
      </div>
      {loggedIn && <Footer />}
    </>
  );
}

export default App;
