import React from "react";
import { Row, Col } from "reactstrap";
import ProductItems from './product-items-new'
export default function ProductListing() {
  return (
    <Row className="no-gutters">
          <ProductItems />
    </Row>
  );
}
