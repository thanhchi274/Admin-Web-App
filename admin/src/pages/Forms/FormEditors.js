import React, { useState, useEffect } from "react";
import { Form, Card,Button, CardBody, Col, Row, CardTitle, CardSubtitle,Container } from "reactstrap";

// Form Editor
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { EditorState } from 'draft-js';
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { connect } from 'react-redux'
import {sendMailMarketingStart} from '../../store/analysis/analysis.actions'
import axios from 'axios'
const EmailMarketing =({sendMailMarketingStart}) => {
const [breadCrumbItems, setBreadCrumbItems] = useState([
  { title : "Email Marketing", link : "#" },
  { title : "Editors", link : "#" },
])
const [editorState, setEditorState] = useState(
  () => EditorState.createEmpty(),
);
const  [convertedContent, setConvertedContent] = useState(null);
const handleSubmit = (event) => {
  sendMailMarketingStart(convertedContent)
};
const handleEditorChange = (state) => {
  setEditorState(state);
  convertContentToHTML();
}
const convertContentToHTML = () => {
  let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
  setConvertedContent(currentContentAsHTML);
}
const createMarkup = (html) => {
  return  {
    __html: DOMPurify.sanitize(html)
  }
}
const uploadImageCallBack=(file)=> {
  return new Promise(
    (resolve, reject) => {
      axios.post('https://api.imgur.com/3/image',file,{Authorization:'Client-ID d374b3733092746'}).then((res)=>console.log(res)).catch((err)=>console.log(err))
      
    }
  );
}
    return (
      <React.Fragment>
        <div className="page-content" style={{ paddingBottom: "2vh"}}>
          <Container fluid={true}>
          <Breadcrumbs title="Email Editors" breadcrumbItems={breadCrumbItems} />
          <div className="preview" dangerouslySetInnerHTML={createMarkup(convertedContent)}></div>
            <Row>
              <Col>
                <Card>
                  <CardBody>
                    <Form method="post">
                      <Editor
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        onEditorStateChange={handleEditorChange}
                        toolbar={{
                          image: {uploadCallback: uploadImageCallBack, uploadEnabled: false, alignmentEnabled:'CENTER'},
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: false },
                          history: { inDropdown: true },
                        }}
                      />
                    </Form>
                    <Row className={'justify-content-end'} style={{ padding: "1vh",paddingBottom: "0vh",margin:"0 auto" }}>
            <Button
              type="button"
              color="primary"
              className="waves-effect waves-light"
              onClick={handleSubmit}
            >
             Submit
            </Button>
          </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>

          </Container>
        </div>
      </React.Fragment>
    );
  }
  const mapDispatchToProps = (dispatch) => ({
    sendMailMarketingStart: (data) => dispatch(sendMailMarketingStart(data)),
  });
export default connect(null,mapDispatchToProps) (EmailMarketing);
