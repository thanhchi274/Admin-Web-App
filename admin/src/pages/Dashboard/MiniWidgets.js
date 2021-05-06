import React, { useEffect, useState } from "react";
import { Col, Card, CardBody, Media } from "reactstrap";

const AnalysisMiniWidgets =({reports})=> {
    return (
      <>
        {reports.map((report, key) => (
          <Col key={key} md={4}>
            <Card>
              <CardBody>
                <Media>
                  <Media body className="overflow-hidden">
                    <p className="text-truncate font-size-14 mb-2">
                      {report.title}
                    </p>
                    <h4 className="mb-0">{report.value}</h4>
                  </Media>
                  <div className="text-primary">
                    <i className={report.icon + " font-size-24"}></i>
                  </div>
                </Media>
              </CardBody>
             
            </Card>
          </Col>
        ))}
      </>
    );
}

export default AnalysisMiniWidgets;
