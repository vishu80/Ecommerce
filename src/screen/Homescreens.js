import React, { useEffect, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import Products from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";

const Homescreens = () => {
  const { productsData, loadingproductsData } = useSelector(
    (state) => state.getProductListFromReducer
  );

  return (
    <>
      {loadingproductsData? (
        <Loader/>
) : (
        <>
          <h4>Latest Products</h4>
          <Row>
            {productsData?.productList?.map((productdetail) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3}>
                  <Products productItem={productdetail} />
                </Col>
              );
            })}
          </Row>
        </>
      )}
    </>
  );
};

export default Homescreens;
