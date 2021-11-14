import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import useAuth from "../../hooks/useAuth.js";
import "./header.css";

const Header = () => {
  const { AllContexts, admin } = useAuth();
  const { user, logOut } = AllContexts;
  const { displayName, photoURL, email } = user;
  return (
    <div className="">
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} className="text-dark" to="/home">
            <span className="title"> Runner </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={NavLink} to="/home" className="text-dark">
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/products" className="text-dark">
                Products
              </Nav.Link>
              <Nav.Link as={HashLink} to="/home#feature" className="text-dark">
                Feature Products
              </Nav.Link>

              {!displayName ? (
                <>
                  <Nav.Link as={NavLink} to="/signup" className="text-dark">
                    Sign Up
                  </Nav.Link>

                  <Nav.Link className="text-dark" as={NavLink} to="/login">
                    Log in
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link
                    as={HashLink}
                    to="/myorder"
                    className="text-dark"
                  >
                    Dashboard
                  </Nav.Link>

                  <NavDropdown
                    title={
                      <img
                        style={{
                          width: "45px",
                          borderRadius: "50%",
                        }}
                        src={photoURL}
                        alt=""
                      />
                    }
                  >
                    <div className="text-center">
                      <h6>{displayName}</h6>
                      <p className="m-0 mb-2">{email}</p>
                      <button onClick={logOut} className="btn btn-primary">
                        Sign Out
                      </button>
                    </div>
                  </NavDropdown>
                </>
              )}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
