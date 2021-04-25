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
  UncontrolledTooltip,
  Input,
  Label,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { MDBDataTable } from "mdbreact";
import "./datatables.scss";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbItems: [
        { title: "Ecommerce", link: "#" },
        { title: "Orders", link: "#" },
      ],
      activeTab: "1",
    };
    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  componentDidMount() {
    document
      .getElementsByClassName("pagination")[0]
      .classList.add("pagination-rounded");
  }

  render() {
    const data = {
      columns: [
        {
          label: (
            <div className="custom-control custom-checkbox">
              {" "}
              <Input
                type="checkbox"
                className="custom-control-input"
                id="ordercheck"
              />
              <Label className="custom-control-label" htmlFor="ordercheck">
                &nbsp;
              </Label>
            </div>
          ),
          field: "checkbox",
          sort: "asc",
          width: 28,
        },
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
          width: 78,
        },
        {
          label: "Date",
          field: "date",
          sort: "asc",
          width: 93,
        },
        {
          label: "Billing Name",
          field: "billingName",
          sort: "asc",
          width: 109,
        },
        {
          label: "Total",
          field: "total",
          sort: "asc",
          width: 48,
        },
        {
          label: "Payment Status",
          field: "status",
          sort: "asc",
          width: 135,
        },
        {
          label: "Invoice",
          field: "invoice",
          sort: "asc",
          width: 110,
        },
        {
          label: "Action",
          field: "action",
          sort: "asc",
          width: 120,
        },
      ],
      rows: [
        {
          checkbox: (
            <div className="custom-control custom-checkbox">
              <Input
                type="checkbox"
                className="custom-control-input"
                id="ordercheck10"
              />
              <Label className="custom-control-label" htmlFor="ordercheck10">
                &nbsp;
              </Label>
            </div>
          ),
          id: (
            <Link to="#" className="text-dark font-weight-bold">
              #NZ1565
            </Link>
          ),
          date: "04 Apr, 2020",
          billingName: "Walter Brown",
          total: "$172",
          status: (
            <div className="badge badge-soft-success font-size-12">Paid</div>
          ),
          invoice: (
            <Button className="btn-rounded" color="light">
              Invoice <i className="mdi mdi-download ml-2"></i>
            </Button>
          ),
          action: (
            <>
              <Link to="#" className="mr-3 text-primary" id="edit10">
                <i className="mdi mdi-pencil font-size-18"></i>
              </Link>
              <UncontrolledTooltip placement="top" target="edit10">
                Edit
              </UncontrolledTooltip>
            </>
          ),
        },
      ],
    };
    return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            <Breadcrumbs
              title="Orders"
              breadcrumbItems={this.state.breadcrumbItems}
            />
            <Row>
              <Col lg={12}>
                <Card>
                  <CardBody className="pt-0">
                    <Nav tabs className="nav-tabs-custom mb-4">
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            this.toggleTab("1");
                          }}
                          className={classnames(
                            { active: this.state.activeTab === "1" },
                            "font-weight-bold p-3"
                          )}
                        >
                          All Orders
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            this.toggleTab("2");
                          }}
                          className={classnames(
                            { active: this.state.activeTab === "2" },
                            "p-3 font-weight-bold"
                          )}
                        >
                          Newest
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <MDBDataTable responsive data={data} className="mt-4" />
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

export default Orders;
