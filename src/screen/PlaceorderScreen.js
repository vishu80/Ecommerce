import React, { useState } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Checkout from "../components/Checkout";
import { Link } from "react-router-dom";

const PlaceorderScreen = () => {
  const { shippingAddress, paymentMethod, cartItem } = useSelector(
    (state) => state.getProductListFromReducer
  );

  cartItem.price = cartItem.reduce(
    (acc, item) => parseFloat(item.price * item.qty + acc).toFixed(2),
    0
  );
  cartItem.shippingPrice = cartItem.price > 100 ? 0 : 100;
  cartItem.taxPrice = Number((0.15 * cartItem.price).toFixed(2));
  cartItem.totalPrice =
    Number(cartItem.price) +
    Number(cartItem.shippingPrice) +
    Number(cartItem.taxPrice);

  const placeOrder = () => {
    console.log("placeOrder");
  };
  return (
    <div>
      <Checkout step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address:</strong>
                {shippingAddress.address},{shippingAddress.city},
                {shippingAddress.postalCode},{shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong>
                {paymentMethod}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Detail</h2>
              {cartItem.length == 0 ? (
                <h1>Your Cart is empty</h1>
              ) : (
                <ListGroup variant="flush">
                  {cartItem.map((item, id) => (
                    <ListGroup.Item>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.image}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty}x ${item.price}=$
                          {parseFloat(item.qty * item.price).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cartItem.price}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cartItem.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cartItem.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cartItem.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItem.length == 0}
                  onClick={placeOrder}
                >Place Order</Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceorderScreen;
