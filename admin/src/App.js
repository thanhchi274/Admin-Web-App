import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter as Router, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { authProtectedRoutes, publicRoutes } from "./routes/";
import AppRoute from "./routes/route";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./store/user/user.selector";
import { checkUserSession } from "./store/user/user.action";
import VerticalLayout from "./components/VerticalLayout/";
import NonAuthLayout from "./components/NonAuthLayout";
import "./theme.scss";
const App = ({ checkUserSession, currentUser }) => {
  const getLayout = () => {
    let layoutCls = VerticalLayout;
    return layoutCls;
  };
  const Layout = getLayout();
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  return (
    <React.Fragment>
      <Router>
        <Switch>
          {publicRoutes.map((route, idx) => (
            <AppRoute
              path={route.path}
              layout={NonAuthLayout}
              component={route.component}
              key={idx}
            />
          ))}
          {authProtectedRoutes.map((route, idx) =>(
            <AppRoute
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              isAuthProtected={true}
            />
          ))}
        </Switch>
      </Router>
    </React.Fragment>
  );
};
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
