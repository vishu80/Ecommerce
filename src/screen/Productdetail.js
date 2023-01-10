import React, { useEffect, useState } from "react";
import { Link, useParams,useNavigate} from "react-router-dom";
import { ListGroup, Row, Col, Card, Image, Button, Spinner, Form } from "react-bootstrap";
import Rating from "../components/Rating";
import { useDispatch,useSelector } from "react-redux";
import { getSingleProduct } from "../redux/action/productListaction";
import Loader from "../components/Loader";


const Productdetail = () => {
  const navigate=useNavigate();
  const [qty,setQty]=useState(0)
  const dispatch=useDispatch();
  const {sortProduct,loadingproductsData}=useSelector((state)=>state.getProductListFromReducer);
  const params = useParams();
  useEffect(() => {
    dispatch(getSingleProduct(params.id));
  }, []);

  const addToCartHandler=()=>{
    navigate(`/cart/${params.id}/${qty}`)
  }

 
  return (
    <>
    {
      loadingproductsData?<Loader/>:
      <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image
            src={sortProduct?.image}
            alt={sortProduct?.name}
            rounded
          ></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h5>{sortProduct?.name}</h5>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                userRating={sortProduct?.rating}
                outOfwhich={`${sortProduct?.numReviews} Reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>
            <ListGroup.Item>
              <h6>Price : {`$${sortProduct.price}`}</h6>
            </ListGroup.Item>
            <ListGroup.Item>{sortProduct?.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <Row>
                <Col>Price</Col>
                <Col>{`$${sortProduct.price}`}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>Status</Col>
                <Col>
                  {sortProduct.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                </Col>
              </Row>
            </ListGroup.Item>
            {
              sortProduct.countInStock>0&&(
                <ListGroup.Item>
                  <Row>
                    <Col>
                    Qty
                    </Col>
                    <Col>
                    <Form.Control as='select' value={qty} onChange={(e)=>{setQty(e.target.value)}} style={{backgroundColor:' #32a5ab'}}>
                    {
                      [...Array(sortProduct.countInStock).keys()].map((x)=>(
                          <option key={x+1} value={x+1}>
                            {x+1}
                          </option>
                      ))
                    }

                    </Form.Control>

                    </Col>
                  </Row>
                </ListGroup.Item>
              )
            }
            <ListGroup.Item style={{ alignItems: "center" }}>
              <Button
                className="btn-block"
                type="button"
                disabled={sortProduct.countInStock == 0}
                variant={sortProduct.countInStock > 0 ? "dark" : "light"}
                onClick={addToCartHandler}
              >
                Add To Cart
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      </>

    }
    </>
  );
};

export default Productdetail;
