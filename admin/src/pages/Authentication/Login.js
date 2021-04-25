import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Alert,
  Container,
  Label,
  FormGroup,
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { ReactComponent as Logo } from "../../assets/SVG/crown.svg";
import {googleSignInStart, emailSignInStart,facebookSignInStart} from '../../store/user/user.action'
const Login = ({emailSignInStart, googleSignInStart}) => {
  const [userCredentials, setCredentials] = useState({
    email:"",password:"",
  });
  const {email, password} = userCredentials;
  const handleSubmit = async event => {
    event.preventDefault();
    emailSignInStart(email, password);
    setCredentials({ email: "", password: "" });
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setCredentials({...userCredentials,
      [name]: value,
    });
  };
  return (
    <React.Fragment>
        <Container fluid className="p-0">
          <Row className="no-gutters">
            <Col lg={4}>
              <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                <div className="w-100">
                  <Row className="justify-content-center">
                    <Col lg={9}>
                      <div>
                        <div className="text-center">
                          <div>
                            <Link to="/" className="logo">
                                <Logo />
                            </Link>
                          </div>
                          <h4 className="font-size-18 mt-4">Welcome !</h4>
                          <p className="text-muted">
                            Sign in to continue to Thanh Chi Clothing.
                          </p>
                        </div>
                        <div className="p-2 mt-5">
                          <AvForm
                            className="form-horizontal"
                            onValidSubmit={handleSubmit}
                          >
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-user-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="username">Email</Label>
                              <AvField
                                name="email"
                                value={userCredentials.email}
                                type="text"
                                className="form-control"
                                id="email"
                                onChange={handleChange}
                                validate={{ email: true, required: true }}
                                placeholder="Enter username"
                              />
                            </FormGroup>
                            <FormGroup className="auth-form-group-custom mb-4">
                              <i className="ri-lock-2-line auti-custom-input-icon"></i>
                              <Label htmlFor="password">Password</Label>
                              <AvField
                                name="password"
                                value={userCredentials.password}
                                type="password"
                                className="form-control"
                                id="password"
                                onChange={handleChange}
                                placeholder="Enter password"
                              />
                            </FormGroup>
                            <div className="mt-4 text-center">
                              <Button
                                color="primary"
                                className="w-md waves-effect waves-light"
                                type="submit"
                              >
                                Log In
                              </Button>
                            </div>
                            <div className="mt-4 text-center">
                              <Link
                                to="/forgot-password"
                                className="text-muted"
                              >
                                <i className="mdi mdi-lock mr-1"></i> Forgot
                                your password?
                              </Link>
                            </div>

                          </AvForm>
                          <div className="p-4 d-flex justify-content-center">
                          <button type="button" className="login-with-google-btn" onClick={googleSignInStart}>
                                Sign in with Google
                        </button>
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
            
            <Col lg={8}>
              <div className="authentication-bg">
                <div className="bg-overlay"></div>
              </div>
            </Col>
          </Row>
        </Container>
    </React.Fragment>
  );
};

const mapDispatchToProps =dispatch =>({
    googleSignInStart:()=>dispatch(googleSignInStart()),
    emailSignInStart:(email, password)=>dispatch(emailSignInStart({email, password})),
  })
export default withRouter(connect(null, mapDispatchToProps)(Login));
