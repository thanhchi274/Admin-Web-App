import React, { Component } from "react";
import { Row, Col, Card, CardBody, ButtonGroup, Button } from "reactstrap";

//Import Charts
import ReactApexChart from "react-apexcharts";
import "./dashboard.scss";

class RevenueAnalytics extends Component {
  state = {
    series: [
      {
        name: "2021",
        type: "bar",
        data: this.props.data,
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: [0, 3],
        curve: "smooth",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "20%",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#5664d2"],
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  };
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <div className="float-right d-none d-md-inline-block">
              <ButtonGroup className="mb-2">
                <Button size="sm" color="light" active type="button">
                  Monthly
                </Button>
              </ButtonGroup>
            </div>
            <h4 className="card-title mb-4">Revenue Analytics</h4>
            <div>
              <div id="line-column-chart" className="apex-charts" dir="ltr">
                <ReactApexChart
                  options={this.state.options}
                  series={this.state.series}
                  type="bar"
                  height="280"
                />
              </div>
            </div>
          </CardBody>

          <CardBody className="border-top text-center">
            <Row>
              <Col sm={4}>
                <div className="mt-4 mt-sm-0">
                  <p className="mb-2 text-muted text-truncate">This Month :</p>
                  <div className="d-inline-flex">
                    <h5 className="mb-0 mr-2">{this.props.thisMonth} VND</h5>
                  </div>
                </div>
              </Col>

              <Col sm={4}>
                <div className="mt-4 mt-sm-0">
                  <p className="mb-2 text-muted text-truncate"> This Year :</p>
                  <div className="d-inline-flex">
                    <h5 className="mb-0 mr-2"> {this.props.currentYear} VND</h5>
                  </div>
                </div>
              </Col>
              <Col sm={4}>
                <div className="mt-4 mt-sm-0">
                  <p className="mb-2 text-muted text-truncate">
                    {" "}
                    Previous Year :
                  </p>
                  <div className="d-inline-flex">
                    <h5 className="mb-0">
                      {" "}
                      {this.props.previousYear
                        ? this.props.previousYear
                        : 0}VND{" "}
                    </h5>
                  </div>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default RevenueAnalytics;
