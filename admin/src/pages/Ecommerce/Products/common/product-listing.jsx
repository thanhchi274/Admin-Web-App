import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  getVisibleproducts,
  selectCurrency,
  selectDataIsMapping,
  selectPaginationValue,
  selectFilter,
} from "../../../Store/shop/shop.selectors";
import _ from "lodash";
import { selectWishList } from "../../../Store/cart/cart.selectors";
import { ReactComponent as NotFoundSVG } from "../../../assets/SVG/search-not-found.svg";
import { addItem, addItemWishList } from "../../../Store/cart/cart.action";
import { changePaginationValue } from "../../../Store/shop/shop.actions";
import ProductListItem from "../../../components/product-item/product-item";
import {
  MobileView,
  BrowserView,
  isMobile,
  isBrowser,
  isTablet,
} from "react-device-detect";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
  },
}));
const ProductListing = ({
  products,
  addItem,
  symbol,
  total,
  addItemWishList,
  colSize,
  paginationValue,
  changePaginationValue,
  test,
}) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(paginationValue);
  let { brand, color, sortBy, value } = test;
  const [count, setCount] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    changePaginationValue(value);
  };
  useEffect(() => {
    setCount(
      brand.length === 0 &&
        color === undefined &&
        sortBy === "" &&
        value.min === 100 &&
        value.max === 1000
        ? Math.round(total.slice(-1)[0] / 29)
        : products.length / 29
    );
  }, [products.length]);
  return (
    <>
      <div className="product-wrapper-grid">
        {products.length > 0 ? (
          <>
            {isBrowser || isTablet ? (
              <>
                <div className="row infinite-scroll-component">
                  {products.map((product, index) => (
                    <div
                      className={`${
                        colSize === 3
                          ? "col-xl-3 col-md-6 col-grid-box"
                          : "col-lg-" + colSize
                      }`}
                      key={index}
                    >
                      <ProductListItem
                        product={product}
                        symbol={symbol}
                        onAddToWishlistClicked={addItemWishList}
                        onAddToCartClicked={addItem}
                        key={index}
                      />
                    </div>
                  ))}
                </div>
                <div className={classes.root}>
                  <Pagination
                    className={classes.pagination}
                    count={count}
                    page={page}
                    onChange={handleChange}
                  />
                </div>
              </>
            ) : (
              <MobileView>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gridGap: "10px",
                  }}
                >
                  {products.map((product, index) => (
                    <div
                      className={`${
                        colSize === 3
                          ? "col-xl-3 col-md-6 col-grid-box"
                          : "col-lg-" + colSize
                      }`}
                      key={index}
                    >
                      <ProductListItem
                        product={product}
                        symbol={symbol}
                        onAddToWishlistClicked={addItemWishList}
                        onAddToCartClicked={addItem}
                        key={index}
                      />
                    </div>
                  ))}
                </div>
              </MobileView>
            )}
          </>
        ) : (
          <div className="row">
            <div className="col-sm-12 text-center section-b-space mt-5 no-found">
              <NotFoundSVG style={{ width: "40vh", height: "40vh" }} />
              <h3>Sorry! Couldn't find the product you were looking For!!! </h3>
              <p>
                Please check if you have misspelt something or try searching
                with other words.
              </p>
              <Link to={`${process.env.PUBLIC_URL}/`} className="btn btn-solid">
                continue shopping
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  products: getVisibleproducts,
  wishList: selectWishList,
  symbol: selectCurrency,
  total: selectDataIsMapping,
  paginationValue: selectPaginationValue,
  test: selectFilter,
});
const mapDispatchToProps = (dispatch) => ({
  addItem: (data) => dispatch(addItem(data)),
  addItemWishList: (data) => dispatch(addItemWishList(data)),
  changePaginationValue: (data) => dispatch(changePaginationValue(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductListing);
