import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar className="Navbar-full-control" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand className="Nav-name" href="/">
          Chiara's Garden
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="Nav-titles">
            <NavLink className="nav-link" style={displayActiveRoute()} to="/">
              Home
            </NavLink>

            <NavLink
              className="nav-link"
              style={displayActiveRoute()}
              to="/about"
            >
              About
            </NavLink>

            <NavLink
              className="nav-link"
              style={displayActiveRoute()}
              to="/gallery"
            >
              Gallery{" "}
            </NavLink>

            <NavLink
              className="nav-link"
              style={displayActiveRoute()}
              to="/accommodation"
            >
              Accommodation
            </NavLink>

            <NavLink
              className="nav-link"
              style={displayActiveRoute()}
              to="/reservation"
            >
              Reservation
            </NavLink>

            <NavLink
              className="nav-link"
              style={displayActiveRoute()}
              to="/contact"
            >
              Contact
            </NavLink>

            <NavLink
              className="nav-link"
              style={displayActiveRoute()}
              to="/account"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className="bi bi-person-circle me-2"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function displayActiveRoute() {
  return ({ isActive }) => ({
    color: isActive ? "#A205F0" : "",
  });
}

export default NavBar;
