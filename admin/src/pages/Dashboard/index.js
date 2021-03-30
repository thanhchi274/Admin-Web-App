import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";
//Import Components
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
} from "../../store/analysis/analysis.selectors";
import Spinner from "../../components/spinner/spinner.component";
const Dashboard = ({ fetchDataStart, analysisData, totalProduct,averageValue,Monthly }) => {
  const [breadcrumbsData, setBreadcrumbsData] = useState([
    { title: "Thanh Chi Clothing", link: "/dashboard" },
    { title: "Dashboard", link: "/dashboard" },
  ]);
  const [SampleMinWidgetData, setSampleMinWidgetData] = useState([]);
  const [currentMonth, setCurrentMonth] = useState("January");
  useEffect(() => {
    fetchDataStart();
  }, [fetchDataStart]);
  return analysisData ? (
    <>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Dashboard" breadcrumbItems={breadcrumbsData} />
          <Row>
              {console.log(Monthly)}
            <Col xl={8}>
              <Row>
                <MiniWidgets
                  reports={[
                    {
                      icon: "ri-stack-line",
                      title: "Number of Sales",
                      value: `${Monthly.length}`,
                      rate: "2.4%",
                      desc: "From previous period",
                    },
                    {
                      icon: "ri-store-2-line",
                      title: "Sales Revenue",
                      value: "$ 38452",
                      rate: "2.4%",
                      desc: "From previous period",
                    },
                    {
                      icon: "ri-briefcase-4-line",
                      title: "Average Price",
                      value: "$ 15.4",
                      rate: "2.4%",
                      desc: "From previous period",
                    },
                    {
                      icon: "ri-briefcase-4-line",
                      title: `Total Product`,
                      value: `$ ${totalProduct}`,
                      rate: "2.4%",
                      desc: "From previous period",
                    },
                    {
                      icon: "ri-briefcase-4-line",
                      title: "Average Price each bill",
                      value: `$ ${Math.round(averageValue,1)}`,
                      rate: "2.4%",
                      desc: "From previous period",
                    },
                    {
                      icon: "ri-briefcase-4-line",
                      title: "Average Price",
                      value: "$ 15.4",
                      rate: "2.4%",
                      desc: "From previous period",
                    },
                  ]}
                />
              </Row>
              {/* revenue Analytics */}
              <RevenueAnalytics />
            </Col>

            <Col xl={4}>
              {/* sales Analytics */}
              <SalesAnalytics />
              {/* earning reports */}
              <EarningReports />
              <EarningReports />
            </Col>
          </Row>
          <Row>
            {/* recent activity */}
            {/* <RecentlyActivity /> */}
            {/* revenue by locations */}
            <RevenueByLocations />
            <LatestTransactions />
          </Row>
        </Container>
      </div>
    </>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = createStructuredSelector({
  analysisData: selectData,
  totalProduct: selectTotalProductQuantity,
  averageValue:selectTotalProductAverage,
  Monthly:selectFilterTransactionMonthly
});
const mapDispatchToProps = (dispatch) => ({
  fetchDataStart: () => dispatch(fetchDataStart()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
