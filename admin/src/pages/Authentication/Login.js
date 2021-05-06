import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Container,
} from "reactstrap";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/SVG/crown.svg";
import {googleSignInStart} from '../../store/user/user.action'
const Login = ({googleSignInStart}) => {
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
  })
export default withRouter(connect(null, mapDispatchToProps)(Login));
