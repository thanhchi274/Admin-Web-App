import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Label,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { MDBDataTable } from "mdbreact";
import "./datatables.scss";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { createStructuredSelector } from "reselect";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  fetchOrderStart,
  changeDisplayOrderList,
  changePaginationValue
} from "../../store/analysis/analysis.actions";
import { makeStyles } from "@material-ui/core/styles";
import Pagination from "@material-ui/lab/Pagination";
import DropDownComponent from '../../components/DropDownComponent/dropDown.component'
import { connect } from "react-redux";
import {
  selectOrderData,
  selectDisplayOrderData,
  selectPaginationValue,selectOrderHistorySize
} from "../../store/analysis/analysis.selectors";
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
    "& .MuiInputBase-root": {
      color: "#fff",
    },
    "& .MuiSelect-icon": {
      color: "#fff",
    },
    "& .MuiInput-underline": {
      color: "#fff",
    },
  },
}));

const Orders = ({
  fetchOrderStart,
  orderData,
  displayOrder,
  changeDisplayOrderList,
  paginationValue,
  changePaginationValue,orderHistorySize
}) => {
  const classes = useStyles();
  const [breadCrumbItems, setBreadCrumbItems] = useState([
    { title: "Ecommerce", link: "#" },
    { title: "Orders", link: "#" },
  ]);
  const [rowsData, setRowsData] = useState()
  const [pagination, setPagination] = useState(1)
  useEffect(() => {
    fetchOrderStart();
  }, [fetchOrderStart]);
  useEffect(() => {
    displayData()
  }, [orderData])
  useEffect(() => {
    setPagination(paginationValue)
    return () => {
      setPagination(1)
    }
  }, [paginationValue])
  const handleChange = (event) => {
    changeDisplayOrderList(event.target.value);
  };
  const handleChangePagination =(event, value)=>{
    setPagination(value)
    changePaginationValue(value)
  }
  const columns = [
    {
      label: "Order ID",
      field: "id",
      sort: "asc",
      width: 78,
    },
    {
      label: "Date",
      field: "date",
      sort: "asc",
      width: 93,
    },
    {
      label: "Billing Name",
      field: "billingName",
      sort: "asc",
      width: 109,
    },
    {
      label: "Total (VND)",
      field: "total",
      sort: "asc",
      width: 48,
    },
    {
      label: "Payment Status",
      field: "status",
      sort: "asc",
      width: 135,
    },
    {
      label: "Invoice",
      field: "invoice",
      sort: "asc",
      width: 110,
    },
    {
      label: "Action",
      field: "action",
      sort: "asc",
      width: 120,
    },
  ];
  const displayData = () => {
    let rows = [];
    console.log(orderData);
    let item = orderData!==null
      ? orderData.map((item, index) =>
          item?rows.push({
            checkbox: (
              <div key={index} className="custom-control custom-checkbox">
                <Input
                  type="checkbox"
                  className="custom-control-input"
                  id={index}
                />
                <Label className="custom-control-label" htmlFor={index}>
                  &nbsp;
                </Label>
              </div>
            ),
            id: (
              <Link to="#" key={index} className="text-dark font-weight-bold">
                   {item.transactions_id}
              </Link>
            ),
            date:  `${item.createAt}`,
            billingName: `${item.userID? item.userID.slice(18):null}`,
            total: `${item.amount}`,
            status: (
              <div className="badge badge-soft-success font-size-12">{item.status}</div>
            ),
            invoice: (
              <Button className="btn-rounded" color="light">
                Print Invoice <i className="mdi mdi-download ml-2"></i>
              </Button>
            ),
            action: (
              <DropDownComponent data={item}/>
            ),
          }):null
        )
      : null;
      setRowsData(rows)
  };
  return orderData!== null&&orderHistorySize!==null?(
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Orders" breadcrumbItems={breadCrumbItems} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody className="pt-0">
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">
                      Display
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      onChange={handleChange}
                      value={displayOrder}
                    >
                      <MenuItem value={10}>10</MenuItem>
                      <MenuItem value={20}>20</MenuItem>
                      <MenuItem value={30}>30</MenuItem>
                    </Select>
                  </FormControl>
                  <MDBDataTable displayEntries={false} paging={false} searching={false} responsive data={{"rows":rowsData,"columns":columns}} className="mt-4" />
                  <div className={classes.root}>
                    <Pagination onChange={handleChangePagination} page={pagination} count={orderHistorySize.length/displayOrder>1?orderHistorySize.length/displayOrder:1} color="secondary" />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  ):(
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
  orderData: selectOrderData,
  displayOrder: selectDisplayOrderData,
  paginationValue:selectPaginationValue,
  orderHistorySize:selectOrderHistorySize
});
const mapDispatchToProps = (dispatch) => ({
  fetchOrderStart: () => dispatch(fetchOrderStart()),
  changeDisplayOrderList: (data) => dispatch(changeDisplayOrderList(data)),
  changePaginationValue: (data) => dispatch(changePaginationValue(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(Orders);
