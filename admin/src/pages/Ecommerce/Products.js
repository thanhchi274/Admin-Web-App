import React, { useState, useEffect } from "react";
import { Container, Card, CardBody, Row, Col } from "reactstrap";
import ProductListing from "./Products/common/product-listing";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import FilterBar from "./Products/common/filter-bar";
import { createStructuredSelector } from "reselect";
import {
  fetchDataStart,
  changePagePagination,
} from "../../store/product/product.actions";
import { getVisibleproducts,selectTotalProductSize } from "../../store/product/product.selectors";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { connect } from "react-redux";
import { selectPaginationValue } from "../../store/product/product.selectors";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
    "& .MuiPaginationItem-root": {
      color: "#fff",
    },
    "& .MuiPagination-ul": {
      justifyContent: "flex-end",
    },
  },
}));
const Products = ({
  fetchDataStart,
  productsData,
  paginationValue,
  changePagePagination,
  totalProductLength
}) => {
  const classes = useStyles();
  const [BreadCrumbItems, setBreadCrumbItems] = useState([
    { title: "Ecommerce", link: "#" },
    { title: "Products", link: "#" },
  ]);
  const [pagination, setPagination] = useState(1);
  useEffect(() => {
    fetchDataStart();
  }, [fetchDataStart]);
  useEffect(() => {
    setPagination(paginationValue);
  }, [paginationValue]);
  const handleChangePagination = (event, value) => {
    setPagination(value);
    changePagePagination(value);
  };
  return productsData ? (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Products" breadcrumbItems={BreadCrumbItems} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div>
                    <Row>
                      <Col md={6}>
                        <FilterBar />
                      </Col>
                    </Row>
                    <ProductListing data={productsData} />
                    <Row className="mt-4">
                      <Col sm={12}>
                        <div className="float-sm-left" className={classes.root}>
                          <Pagination
                            onChange={handleChangePagination}
                            page={pagination}
                            count={Math.round((totalProductLength/20)*100)/100>1?Math.round(1+((totalProductLength/20)*100)/100):1}
                            hideNextButton={totalProductLength<=20?true:false}
                            color="secondary"
                          />
                        </div>
                      </Col>
                    </Row>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  ) : (
    <>Is Loaading</>
  );
};
const mapStateToProps = createStructuredSelector({
  productsData: getVisibleproducts,
  paginationValue: selectPaginationValue,
  totalProductLength:selectTotalProductSize
});

const mapDispatchToProps = (dispatch) => ({
  fetchDataStart: () => dispatch(fetchDataStart()),
  changePagePagination: (data) => dispatch(changePagePagination(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Products);
