import React, { useState, useEffect } from "react";
import {
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { connect } from 'react-redux'
import {
  changeOrderStatusStart
} from "../../store/analysis/analysis.actions";
const DropDownComponent = ({data,changeOrderStatusStart}) => {
  const [singleBtn, setsingleBtn] = useState(false);
  const handleOnClick =(event)=>{
    let status =event.target.value
    changeOrderStatusStart({...data, status})
  }
  return (
    <Dropdown
      isOpen={singleBtn}
      toggle={() => setsingleBtn(!singleBtn)}
    >
      <DropdownToggle color="primary" caret>
        Edit
        <i className="mdi mdi-chevron-down"></i>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={handleOnClick}value={"prepare"}>Shipping</DropdownItem>
        <DropdownItem onClick={handleOnClick} value={"finished"}>Done</DropdownItem>
        <DropdownItem onClick={handleOnClick} value={"canceled"}>Cancel</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
const mapDispatchToProps = (dispatch) => ({
  changeOrderStatusStart: (data) => dispatch(changeOrderStatusStart(data))
});
export default connect(null, mapDispatchToProps)(DropDownComponent);
