import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./footer.css";
const Footer = () => {
  return (
    <>
      <Container className="footerStyle">
        <Row>
          <Col className="text-center py-3">Copyright &copy; Ecommerce</Col>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
