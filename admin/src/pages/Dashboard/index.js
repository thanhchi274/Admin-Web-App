import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import MiniWidgets from "./MiniWidgets";
import RevenueAnalytics from "./RevenueAnalytics";
import SalesAnalytics from "./SalesAnalytics";
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
  selectTotalSalesThisMonth,
  selectLatestTransaction,
  selectLVProduct,
  selectNikeProduct,
  selectAdidasProduct,
  totalProductCurrent,
  selectGucciProduct,
  selectTotalPreviousYear,
  selectTotalCurrentYear,
  selectMonthlyNumberPayment
} from "../../store/analysis/analysis.selectors";
import Spinner from "../../components/spinner/spinner.component";
const Dashboard = ({ fetchDataStart, analysisData,latestTransactions, totalProduct,averageValue,Monthly ,PreviousMonthly, totalSalesPreviousMonth,LVData,NikeData,AdidasData,GucciData,totalProductSizeData,totalPreviousYear,totalCurrentYear,
  totalSalesThisMonth,monthlyNumberPayment}) => {
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
          <Row>
            <Col xl={8}>
              <Row>
                <MiniWidgets
                  reports={[
                    {
                      icon: "ri-stack-line",
                      title: "Number of Sales",
                      value: `${Monthly.length}`,
                    },
                    {
                      icon: "ri-store-2-line",
                      title: "Sales Revenue",
                      value: `${totalSalesThisMonth}`,
                    },
                    {
                      icon: "ri-briefcase-4-line",
                      title: "Average each Bill",
                      value: `$ ${Math.round(averageValue,1)}`,
                    },
                  ]}
                />
              </Row>
              <RevenueAnalytics data={monthlyNumberPayment} thisMonth={totalSalesThisMonth} previousYear={totalPreviousYear} currentYear={totalCurrentYear}/>
            </Col>

            <Col xl={4}>
              <SalesAnalytics data={[LVData,NikeData,AdidasData,GucciData]} total={totalProductSizeData}/>
            </Col>
          </Row>
          <Row>
            <LatestTransactions data={latestTransactions} />
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
  totalSalesThisMonth:selectTotalSalesThisMonth,
  latestTransactions:selectLatestTransaction,
  LVData:selectLVProduct,
  NikeData:selectNikeProduct,
  AdidasData:selectAdidasProduct,
  GucciData:selectGucciProduct,
  totalProductSizeData:totalProductCurrent,
  totalPreviousYear:selectTotalPreviousYear,
  monthlyNumberPayment:selectMonthlyNumberPayment,
  totalCurrentYear:selectTotalCurrentYear
});
const mapDispatchToProps = (dispatch) => ({
  fetchDataStart: () => dispatch(fetchDataStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
