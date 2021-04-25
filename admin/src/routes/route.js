import React from "react";
import { Route, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../store/user/user.selector";
import { checkUserSession } from "../store/user/user.action";
import { connect } from "react-redux";
const AppRoute = ({
  component: Component,
  layout: Layout,
  isAuthProtected,
  currentUser,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (isAuthProtected && !localStorage.getItem("user")) {
        return (
          <Redirect
            to={{ pathname: "/login", state: { from: props.location } }}
          />
        );
      }
      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});
const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});
export default connect(mapStateToProps, mapDispatchToProps)(AppRoute);
