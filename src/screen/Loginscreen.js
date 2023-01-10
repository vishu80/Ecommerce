import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import FormContainer from "../common/formController";
import { useDispatch,useSelector } from "react-redux";
import { loginUser } from "../redux/action/productListaction";


const Loginscreen = () => {
      const navigate=useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {userInfo,userLoading}=useSelector((state)=>state.getProductListFromReducer);
  const dispatch=useDispatch();
  useEffect(()=>{
            if(Object.keys(userInfo).length!=0)
            {

              console.log(userInfo,Object.keys(userInfo).length);
              navigate("/")

            }
            
  },[userInfo])
  const submitHandler = (e) => {
      e.preventDefault() // this will prvent from going to the following url link and it also prevent from submitting the form
      dispatch(loginUser(email,password));
};
  const redirect = `/`;
  return (
    <>
    <FormContainer>
      <h1 style={{display:'flex',justifyContent:'center',color:'#e9e9e8',marginTop:5}}>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password </Form.Label>
          <Form.Control 
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <div style={{ marginTop: 10 }}>
          <Button type="submit" variant="primary">
            Sign In
          </Button>
        </div>
      </Form>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Row className="py-2">
          <Col>
            New Customer?
                  <Link to={redirect ? `/register?redirect=${redirect}` : "/signin"} style={{marginLeft:4}}>
              Register
            </Link>
          </Col>
        </Row>
      </div>
    </FormContainer>

    </>
  );
};

export default Loginscreen;
