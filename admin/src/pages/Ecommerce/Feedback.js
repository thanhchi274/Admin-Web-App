import React, { Component } from 'react';
import { Container, Card, CardBody, Row, Col, Table,UncontrolledTooltip, Alert, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Breadcrumbs from '../../components/Common/Breadcrumb';
class Customers extends Component {
    constructor(props) {
        super(props);
        this.state={
            breadcrumbItems : [
                { title : "Ecommerce", link : "#" },
                { title : "Customers", link : "#" },
            ],
            isAlertOpen : false,
            modal_static : false,
            data : [
                {
                    customer : "Carolyn Harvey",
                    email : "CarolynHarvey@rhyta.com",
                    phone : "580-464-4694",
                    date : "06 Apr, 2020",
                },
            ]
        }
        this.addCustomer.bind(this);
    }

    addCustomer = (event, values) => {
        //Assign values to the variables
        var name = values.custname;
        var cEmail = values.custemail;
        var phonenumber = values.phonenumber;
        var d = new Date();
        var day = d.getDate();
        var mon = d.getMonth();
        var y = d.getFullYear();
        var date = day + "/" + mon + "/" + y;
        let demoData = this.state.data;

        demoData.push({ customer :name, email : cEmail, phone : phonenumber, date : date })
        this.setState({data : demoData});
        this.setState({isAlertOpen : true});
        setTimeout(() => { 
            this.setState({modal_static : false});
        }, 2000);
    }
    render() {
        return (
            <React.Fragment>
                <div  className="page-content">
                    <Container fluid>

                    <Breadcrumbs title="Customers" breadcrumbItems={this.state.breadcrumbItems} />

                        <Row>
                            <Col lg={12}>
                                <Card>
                                    <CardBody>
                                        <div>
                                            <Link to="#" onClick={() => this.setState({ modal_static: true, isAlertOpen : false })} className="btn btn-success mb-2"><i  className="mdi mdi-plus mr-2"></i> New Mail</Link>
                                        </div>
                                        <div  className="table-responsive mt-3">
                                            <Table className="table-centered datatable dt-responsive nowrap " style={{borderCollapse:"collapse", borderSpacing : 0, width:"100%"}}>
                                                <thead  className="thead-light">
                                                    <tr>
                                                        <th style={{width:"20px"}}>
                                                            <div  className="custom-control custom-checkbox">
                                                                <Input type="checkbox"  className="custom-control-input" id="customercheck"/>
                                                                <Label  className="custom-control-label" htmlFor="customercheck">&nbsp;</Label>
                                                            </div>
                                                        </th>
                                                        <th>Customer</th>
                                                        <th>Email</th>
                                                        <th>Phone</th>
                                                        <th>Created Date</th>
                                                        <th style={{width:"120px"}}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        this.state.data.map((customerData, key) =>
                                                            <tr key={key}>
                                                                <td>
                                                                    <div  className="custom-control custom-checkbox">
                                                                        <Input type="checkbox"  className="custom-control-input" id={"customercheck" + key}/>
                                                                        <Label  className="custom-control-label" htmlFor={"customercheck" + key}>&nbsp;</Label>
                                                                    </div>
                                                                </td>
                                                                <td>{customerData.customer}</td>
                                                                <td>{customerData.email}</td>
                                                                <td>{customerData.phone}</td>
                                                                <td>
                                                                   {customerData.date}
                                                                </td>
                                                                <td>
                                                                <Link to="#"  className="mr-3 text-primary" id={"edit"+key}><i  className="mdi mdi-pencil font-size-18"></i></Link>
                                                                    <UncontrolledTooltip target={"edit"+key} placement="top">
                                                                        Edit
                                                                    </UncontrolledTooltip>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Modal
                          isOpen={this.state.modal_static}
                          toggle={this.tog_static}
                          backdrop="static"
                          centered
                          size = "lg"
                        >
                            <ModalHeader toggle={() => this.setState({ modal_static: false })}>
                            Customer Details
                            </ModalHeader>
                            <ModalBody>
                            <AvForm onValidSubmit={this.addCustomer}>
                                <Row>
                                    <Col lg={12}>
                                    <Alert color="success" isOpen={this.state.isAlertOpen} toggle={ () => this.setState({isAlertOpen : false}) }>
                                        Data Added Successfully...!
                                    </Alert>
                                    <FormGroup>
                                        <Label htmlFor="name">Customer Name</Label>
                                        <AvField
                                            name="custname"
                                            type="text"
                                            className="form-control"
                                            id="custname"
                                            placeholder="Enter Customer Name"
                                            required
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
                                            placeholder="Enter Email"
                                            required
                                            />
                                        </FormGroup>
                                        </Col>

                                        <Col lg={4}>
                                        <FormGroup>
                                            <Label htmlFor="email">Phone Number</Label>
                                            <AvField
                                            name="phonenumber"
                                            type="number"
                                            className="form-control"
                                            id="phonenumber"
                                            placeholder="Enter Phone Number"
                                            required
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
                                            />
                                        </FormGroup>
                                        </Col>
                                        <Col lg={12}>
                                        <FormGroup>
                                            <Label htmlFor="productdesc">
                                            Product Short Details
                                            </Label>
                                            <textarea
                                            className="form-control"
                                            id="productdesc"
                                            rows="5"
                                            name='message'
                                            ></textarea>
                                        </FormGroup>
                                        </Col>
                                    </Row>
                                    <ModalFooter>
                                        <Button type="button" color="light" onClick={() => this.setState({ modal_static: false }) }>Calcel</Button>
                                        <Button type="submit" color="primary">Add</Button>
                                    </ModalFooter>
                            </AvForm>
                            </ModalBody>
                            </Modal>

                    </Container>
                </div>
            </React.Fragment>
        );
    }
}

export default Customers;