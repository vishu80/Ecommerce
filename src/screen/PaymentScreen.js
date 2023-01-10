import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../common/formController";
import { savePaymentMethod } from "../redux/action/productListaction";
import { useNavigate } from "react-router-dom";
import Checkout from "../components/Checkout";
const PaymentScreen = () => {
  const { shippingAddress } = useSelector(
    (state) => state.getProductListFromReducer
  );

  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  if (!shippingAddress) navigate("/shipping");
  const dispatch = useDispatch();
  const submitHanlder = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <Checkout step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHanlder}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>
          <Col>
          <Form.Check
            type="radio"
            label="PayPal or Credit Card"
            id="Paypal"
            name="paymentMethod"
            value={`PayPal`}
            checked
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
       
          <Form.Check
            type="radio"
            label="Stripe"
            id="Stripe"
            name="paymentMethod"
            value={`Stripe`}
            onChange={(e) => setPaymentMethod(e.target.value)}
          ></Form.Check>
        </Col>
        </Form.Group>
        
        <Button type="submit" variant="primary">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
