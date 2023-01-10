import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector,useDispatch } from "react-redux";
import { NavDropdown } from "react-bootstrap";
import { signOut } from "../redux/action/productListaction";
const Headers = () => {
  const dispatch=useDispatch();
  const {userInfo}=useSelector((state)=>state.getProductListFromReducer);
  const logoutHandler=()=>{

    dispatch(signOut());
  }
  return (
    <>
      <header>
        <Navbar bg="light" expand="lg">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>Ecommerce</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <LinkContainer to="/shipping">
                  <Nav.Link>
                    <AiOutlineShoppingCart className="icon" />
                    Cart
                  </Nav.Link>
                </LinkContainer>
                {
                  Object.keys(userInfo).length?(
                      <NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to ='/profile'>
                        <NavDropdown.Item>profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                  ):
                  <LinkContainer to="/signup">
                  <Nav.Link>
                    <BsFillPersonFill className="icon" />
                    Sign In
                  </Nav.Link>
                </LinkContainer>
                }
               
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Headers;
