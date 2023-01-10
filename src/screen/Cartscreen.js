import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { deleteSpecificItem, getCartProduct } from "../redux/action/productListaction";
import Alert from "react-bootstrap/Alert";
import {AiOutlineDelete} from 'react-icons/ai'

const Cartscreen = () => {
  const dispatch = useDispatch();
  const { id, qty } = useParams();
  const { cartItem } = useSelector((state) => state.getProductListFromReducer);
  const removeFromCartHandler=(id)=>{
    dispatch(deleteSpecificItem(id))
  }
  useEffect(() => {
    dispatch(getCartProduct(id, qty));
  }, [id, qty]);
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
      </Col>
      {cartItem.length != 0 ? (
        <ListGroup variant="flush">
          {cartItem?.map((item) => {
              return (
              <ListGroup.Item>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      style={{ width: 120, height: 120, borderRadius: 10 }}
                    />
                  </Col>
                  <Col md={2}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={1}>{`$${item.price}`}</Col>
                  <Col md={1}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        dispatch(
                          getCartProduct(item.product, Number(e.target.value))
                        )
                      }
                      style={{ backgroundColor: " white", color: "black" }}
                    >
                      {[...Array(item.countInStock).keys()].map((x,value) => (
                        <option
                          key={x}
                          value={x}
                          style={{ color: "black" }}
                        >
                          {x+1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button type='button' variant='light' onClick={()=>removeFromCartHandler(item.product)} >
                        <AiOutlineDelete/>
                    </Button>
                  </Col>
                  <Col md={4}>
                    {/* <Card style={{backgroundColor:'white'}}>
                    <Card.Header style={{color:'grey'}}>SUBTOTAL ({qty}) ITEMS</Card.Header>
                    </Card> */}
                    <Card style={{backgroundColor:'black'}}>
                    <ListGroup.Item >
                     <Row>
                     SUBTOTAL ({qty}) ITEMS 
                      </Row> 
                      <Row>
                      {`$${item?.price}`}
                      </Row>
                      <Row style={{marginTop:10}}>
                      <Button type='button' variant='light'>
                        PROCEED TO CHECKOUT
                      </Button>

                      </Row>
                     </ListGroup.Item>
                    <ListGroup.Item>
                        </ListGroup.Item>
                        </Card>
                  </Col>
                </Row>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      ) : (
        <Alert variant={`primary`} style={{ backgroundColor: "white" }}>
          <h5 style={{ color: "black", textAlign: "center" }}>
            Your cart is empty{" "}
            <Link to="/" style={{ color: "blue" }}>
              Go Back
            </Link>
          </h5>
        </Alert>
      )}
    </Row>
  );
};

export default Cartscreen;
