import React from 'react'
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
const ProductItems=({data})=> {
          return data&&data.variants?(
                   <Col xl={4} sm={6}>
                    <div className="product-box">
                      <div className="product-img">
                        <div className="product-ribbon badge badge-primary">- {data.discount} %</div>
                        <img src={data.variants[0].images}lt="" className="img-fluid mx-auto d-block" />
                      </div>
                      <div className="text-center">
                        <p className="font-size-12 mb-1">{data.size}{" "}</p>
                        <h5 className="font-size-15">
                          <Link to={`${process.env.PUBLIC_URL}/product/`} className="text-dark">
                          {data.name}{" "}
                          </Link>
                        </h5>
                        <h5 className="mt-3 mb-0">
                          <span className="text-muted mr-2">
                            <del>${data.price}</del>
                          </span>
                         {data.price-(data.price*data.discount)/100}
                        </h5>
                      </div>
                    </div>
                  </Col>
          ):<p>Is Loading</p>
}
export default ProductItems