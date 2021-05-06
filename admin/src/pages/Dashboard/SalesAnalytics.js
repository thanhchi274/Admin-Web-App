import React, { Component } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import ReactApexChart from "react-apexcharts";
import "./dashboard.scss";
class SalesAnalytics extends Component {
  state = {
    series: this.props.data,
    options: {
      labels: ["Louis Vuiton", "Nike", "Adidas", "Gucci"],
      plotOptions: {
        pie: {
          donut: {
            size: "75%",
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      colors: ["#5664d2", "#1cbb8c", "#eeb902","#bbb2e9"],
    },
  };
  render() {
    return (
      <React.Fragment>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Sales Analytics</h4>
            <div id="donut-chart" className="apex-charts">
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="donut"
                height="230"
              />
            </div>
            <Row>
            <Col xs={4}>
                <div className="text-center mt-4">
                  <p className="mb-2 text-truncate">
                    Gucci
                  </p>
                  <h5>{Math.round(this.props.data[1]/this.props.total*100,0) }%</h5>
                </div>
              </Col>
              <Col xs={4}>
                <div className="text-center mt-4">
                  <p className="mb-2 text-truncate">
                    Louis Vuitton
                  </p>
                  <h5>{Math.round(this.props.data[0]/this.props.total*100,0) }%</h5>
                </div>
              </Col>
              <Col xs={4}>
                <div className="text-center mt-4">
                  <p className="mb-2 text-truncate">
                    Nike
                  </p>
                  <h5>{Math.round(this.props.data[2]/this.props.total*100,0) }%</h5>
                </div>
              </Col>
              <Col xs={4}>
                <div className="text-center mt-4">
                  <p className="mb-2 text-truncate">
                    Adidas
                  </p>
                  <h5>{Math.round(this.props.data[3]/this.props.total*100,0) }%</h5>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </React.Fragment>
    );
  }
}

export default SalesAnalytics;
