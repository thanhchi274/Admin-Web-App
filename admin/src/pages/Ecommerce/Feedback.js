import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Table,
  UncontrolledTooltip,
  Alert,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  FormGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import { AvForm, AvField } from 
"availity-reactstrap-validation";
import { createStructuredSelector } from "reselect";
import {selectHistorySupport} from '../../store/analysis/analysis.selectors'
import Breadcrumbs from "../../components/Common/Breadcrumb";
import DropDownComponent from "../../components/DropDownComponent/dropDown.component";
import { connect } from "react-redux";
import { fetchSupportHistoryStart,sendFeedbackStart } from "../../store/analysis/analysis.actions";
const Feedback = ({ fetchSupportHistoryStart,supportData,sendFeedbackStart }) => {
  const [breadCrumbItems, setbreadCrumbItems] = useState([
    { title: "Ecommerce", link: "#" },
    { title: "Customers", link: "#" },
  ]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [modal_static, setModal_static] = useState(false);
  const [customerData, setCustomerData] = useState(null);
  const [dataChange, setDataChange] = useState(null)
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchSupportHistoryStart()
  }, [fetchSupportHistoryStart])
  useEffect(() => {
      setData(supportData)
  },[supportData])
  const tog_static=(data)=> {
    setModal_static(!modal_static)
    removeBodyCss();
    setCustomerData(data)
  }
  const removeBodyCss=()=> {
    document.body.classList.add("no_padding");
  }
  const handleChange = (event) => {
    const { value, name } = event.target;
    setDataChange({
      ...dataChange,
      [name]: value,
    });
  };
  const addCustomer = (event, values) => {
      sendFeedbackStart([{...customerData, "status":"false"},dataChange])
  };
  return data!==null && supportData?(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs
            title="Customers"
            breadcrumbItems={breadCrumbItems}
          />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div className="table-responsive mt-3">
                    <Table
                      className="table-centered datatable dt-responsive nowrap "
                      style={{
                        borderCollapse: "collapse",
                        borderSpacing: 0,
                        width: "100%",
                      }}
                    >
                      <thead className="thead-light">
                        <tr>
                          <th>Customer</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Content</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((customerData, key) => (
                          <tr key={key}>
                            <td>{customerData.lastName +" "+ customerData.firstName}</td>
                            <td>{customerData.email}</td>
                            <td>{customerData.phoneNumber}</td>
                            <td>{customerData.comment}</td>
                            <td>{customerData.status}</td>
                            <td>
                              <Link
                                to="#"
                                onClick={(event) =>tog_static(customerData)}
                                className="btn btn-success mb-2"
                              >
                                <i className="mdi mdi-plus mr-2"></i> Reply
                              </Link>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Modal
            isOpen={modal_static}
            toggle={tog_static}
            backdrop="static"
            centered
            size="lg"
          >
            <ModalHeader toggle={() => setModal_static(false)}>
              Mail Details
            </ModalHeader>
            <ModalBody>
              <AvForm onValidSubmit={addCustomer}>
                <Row>
                  <Col lg={12}>
                    <Alert
                      color="success"
                      isOpen={isAlertOpen}
                      toggle={() => setIsAlertOpen(false)}
                    >
                      Data Added Successfully...!
                    </Alert>
                    <FormGroup>
                      <Label htmlFor="name">Customer Name</Label>
                      <AvField
                        name="custname"
                        type="text"
                        className="form-control"
                        disabled={true}
                        id="custname"
                        placeholder="Enter Customer Name"
                        value={customerData!==null?customerData.lastName +" "+ customerData.firstName:null}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg={4}>
                    <FormGroup>
                      <Label htmlFor="email">Email</Label>
                      <AvField
                        name="custemail"
                        type="email"
                        className="form-control"
                        id="custemail"
                        onChange={handleChange}
                        disabled={true}
                        placeholder="Enter Email"
                        value={customerData!==null?customerData.email:null}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={4}>
                    <FormGroup>
                      <Label htmlFor="email">Message</Label>
                      <AvField
                        name="title"
                        type="text"
                        className="form-control"
                        id="title"
                        placeholder="title"
                        required
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg={12}>
                    <FormGroup>
                      <Label htmlFor="productdesc">Reply Content</Label>
                      <textarea
                        className="form-control"
                        id="productdesc"
                        rows="5"
                        name="message"
                        max="2500"
                        onChange={handleChange}
                      ></textarea>
                    </FormGroup>
                  </Col>
                </Row>
                <ModalFooter>
                  <Button
                    type="button"
                    color="light"
                    onClick={() => setModal_static(false)}
                  >
                    Calcel
                  </Button>
                  <Button type="submit" color="primary">
                    Add
                  </Button>
                </ModalFooter>
              </AvForm>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </React.Fragment>
  ): (
    <div id="preloader">
    <div id="status">
        <div className="spinner">
            <i className="ri-loader-line spin-icon"></i>
        </div>
    </div>
</div>
  )
};
const mapStateToProps = createStructuredSelector({
    supportData: selectHistorySupport,
  });
const mapDispatchToProps = (dispatch) => ({
  fetchSupportHistoryStart: (data) => dispatch(fetchSupportHistoryStart(data)),
  sendFeedbackStart: (data) => dispatch(sendFeedbackStart(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
