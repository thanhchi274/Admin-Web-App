import React, { Component } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Form,
  Input,
  Table,
  FormGroup,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

class CheckOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Ecommerce", link: "#" },
        { title: "Checkout", link: "#" },
      ],
      activeTab: 1,
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      if (tab >= 1 && tab <= 2) {
        this.setState({
          activeTab: tab,
        });
      }
    }
  }

  render() {
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Checkout"
              breadcrumbItems={this.state.breadcrumbItems}
            />

            <Row>
              <Col lg={8}>
                <Card>
                  <CardBody>
                    <div
                      id="checkout-nav-pills-wizard"
                      className="twitter-bs-wizard"
                    >
                      <Nav pills justified className="twitter-bs-wizard-nav">
                        <NavItem>
                          <NavLink
                            onClick={() => {
                              this.toggleTab(1);
                            }}
                            className={classnames({
                              active: this.state.activeTab === 1,
                            })}
                          >
                            <span className="step-number">01</span>
                            <span className="step-title">Billing Info</span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            onClick={() => {
                              this.toggleTab(2);
                            }}
                            className={classnames({
                              active: this.state.activeTab === 2,
                            })}
                          >
                            <span className="step-number">02</span>
                            <span className="step-title">Payment Info</span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent
                        activeTab={this.state.activeTab}
                        className="twitter-bs-wizard-tab-content"
                      >
                        <TabPane tabId={1}>
                          <h5 className="card-title">Billing information</h5>
                          <p className="card-title-desc">
                            If several languages coalesce, the grammar of the
                            resulting
                          </p>

                          <Form>
                            <div>
                              <div>
                                <Row>
                                  <Col lg={4}>
                                    <FormGroup className="mb-4">
                                      <Label htmlFor="billing-name">Name</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="billing-name"
                                        placeholder="Enter name"
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-4">
                                      <Label htmlFor="billing-email-address">
                                        Email Address
                                      </Label>
                                      <Input
                                        type="email"
                                        className="form-control"
                                        id="billing-email-address"
                                        placeholder="Enter email"
                                      />
                                    </FormGroup>
                                  </Col>
                                  <Col lg={4}>
                                    <FormGroup className="mb-4">
                                      <Label htmlFor="billing-phone">
                                        Phone
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="billing-phone"
                                        placeholder="Enter Phone no."
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>

                                <FormGroup className="mb-4">
                                  <Label htmlFor="billing-address">
                                    Address
                                  </Label>
                                  <textarea
                                    className="form-control"
                                    id="billing-address"
                                    rows="3"
                                    placeholder="Enter full address"
                                  ></textarea>
                                </FormGroup>

                                <Row>
                                  <Col lg={4}>
                                    <FormGroup className="mb-4 mb-lg-0">
                                      <Label>Country</Label>
                                    <Input
                                        type="text"
                                        className="form-control"
                                        id="country"
                                        placeholder="Viet Nam"
                                        disabled
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col lg={4}>
                                    <FormGroup className="mb-4 mb-lg-0">
                                      <Label htmlFor="billing-city">City</Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="billing-city"
                                        placeholder="Enter City"
                                      />
                                    </FormGroup>
                                  </Col>

                                  <Col lg={4}>
                                    <FormGroup className="mb-0">
                                      <Label htmlFor="zip-code">
                                        Zip / Postal code
                                      </Label>
                                      <Input
                                        type="text"
                                        className="form-control"
                                        id="zip-code"
                                        placeholder="Enter Postal code"
                                      />
                                    </FormGroup>
                                  </Col>
                                </Row>
                              </div>
                            </div>
                          </Form>
                        </TabPane>
                        <TabPane tabId={2}>
                          <h5 className="card-title">Payment information</h5>
                          <p className="card-title-desc">
                            It will be as simple as occidental in fact
                          </p>

                          <div>
                            <h5 className="font-size-14">Payment method :</h5>

                            <Row>
                              <Col lg={4} sm={6}>
                                <div>
                                  <Label className="card-radio-label mb-3">
                                    <Input
                                      type="radio"
                                      name="pay-method"
                                      id="pay-methodoption1"
                                      className="card-radio-input"
                                    />

                                    <div className="card-radio">
                                      <i className="fab fa-cc-mastercard font-size-24 align-middle mr-2"></i>
                                      <span className="ml-1">
                                        Credit / Debit Card
                                      </span>
                                    </div>
                                  </Label>
                                </div>
                              </Col>
                              <Col lg={4} sm={6}>
                                <div>
                                  <Label className="card-radio-label mb-3">
                                    <Input
                                      type="radio"
                                      name="pay-method"
                                      id="pay-methodoption3"
                                      className="card-radio-input"
                                      defaultChecked
                                    />

                                    <div className="card-radio">
                                      <i className="far fa-money-bill-alt font-size-24 align-middle mr-2"></i>
                                      <span className="ml-1">
                                        Cash on Delivery
                                      </span>
                                    </div>
                                  </Label>
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </TabPane>
                      </TabContent>

                      <ul className="pager wizard twitter-bs-wizard-pager-link">
                        <li
                          className={
                            this.state.activeTab === 1
                              ? "previous disabled"
                              : "previous"
                          }
                        >
                          <Link
                            to="#"
                            onClick={() => {
                              this.toggleTab(this.state.activeTab - 1);
                            }}
                          >
                            Previous
                          </Link>
                        </li>
                        <li
                          className={
                            this.state.activeTab === 3
                              ? "next disabled"
                              : "next"
                          }
                        >
                          <Link
                            to="#"
                            className="btn btn-success"
                            onClick={() => {
                              this.toggleTab(this.state.activeTab + 1);
                            }}
                          >
                            Complete order{" "}
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={4}>
                <Card className="checkout-order-summary">
                  <CardBody>
                    <div className="p-3 bg-light mb-4">
                      <h5 className="font-size-14 mb-0">
                        Order Summary{" "}
                        <span className="float-right ml-2">#SK2356</span>
                      </h5>
                    </div>
                    <div className="table-responsive">
                      <Table className="table-centered mb-0 table-nowrap">
                        <thead>
                          <tr>
                            <th
                              className="border-top-0"
                              style={{ width: "110px" }}
                              scope="col"
                            >
                              Product
                            </th>
                            <th className="border-top-0" scope="col">
                              Product Desc
                            </th>
                            <th className="border-top-0" scope="col">
                              Price
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">
                              <img
                                src={"#"}
                                alt="product-img"
                                title="product-img"
                                className="avatar-md"
                              />
                            </th>
                            <td>
                              <h5 className="font-size-14 text-truncate">
                                <Link
                                  to="/ecommerce-product-detail"
                                  className="text-dark"
                                >
                                  Full sleeve T-shirt
                                </Link>
                              </h5>
                              <p className="text-muted mb-0">$ 240 x 2</p>
                            </td>
                            <td>$ 480</td>
                          </tr>
                          <tr>
                            <th scope="row">
                              <img
                                src={"#"}
                                alt="product-img"
                                title="product-img"
                                className="avatar-md"
                              />
                            </th>
                            <td>
                              <h5 className="font-size-14 text-truncate">
                                <Link
                                  to="/ecommerce-product-detail"
                                  className="text-dark"
                                >
                                  Half sleeve T-shirt
                                </Link>
                              </h5>
                              <p className="text-muted mb-0">$ 225 x 1</p>
                            </td>
                            <td>$ 225</td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <h6 className="m-0 text-right">Sub Total:</h6>
                            </td>
                            <td>$ 705</td>
                          </tr>
                          <tr>
                            <td colSpan="3">
                              <div className="bg-soft-primary p-3 rounded">
                                <h5 className="font-size-14 text-primary mb-0">
                                  <i className="fas fa-shipping-fast mr-2"></i>{" "}
                                  Shipping{" "}
                                  <span className="float-right">Free</span>
                                </h5>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              <h6 className="m-0 text-right">Total:</h6>
                            </td>
                            <td>$ 705</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </React.Fragment>
    );
  }
}

export default CheckOut;
