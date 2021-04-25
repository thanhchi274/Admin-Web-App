import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  Button,
} from "reactstrap";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import Slider from "react-slick";
import { Link, useHistory } from "react-router-dom";
import classnames from "classnames";
import { createStructuredSelector } from "reselect";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  selectSingleProduct,
  selectIsDataFetching,
} from "../../store/product/product.selectors";
import _ from "lodash";
import { fetchSingleProductStart } from "../../store/product/product.actions";
import { connect } from "react-redux";
import SmallImages from "./Products/common/small-image";
const ProductDetail = ({
  fetchSingleProductStart,
  isFetching,
  singleProduct,
  ...otherProps
}) => {
  const [breadcrumbItems, setbreadcrumbItems] = useState([
    { title: "Ecommerce", link: "#" },
    { title: "Product Details", link: "#" },
  ]);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const [vertical, setVertical] = useState(true);
  let history = useHistory();
  let productsnav = {
    vertical: vertical,
    verticalSwiping: vertical,
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".product-right-slick",
    arrows: false,
    infinite: true,
    centerMode: false,
    dots: false,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };
  let products = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
  };

  useEffect(() => {
    fetchSingleProductStart(otherProps.match.params.id);
  }, [fetchSingleProductStart]);
  const [activeTab2, setActiveTab2] = useState("2");
  const toggleTab2 = (tab) => {
    if (activeTab2 !== tab) {
      setActiveTab2(tab);
    }
  };
  const handleEdit = () => {
    history.push(`/product-edit/${otherProps.match.params.id}`);
  };
  return ( singleProduct && (isFetching === false)) ? (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Product Details"
            breadcrumbItems={breadcrumbItems}
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <Row>
                    <Col xl={5}>
                      <div className="product-detail">
                        <Row>
                          <Col xs={3}>
                            <SmallImages
                              item={singleProduct}
                              settings={productsnav}
                              navOne={nav1}
                            />
                          </Col>
                          <Col md={8} xs={9}>
                            <Slider
                              {...products}
                              asNavFor={nav2}
                              ref={(slider) => setNav1(slider)}
                              className="product-right-slick"
                            >
                              {singleProduct.variants.map((vari, index) => (
                                <InnerImageZoom
                                  className="img-fluid"
                                  moveType={"pan"}
                                  fullscreenOnMobile={true}
                                  zoomScale={1.2}
                                  src={vari.images}
                                  key={index}
                                />
                              ))}
                            </Slider>
                            <Row className="text-center mt-2">
                              <Col sm={6}>
                                <Button
                                  color="success"
                                  block
                                  type="button"
                                  onClick={handleEdit}
                                  className="waves-effect waves-light mt-2 mr-1"
                                >
                                  Edit this product
                                </Button>
                              </Col>
                              <Col sm={6}>
                                <Button
                                  color="danger"
                                  block
                                  type="button"
                                  className="waves-effect waves-light mt-2 mr-1"
                                >
                                  Delete this product
                                </Button>
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                    <Col xl={7}>
                      <div className="mt-4 mt-xl-3">
                        <h5 className="mt-1 mb-3">{singleProduct.name}</h5>

                        <div className="d-inline-flex">
                          <div className="text-muted mr-3">
                            <div className="rating">
                              {_.range(0, singleProduct.rating).map(
                                (value, key, range) => {
                                  return (
                                    <span
                                      key={key}
                                      className="mdi mdi-star text-warning mr-1"
                                    ></span>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        </div>

                        <h5 className="mt-2">
                          {singleProduct.discount !== "0" ? (
                            <del className="text-muted mr-2">
                              {singleProduct.price}
                            </del>
                          ) : null}
                          {singleProduct.discount !== "0"
                            ? singleProduct.price -
                              (singleProduct.discount *
                                singleProduct.price) /
                                100
                            : null}
                          {singleProduct.discount === "0" ? null : (
                            <span className="text-danger font-size-12 ml-2">
                              {singleProduct.discount} % Off
                            </span>
                          )}
                        </h5>
                        <p className="mt-3">{singleProduct.shortDetails}</p>
                        <Row>
                          <Col md={6}>
                            <div className="product-color mt-3">
                              <h5 className="font-size-14">Color :</h5>
                              {singleProduct.colors.map((item, index) => (
                                <Link to="#" className="active ml-1">
                                  <div
                                    className="product-color-item"
                                    key={index}
                                  >
                                    <div className="avatar-xs">
                                      <p
                                        className="avatar-title text-body"
                                        style={{ backgroundColor: `${item}` }}
                                      ></p>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                            <div className="product-color mt-3">
                              <h5 className="font-size-14">Size :</h5>
                              {singleProduct.size.map((item, index) => (
                                <Link to="#" className="active ml-1">
                                  <div
                                    className="product-color-item"
                                    key={index}
                                  >
                                    <div className="avatar-xs">
                                      <span className="avatar-title bg-transparent text-body">
                                        {item}
                                      </span>
                                    </div>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>

                  <div className="mt-4">
                    <div className="product-desc">
                      <Nav tabs className="nav-tabs-custom" role="tablist">
                        <NavItem>
                          <NavLink
                            id="desc-tab"
                            className={classnames({
                              active: activeTab2 === "1",
                            })}
                            onClick={() => {
                              toggleTab2("1");
                            }}
                          >
                            Description
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            id="specifi-tab"
                            className={classnames({
                              active: activeTab2 === "2",
                            })}
                            onClick={() => {
                              toggleTab2("2");
                            }}
                          >
                            Specifications
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent
                        activeTab={activeTab2}
                        className="border border-top-0 p-4"
                      >
                        <TabPane tabId="1" role="tabpanel">
                          <div>
                            <p>{singleProduct.description}</p>
                          </div>
                        </TabPane>
                        <TabPane tabId="2" id="specifi" role="tabpanel">
                          <div className="table-responsive">
                            <Table className="table-nowrap mb-0">
                              <tbody>
                                <tr>
                                  <th scope="row">Brand</th>
                                  <td>{singleProduct.tags}</td>
                                </tr>
                                <tr>
                                  <th scope="row">Size</th>
                                  <td>
                                    {singleProduct.size.map(
                                      (item, index) => (
                                        <span>{item + "  "}</span>
                                      )
                                    )}
                                  </td>
                                </tr>
                                <tr>
                                  <th scope="row">Material</th>
                                  <td>Cotton</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  ) : (
    <div id="preloader">
      <div id="status">
        <div className="spinner">
          <i className="ri-loader-line spin-icon"></i>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  singleProduct: selectSingleProduct,
  isFetching: selectIsDataFetching,
});
const mapDispatchToProps = (dispatch) => ({
  fetchSingleProductStart: (data) => dispatch(fetchSingleProductStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
