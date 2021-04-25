import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "./RevenueAnalytics";
import SalesAnalytics from "./SalesAnalytics";
import EarningReports from "./EarningReports";
import RevenueByLocations from "./RevenueByLocations";
import LatestTransactions from "./LatestTransactions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchDataStart } from "../../store/analysis/analysis.actions";
import {
  selectData,
  selectTotalProductQuantity,
  selectFilterTransactionMonthly,
  selectTotalMoneyAndSales,
  selectTotalProductAverage,
  selectFilterTransactionPreviousMonth,
  selectTotalSalesPreviousMonth,
  selectTotalSalesThisMonth
} from "../../store/analysis/analysis.selectors";
import Spinner from "../../components/spinner/spinner.component";
const Dashboard = ({ fetchDataStart, analysisData, totalProduct,averageValue,Monthly ,PreviousMonthly, totalSalesPreviousMonth,
  totalSalesThisMonth}) => {
  const [breadcrumbsData, setBreadcrumbsData] = useState([
    { title: "Thanh Chi Clothing", link: "/dashboard" },
    { title: "Dashboard", link: "/dashboard" },
  ]);
  useEffect(() => {
    fetchDataStart();
  }, [fetchDataStart]);
  return analysisData&&PreviousMonthly&&Monthly ? (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbsData} />
          {console.log(((totalSalesThisMonth-totalSalesPreviousMonth)/totalSalesPreviousMonth*100))}
          <Row>
            <Col xl={8}>
              <Row>
                <MiniWidgets
                  reports={[
                    {
                      icon: "ri-stack-line",
                      title: "Number of Sales",
                      value: `${Monthly.length}`,
                      rate: `${((Monthly.length-PreviousMonthly.length)/PreviousMonthly.length*100)}`+'%',
                      desc: "From previous period",
                    },
                    {
                      icon: "ri-store-2-line",
                      title: "Sales Revenue",
                      value: `${totalSalesThisMonth}`,
                      rate: `${((totalSalesThisMonth-totalSalesPreviousMonth)/totalSalesPreviousMonth*100)}`+'%',
                      desc: "From previous period",
                    },
                    {
                      icon: "ri-briefcase-4-line",
                      title: "Average Price each Bill",
                      value: `$ ${Math.round(averageValue,1)}`,
                      rate: "2.4%",
                      desc: "From previous period",
                    },
                  ]}
                />
              </Row>
              <RevenueAnalytics />
            </Col>

            <Col xl={4}>
              <SalesAnalytics />
              <EarningReports />
            </Col>
          </Row>
          <Row>
            <RevenueByLocations />
            <LatestTransactions />
          </Row>
        </Container>
      </div>
    </>
  ) : (
    <div id="preloader">
    <div id="status">
        <div className="spinner">
            <i className="ri-loader-line spin-icon"></i>
        </div>
    </div>
</div>
  );
};

const mapStateToProps = createStructuredSelector({
  analysisData: selectData,
  totalProduct: selectTotalProductQuantity,
  averageValue:selectTotalProductAverage,
  Monthly:selectFilterTransactionMonthly,
  PreviousMonthly:selectFilterTransactionPreviousMonth,
  totalSalesPreviousMonth:selectTotalSalesPreviousMonth,
  totalSalesThisMonth:selectTotalSalesThisMonth
});
const mapDispatchToProps = (dispatch) => ({
  fetchDataStart: () => dispatch(fetchDataStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
