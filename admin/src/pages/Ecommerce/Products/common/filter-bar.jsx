import React, { Component } from "react";
import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";
// import { selectFilter } from "../../../Store/shop/shop.selectors";
// import { filterSort } from "../../../Store/filter/filter.action";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
// import FilterListIcon from '@material-ui/icons/FilterList';
const FilterBar = ({ filterSort, onLayoutViewClicked }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    switch (index) {
      case 1:
        return filterSort("HighToLow");
      case 2:
        return filterSort("LowToHigh");
      case 3:
        return filterSort("Newest");
      case 4:
        return filterSort("AscOrder");
      case 5:
        return filterSort("DescOrder");
      default:
        event.preventDefault();
        break;
    }
  };
  const options = [
    "Choosing Sort Type",
    "Price: High to Low",
    "Price: Low to High",
    "Newest Items",
    "Sort By Name: A To Z",
    "Sort By Name: Z To A",
  ];
  return (
    <div className="product-filter-content">
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        {/* <FilterListIcon fontSize="large" /> */}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

// const mapStateToProps = createStructuredSelector({
//   filters: selectFilter,
// });
// const mapDispatchToProps = (dispatch) => ({
//   filterSort: (data) => dispatch(filterSort(data)),
// });

export default connect(null, null)(FilterBar);
