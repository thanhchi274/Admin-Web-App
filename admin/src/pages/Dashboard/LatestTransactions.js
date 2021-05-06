import React, { useEffect, useState } from "react";
import { Col, Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import BootstrapTable from "react-bootstrap-table-next";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";

const LatestTransactions = ({ data }) => {
  const [history, setHistory] = useState();
  const [rows, setRows] = useState()
  useEffect(() => {
    setHistory(data);
    displayData(data)
  },[data]);
  const columns = {
    columns: [
      {
        dataField: "id",
        text: "No.",
      },
      {
        dataField: "orderId",
        text: "Order ID",
      },
      {
        dataField: "date",
        text: "Date",
      },
      {
        dataField: "billingName",
        text: "Billing Name",
      },
      {
        dataField: "total",
        text: "Total",
      },
      {
        dataField: "status",
        text: "Payment Status",
      },
    ],
  };
  const displayData = (history)=>{
    let data = []
    let item = history?history.map((item,index)=>data.push({
      id: index,
      orderId: (
        <Link to="#" className="text-dark font-weight-bold">
          {item._id.slice(18)}
        </Link>
      ),
      date:  `${item.createAt}`,
      billingName: `${item.userID.slice(18)}`,
      total: `$${item.amount}`,
      status: (
        <div className="badge badge-soft-success font-size-12">{item.payment_status}</div>
      ),
    }),
    ):null
    setRows(data)
  }
  return data && rows? (
    <React.Fragment>
      <Col lg={12}>
        <Card>
          <CardBody>
            <h4 className="card-title mb-4">Latest Transactions</h4>
            <BootstrapTable
              keyField="id"
              data={rows}
              columns={columns.columns}
            />
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  ) : null;
};

export default LatestTransactions;
