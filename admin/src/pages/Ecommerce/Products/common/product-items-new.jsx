import React from 'react'
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
export default function ProductItems() {
          return (
                    <Col xl={4} sm={6}>
                    <div className="product-box">
                      <div className="product-img">
                        <div className="product-ribbon badge badge-primary">- 25 %</div>
                        <div className="product-like">
                          <Link  to={`${process.env.PUBLIC_URL}/product/$`}>
                            <i className="mdi mdi-heart-outline"></i>
                          </Link>
                        </div>
                        <img src={"#"}lt="" className="img-fluid mx-auto d-block" />
                      </div>
            
                      <div className="text-center">
                        <p className="font-size-12 mb-1">Half sleeve, T-shirt</p>
                        <h5 className="font-size-15">
                          <Link to="#" className="text-dark">
                            Half sleeve T-shirt{" "}
                          </Link>
                        </h5>
            
                        <h5 className="mt-3 mb-0">
                          <span className="text-muted mr-2">
                            <del>$240</del>
                          </span>
                          $225
                        </h5>
                      </div>
                    </div>
                  </Col>
          )
}
