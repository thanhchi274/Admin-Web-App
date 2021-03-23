import React, { useState } from "react";
import Breadcrumb from "../breadcrumb/breadcrumb";
import Filter from "./common/filter";
import FilterBar from "./common/filter-bar";
import ProductListing from "./common/product-listing";
import StickyBox from "react-sticky-box";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { selectIsDataFetching } from "../../Store/shop/shop.selectors";
import MobileFullScreenFilterDialog from '../mobile-fullscreen-filter-dialog/mobile-fullscreen-filter-dialog.component'
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Collapse,
  CardHeader,
  Input,
  Label,
  Pagination,
  PaginationItem,
  PaginationLink,
  Breadcrumb
} from "reactstrap";
const ProductPage = ({ }) => {
  const [layoutColums, setLayoutColums] = useState(3);
  const LayoutViewClicked = (colums) => {
    setLayoutColums(colums);
  };
  const openFilter = () => {
    document.querySelector(".collection-filter").style = "left: -15px";
  };
  return (
    <div>
      {/* <Breadcrumb title={"Collection"} /> */}
      <div className="section-b-space">
        <div className="collection-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-sm-3 collection-filter" style={{borderRadius:"10px"}}>
                <StickyBox offsetTop={20} offsetBottom={20}>
                  <div>
                    <Filter />
                  </div>
                </StickyBox>
              </div>
              <div className="collection-content col">
                <div className="page-main-content ">
                  <div className="">
                    <div className="row">
                      <div className="col-sm-12">
                        <div className="top-banner-wrapper">
                          <a href="abc">
                            <img style={{borderRadius:"10px", margin:'1vh auto'}}
                              src="https://ucarecdn.com/fe1392eb-eeab-40d5-b93b-a2a4ae246f68/campaign_61600w.jpg"
                              className="img-fluid"
                              alt=""
                            />
                          </a>
                        </div>
                        <div className="collection-product-wrapper">
                          <div className="product-top-filter">
                            <div className="container-fluid p-0">
                              <div className="d-flex justify-content-end">
                            
                              <div className="filter-main-btn">
                                <BrowserView>
                                    <span
                                      onClick={openFilter}
                                      className="filter-btn btn btn-solid"
                                    >
                                      <i
                                        className="fa fa-filter"
                                      ></i>{" "}
                                      Filter
                                    </span>
                                  </BrowserView>
                                  </div>
                                  {/* <FilterBar
                                    onLayoutViewClicked={(colmuns) =>
                                      LayoutViewClicked(colmuns)
                                    }
                                  /> */}
                              </div>
                            </div>
                          </div>
                          {/* {isLoading ? (
                            <SkeletonLoading colSize={layoutColums} />
                          ) : (
                            <ProductListing colSize={layoutColums} />
                          )} */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// const mapStateToProps = createStructuredSelector({
//   isLoading: selectIsDataFetching,
// });

export default connect(null, null)(ProductPage);
