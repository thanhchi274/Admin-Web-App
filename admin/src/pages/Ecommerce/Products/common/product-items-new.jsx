import React from "react";
import { Col } from "reactstrap";
import { Link } from "react-router-dom";
const ProductItems = ({ data }) => {
  return data && data.variants ? (
    <Col xl={3} sm={6}>
      <div className="product-box">
        <div className="product-img">
          <div className="product-ribbon badge badge-primary">
            - {data.discount} %
          </div>
          <img
            src={data.variants[0].images}
            lt=""
            className="img-fluid mx-auto d-block"
          />
        </div>
        <div className="text-center">
          <h5 className="font-size-15 my-2">
            <Link
              to={`${process.env.PUBLIC_URL}/product-detail/${data._id}/`}
              className="text-dark"
            >
              {data.name}{" "}
            </Link>
          </h5>
          <h5 className="mt-3 mb-0">
            <span className="text-muted mr-2">
              <del>${data.price}</del>
            </span>
            ${data.price - (data.price * data.discount) / 100}
          </h5>
        </div>
      </div>
    </Col>
  ) : null;
};
export default ProductItems;
