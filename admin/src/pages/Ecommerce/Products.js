import React,{useState, useEffect} from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Collapse,
  CardHeader,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import ProductItems from "../../components/Product-Items/product-items.component";
import ProductListing from './Products/common/product-listing-new'
import FilterBar from "./Products/common/filter-bar";
import { createStructuredSelector } from "reselect";
import {fetchDataStart} from '../../store/product/product.actions'
import {selectDataIsMapping} from '../../store/product/product.selectors'
// RangeSlider
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";
import axios from "axios";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { connect } from "react-redux";
const Products =({fetchDataStart,productsData})=>{
  const [BreadCrumbItems, setBreadCrumbItems] = useState([
    { title: "Ecommerce", link: "#" },
    { title: "Products", link: "#" },
  ])
  const [Discount, setDiscount] = useState(true)
  const [Size, setSize] = useState(true)

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
              <Col xl={3} lg={4}>
                <Card>
                  <CardHeader className="bg-transparent border-bottom">
                    <h5 className="mb-0">Filters</h5>
                  </CardHeader>
                  <CardBody>
                    <h5 className="font-size-14 mb-3">Categories</h5>
                    <FilterBar />
                  </CardBody>

                  <CardBody className="border-top">
                    <div>
                      <h5 className="font-size-14 mb-4">Price</h5>
                      <br />
                      <Nouislider
                        range={{ min: 0, max: 600 }}
                        tooltips={true}
                        start={[100, 500]}
                        connect
                      />
                    </div>
                  </CardBody>

                  <div className="custom-accordion">
                    <CardBody className="border-top">
                      <div>
                        <h5 className="font-size-14 mb-0">
                          <Link
                            to="#"
                            className="text-dark d-block"
                            onClick={() =>
                              setDiscount(!Discount)
                            }
                          >
                            Discount{" "}
                            <i
                              className={
                                Discount === true
                                  ? "mdi mdi-minus float-right accor-minus-icon"
                                  : "mdi mdi-plus float-right accor-plus-icon"
                              }
                            ></i>
                          </Link>
                        </h5>

                        <Collapse
                          isOpen={Discount}
                          id="collapseExample1"
                        >
                          <div className="mt-4">
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productdiscountRadio6"
                                name="productdiscountRadio1"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productdiscountRadio6"
                              >
                                50% or more
                              </Label>
                            </div>
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productdiscountRadio5"
                                name="productdiscountRadio1"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productdiscountRadio5"
                              >
                                40% or more
                              </Label>
                            </div>
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productdiscountRadio4"
                                name="productdiscountRadio1"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productdiscountRadio4"
                              >
                                30% or more
                              </Label>
                            </div>
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productdiscountRadio3"
                                name="productdiscountRadio1"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productdiscountRadio3"
                              >
                                20% or more
                              </Label>
                            </div>
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productdiscountRadio2"
                                name="productdiscountRadio1"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productdiscountRadio2"
                              >
                                10% or more
                              </Label>
                            </div>
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productdiscountRadio1"
                                name="productdiscountRadio1"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productdiscountRadio1"
                              >
                                Less than 10%
                              </Label>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                    </CardBody>

                    <CardBody className="border-top">
                      <div>
                        <h5 className="font-size-14 mb-0">
                          <Link
                            to="#"
                            className="text-dark d-block"
                            onClick={() =>
                              setSize(!Size)
                            }
                          >
                            Size{" "}
                            <i
                              className={
                                Size === true
                                  ? "mdi mdi-minus float-right accor-minus-icon"
                                  : "mdi mdi-plus float-right accor-plus-icon"
                              }
                            ></i>
                          </Link>
                        </h5>

                        <Collapse
                          isOpen={Size}
                          id="collapseExample2"
                        >
                          <div className="mt-4">
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productsizeRadio1"
                                name="productsizeRadio"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productsizeRadio1"
                              >
                                X-Large
                              </Label>
                            </div>
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productsizeRadio2"
                                name="productsizeRadio"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productsizeRadio2"
                              >
                                Large
                              </Label>
                            </div>
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productsizeRadio3"
                                name="productsizeRadio"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productsizeRadio3"
                              >
                                Medium
                              </Label>
                            </div>
                            <div className="custom-control custom-radio mt-2">
                              <Input
                                type="radio"
                                id="productsizeRadio4"
                                name="productsizeRadio"
                                className="custom-control-input"
                              />
                              <Label
                                className="custom-control-label"
                                htmlFor="productsizeRadio4"
                              >
                                Small
                              </Label>
                            </div>
                          </div>
                        </Collapse>
                      </div>
                    </CardBody>
                  </div>
                </Card>
              </Col>
              <Col lg={9}>
                <Card>
                  <CardBody>
                    <div>
                      <Row>
                        <Col md={6}>
                          <div>
                            <Breadcrumb listClassName="p-0 bg-transparent mb-2">
                              <BreadcrumbItem>
                                <Link to="#">Fashion</Link>
                              </BreadcrumbItem>
                              <BreadcrumbItem>
                                <Link to="#">Clothing</Link>
                              </BreadcrumbItem>
                            </Breadcrumb>
                          </div>
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

                      <ul className="list-inline my-3 ecommerce-sortby-list">
                        <li className="list-inline-item">
                          <span className="font-weight-medium font-family-secondary">
                            Sort by:
                          </span>
                        </li>
                        <li className="list-inline-item active ml-1">
                          <Link to="#">Popularity</Link>
                        </li>
                        <li className="list-inline-item ml-1">
                          <Link to="#">Newest</Link>
                        </li>
                        <li className="list-inline-item ml-1">
                          <Link to="#">Discount</Link>
                        </li>
                      </ul>

                      <ProductListing data ={productsData}/>
                      <Row className="mt-4">
                        <Col sm={6}>
                          <div>
                            <p className="mb-sm-0 mt-2">
                              Page <span className="font-weight-bold">2</span>{" "}
                              Of <span className="font-weight-bold">113</span>
                            </p>
                          </div>
                        </Col>
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
                                <PaginationLink href="#">3</PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink hrefo="#">4</PaginationLink>
                              </PaginationItem>
                              <PaginationItem>
                                <PaginationLink href="#">5</PaginationLink>
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
  productsData :selectDataIsMapping
})

const mapDispatchToProps = dispatch=>({
  fetchDataStart: ()=>dispatch(fetchDataStart()),
})
export default connect(mapStateToProps, mapDispatchToProps) (Products);
