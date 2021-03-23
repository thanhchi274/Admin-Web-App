import React from "react";
import {
  Card,
  CardBody,
  Col,
  Collapse,
  CardHeader,
  Input,
  Label,
} from "reactstrap";
import Nouislider from "nouislider-react";
import { Link } from "react-router-dom";
export default function FilterBar() {
  return (
            <>
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

                >
                  Discount{" "}
                  <i
                    className={
                      "mdi mdi-minus float-right accor-minus-icon"
                    }
                  ></i>
                </Link>
              </h5>

              <Collapse isOpen={true} id="collapseExample1">
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
                  className="collapsed text-dark d-block"
                >
                  Customer Rating{" "}
                  <i
                    className={
                     "mdi mdi-minus float-right accor-minus-icon"
                    }
                  ></i>
                </Link>
              </h5>

              <Collapse isOpen={true} id="collapseExample3">
                <div className="mt-4">
                  <div className="custom-control custom-radio mt-2">
                    <Input
                      type="radio"
                      id="productratingRadio1"
                      name="productratingRadio1"
                      className="custom-control-input"
                    />
                    <Label
                      className="custom-control-label"
                      htmlFor="productratingRadio1"
                    >
                      4 <i className="mdi mdi-star text-warning"></i> & Above
                    </Label>
                  </div>
                  <div className="custom-control custom-radio mt-2">
                    <Input
                      type="radio"
                      id="productratingRadio2"
                      name="productratingRadio1"
                      className="custom-control-input"
                    />
                    <Label
                      className="custom-control-label"
                      htmlFor="productratingRadio2"
                    >
                      3 <i className="mdi mdi-star text-warning"></i> & Above
                    </Label>
                  </div>
                  <div className="custom-control custom-radio mt-2">
                    <Input
                      type="radio"
                      id="productratingRadio3"
                      name="productratingRadio1"
                      className="custom-control-input"
                    />
                    <Label
                      className="custom-control-label"
                      htmlFor="productratingRadio3"
                    >
                      2 <i className="mdi mdi-star text-warning"></i> & Above
                    </Label>
                  </div>
                  <div className="custom-control custom-radio mt-2">
                    <Input
                      type="radio"
                      id="productratingRadio4"
                      name="productratingRadio1"
                      className="custom-control-input"
                    />
                    <Label
                      className="custom-control-label"
                      htmlFor="productratingRadio4"
                    >
                      1 <i className="mdi mdi-star text-warning"></i>
                    </Label>
                  </div>
                </div>
              </Collapse>
            </div>
          </CardBody>
        </div>
      </Card>
    </Col>
    </>
  );
}
