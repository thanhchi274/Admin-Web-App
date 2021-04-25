import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOutStart } from "../../store/user/user.action";

const Logout =({signOutStart})=> {
    useEffect(() => {
        signOutStart()
    }, [signOutStart])
        return (
            <React.Fragment>
               <h1>&nbsp;</h1>
            </React.Fragment>
        );
}
const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart()),
  });
export default withRouter(connect(null,mapDispatchToProps)(Logout));

