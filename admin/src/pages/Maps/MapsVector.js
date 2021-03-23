import React, { Component } from 'react';

import { Row, Col, Card, CardBody, Container } from "reactstrap";
import Vector from "./Vectormap";
import WorldVectorMap from "./WorldVectorMap";

//Import Breadcrumb
import Breadcrumbs from '../../components/Common/Breadcrumb';

class MapsVector extends Component {
  constructor(props) {
    super(props);

    this.state = {
      breadcrumbItems : [
        { title : "Charts", link : "#" },
        { title : "Vector Maps", link : "#" },
      ],
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    }
    this.onMarkerClick = this.onMarkerClick.bind(this);
  }

  onMarkerClick(props, marker, e) {
    alert("You clicked in this marker");
  }

  render() {
    return (
      <React.Fragment>
                <div className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Vector Maps" breadcrumbItems={this.state.breadcrumbItems} />
                        
                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">World Vector Map</h4>
                                        <p className="card-title-dsec">Example of world vector maps.</p>
                                        <div id="world-map-markers" style={{height:"420px"}}>
                                        <WorldVectorMap
                                          value="world_mill"
                                          width="500"
                                          color="#d4dadd"
                                        />
                                        </div>
                                    </CardBody> 
                                </Card> 
                            </Col> 
                        </Row>
                        

                        <Row>
                            <Col lg={6}>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">USA Vector Map</h4>
                                        <p className="card-title-dsec">Example of united states of ameria vector maps.</p>
                                        <div id="usa-vectormap" style={{height:"350px"}}>
                                        <Vector
                                          value="us_aea"
                                          width="500"
                                          color="rgb(98, 110, 212)"
                                        />
                                        </div>
                                    </CardBody> 
                                </Card> 
                            </Col> 

                            <Col lg={6}>
                                <Card>
                                    <CardBody>
                                        <h4 className="card-title">Asia Vector Map</h4>
                                        <p className="card-title-dsec">Example of Asia vector maps.</p>
                                        <div id="india-vectormap" style={{height:"350px"}}>
                                        <Vector
                                          value="asia_mill"
                                          width="500"
                                          color="rgb(98, 110, 212)"
                                        />
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

export default MapsVector;