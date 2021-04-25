import React from "react";
import { Row, Col } from "reactstrap";
import ProductItems from './product-items-new'
const ProductListing=({data}) => {
  return data?(
    <Row className="no-gutters">
    {data.map((item, index)=>{
    return(
      <ProductItems  data={item}/>
    )
  })}
   </Row>
  ):<>isLoading</>
}
export default ProductListing