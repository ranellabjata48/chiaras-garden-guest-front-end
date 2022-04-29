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
              Account
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
