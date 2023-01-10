import React from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Rating from "./Rating";
import { Link } from "react-router-dom";

const Products = ({ productItem }) => {
  return (
    <>
      <Card className="my-3 p-3 rounded">
        <Link to={`/product/${productItem._id}`}>
          <Card.Img src={productItem.image} variant="top"></Card.Img>
        </Link>
        <Card.Body>
          <Link to={`/product/${productItem._id}`}>
            <Card.Title>{productItem.name}</Card.Title>
          </Link>
          <Card.Text>
            <Rating
              userRating={productItem.rating}
              outOfwhich={`${productItem.numReviews}reviews`}
              color="#f8e825"
            />
          </Card.Text>
          <Card.Text as="h3">${productItem.price}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Products;
