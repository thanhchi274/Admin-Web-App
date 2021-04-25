import React,{useState, useEffect} from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import ProductListing from './Products/common/product-listing'
import FilterBar from "./Products/common/filter-bar";
import { createStructuredSelector } from "reselect";
import {fetchDataStart} from '../../store/product/product.actions'
import {getVisibleproducts} from '../../store/product/product.selectors'
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { connect } from "react-redux";
const Products =({fetchDataStart,productsData})=>{
  const [BreadCrumbItems, setBreadCrumbItems] = useState([
    { title: "Ecommerce", link: "#" },
    { title: "Products", link: "#" },
  ])
  useEffect(() => {
    fetchDataStart()
  }, [fetchDataStart])

    return productsData?(
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Products"
              breadcrumbItems={BreadCrumbItems}
            />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody>
                    <div>
                      <Row>
                        <Col md={6}>
                          <FilterBar/>
                        </Col>

                        <Col md={6}>
                          <div className="form-inline float-md-right">
                            <div className="search-box ml-2">
                              <div className="position-relative">
                                <Input
                                  type="text"
                                  className="form-control rounded"
                                  placeholder="Search..."
                                />
                                <i className="mdi mdi-magnify search-icon"></i>
                              </div>
                            </div>
                          </div>
                        </Col>
                      </Row>
                      <ProductListing data ={productsData}/>
                      <Row className="mt-4">
                        <Col sm={6}>
                          <div className="float-sm-right">
                            <Pagination className="pagination-rounded mb-sm-0">
                              <PaginationItem disabled>
                                <PaginationLink href="#">
                                  <i className="mdi mdi-chevron-left"></i>
                                </PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                              </PaginationItem>
                              <PaginationItem active>
                                <PaginationLink href="#">2</PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink href="#">
                                  <i className="mdi mdi-chevron-right"></i>
                                </PaginationLink>
                              </PaginationItem>
                            </Pagination>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    ):<>Is Loaading</>;
  }
const mapStateToProps = createStructuredSelector({
  productsData:getVisibleproducts
})

const mapDispatchToProps = dispatch=>({
  fetchDataStart: ()=>dispatch(fetchDataStart()),
})
export default connect(mapStateToProps, mapDispatchToProps) (Products);
