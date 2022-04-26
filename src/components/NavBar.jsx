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
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>

            <NavLink className="nav-link" to="/about">
              About
            </NavLink>

            <NavLink className="nav-link" to="/gallery">
              Gallery{" "}
            </NavLink>

            <NavLink className="nav-link" to="/accommodation">
              Accommodation
            </NavLink>

            <NavLink className="nav-link" to="/reservation">
              Reservation
            </NavLink>

            <NavLink className="nav-link" to="/contact">
              Contact
            </NavLink>

            <NavLink className="nav-link" to="/account">
              Account
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
