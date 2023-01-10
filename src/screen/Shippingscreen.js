import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../common/formController";
import { saveShippingAddress } from "../redux/action/productListaction";
import { useNavigate } from "react-router-dom";
import Checkout from "../components/Checkout";
const Shippingscreen = () => {
  const { shippingAddress } = useSelector(
    (state) => state.getProductListFromReducer
  );
  const navigate=useNavigate();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const dispatch=useDispatch();
  const submitHanlder = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({address,city,postalCode,country}))
    navigate('/payment');
    console.log("submit hanlder was called");
  };

  return (
    <FormContainer >
      <Checkout step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHanlder}>
        <Form.Group controlId="Address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="address"
            placeholder="Enter Address"
            value={address}
            required
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="City">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="city"
            placeholder="Enter City"
            value={city}
            required
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Postal code">
          <Form.Label>Postal code</Form.Label>
          <Form.Control
            type="Postal code"
            placeholder="Enter Postal code"
            value={postalCode}
            required
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="Country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="country"
            placeholder="Enter Country"
            value={country}
            required
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" >
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shippingscreen;
