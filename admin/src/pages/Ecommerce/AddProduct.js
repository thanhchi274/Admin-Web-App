import React, {  useState } from "react";
import {
  Container,
  Card,
  CardBody,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import Select from "react-select";
import { addProductStart } from "../../store/product/product.actions";
import { createStructuredSelector } from "reselect";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));
const AddProduct = ({ addProductStart }) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState([
    { title: "Ecommerce", link: "#" },
    { title: "Add Product", link: "#" },
  ]);
  const classes = useStyles();
  const [checked, setChecked] = useState([]);
  const [size, setCheckedSizes] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [product, setProduct] = useState(null);
  const handleAcceptedFiles = (files) => {
    files.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      })
    );
    setSelectedFiles(files);
  };
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      if (tab >= 1 && tab <= 2) {
        setActiveTab(tab);
      }
    }
  };
  const colors = [
    "red",
    "green",
    "orange",
    "black",
    "white",
    "yellow",
    "blue",
    "gray",
  ];
  const sizes = ["XS", "S", "M", "XL", "XXL"];
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const handleToggleSizes = (value) =>()=>{
      const currentIndexSizes = size.indexOf(value);
      const newCheckedSizes = [...size];
    if (currentIndexSizes === -1) {
        newCheckedSizes.push(value);
    } else {
        newCheckedSizes.splice(currentIndexSizes, 1);
    }
    setCheckedSizes(newCheckedSizes);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    let newProduct = {...product, size,"colors":checked, "createAt":new Date().toLocaleDateString(), "new":true, "sale":product.discount==="0"?false:true}
    addProductStart({ newProduct, files: selectedFiles });
  };
  const handleChange = (event) => {
    const { value, name } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };
  const handleChangeTags = (event) => {
    console.log(size)
    console.log(new Date().toLocaleDateString())
    const { value, name } = event.target;
    setProduct({ ...product, [name]: [value] });
    console.log({ ...product, [name]: [value] })
  };
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Add Product" breadcrumbItems={breadcrumbItems} />
          <Row>
            <Col lg={12}>
              <Card>
                <CardBody>
                  <div
                    id="addproduct-nav-pills-wizard"
                    className="twitter-bs-wizard"
                  >
                    <Nav pills justified className="twitter-bs-wizard-nav">
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            toggleTab(1);
                          }}
                          className={classnames({
                            active: activeTab === 1,
                          })}
                        >
                          <span className="step-number">01</span>
                          <span className="step-title">Product Info</span>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          onClick={() => {
                            toggleTab(2);
                          }}
                          className={classnames({
                            active: activeTab === 2,
                          })}
                        >
                          <span className="step-number">02</span>
                          <span className="step-title">Product Image</span>
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent
                      activeTab={activeTab}
                      className="twitter-bs-wizard-tab-content"
                    >
                      <TabPane tabId={1}>
                        <h4 className="card-title">Product Information</h4>
                        <Form>
                          <FormGroup>
                            <Label htmlFor="productname">Product Name</Label>
                            <Input
                              id="productname"
                              name="productname"
                              type="text"
                              name="name"
                              onChange={handleChange}
                              className="form-control"
                            />
                          </FormGroup>
                          <Row>
                            <Col lg={4}>
                              <FormGroup>
                                <Label className="control-label">
                                  Manufacturer Brand
                                </Label>
                                <select
                                  className="form-control select2"
                                  name="tags"
                                  onChange={handleChangeTags}
                                >
                                <option disabled>Please pick up</option>
                                  <option value="Louis Vuiton">Louis Vuiton</option>
                                  <option value="Gucci">Gucci</option>
                                  <option value="Hermes">Hermes</option>
                                  <option value="Nike">Nike</option>
                                  <option value="Adidas">Adidas</option>
                                  <option value="YSL">YSL</option>
                                </select>
                              </FormGroup>
                            </Col>
                            <Col lg={4}>
                              <FormGroup>
                                <Label htmlFor="manufacturerbrand">Price</Label>
                                <Input
                                  id="manufacturerbrand"
                                  name="manufacturerbrand"
                                  type="number"
                                  name="price"
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg={4}>
                              <FormGroup>
                                <Label htmlFor="price">Discount</Label>
                                <Input
                                  id="price"
                                  name="price"
                                  type="number"
                                  name="discount"
                                  max="100"
                                  min="0"
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col lg={4}>
                              <FormGroup>
                                <Label className="control-label">
                                  Stock
                                </Label>
                                <Input
                                  id="stock"
                                  name="stock"
                                  type="number"
                                  name="stock"
                                  max="999"
                                  min="0"
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </FormGroup>
                            </Col>
                            <Col lg={4}>
                              <FormGroup>
                                <Label htmlFor="price">Rating</Label>
                                <Input
                                  id="rating"
                                  name="rating"
                                  type="number"
                                  name="rating"
                                  max="5"
                                  min="0"
                                  onChange={handleChange}
                                  className="form-control"
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col md={6}>
                              <FormGroup>
                                <Label className="control-label">Color</Label>
                                <List className={classes.root}>
                                  {colors.map((value) => {
                                    const labelId = `checkbox-list-label-${value}`;
                                    return (
                                      <ListItem
                                        key={value}
                                        role={undefined}
                                        dense
                                        button
                                        onClick={handleToggle(value)}
                                      >
                                        <ListItemIcon>
                                          <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple={false}
                                            inputProps={{
                                              "aria-labelledby": labelId,
                                            }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          id={labelId}
                                          primary={`${value}`}
                                        />
                                      </ListItem>
                                    );
                                  })}
                                </List>
                              </FormGroup>
                            </Col>
                            <Col md={6}>
                              <FormGroup>
                                <Label className="control-label">Sizes</Label>
                                <List className={classes.root}>
                                  {sizes.map((value, index) => {
                                    const labelId = `checkbox-list-label-${value}`;
                                    return (
                                      <ListItem
                                        key={index}
                                        dense
                                        button
                                        onClick={handleToggleSizes(value)}
                                      >
                                        <ListItemIcon>
                                          <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple={false}
                                            inputProps={{
                                              "aria-labelledby": labelId,
                                            }}
                                          />
                                        </ListItemIcon>
                                        <ListItemText
                                          id={labelId}
                                          primary={`${value}`}
                                        />
                                      </ListItem>
                                    );
                                  })}
                                </List>
                              </FormGroup>
                            </Col>
                          </Row>
                          <FormGroup>
                            <Label htmlFor="productdesc">
                              Product Short Details
                            </Label>
                            <textarea
                              className="form-control"
                              id="productdesc"
                              rows="5"
                              name="shortDetails"
                              onChange={handleChange}
                            ></textarea>
                          </FormGroup>
                          <FormGroup>
                            <Label htmlFor="productdesc">
                              Product Description
                            </Label>
                            <textarea
                              className="form-control"
                              id="productdesc"
                              rows="5"
                              name="description"
                              onChange={handleChange}
                            ></textarea>
                          </FormGroup>
                        </Form>
                      </TabPane>
                      <TabPane tabId={2}>
                        <h4 className="card-title">Upload product image</h4>
                        <Form>
                          <Dropzone
                            maxFiles={4}
                            accept="image/jpeg, image/png"
                            onDrop={(acceptedFiles) =>
                              handleAcceptedFiles(acceptedFiles)
                            }
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div className="dropzone">
                                <div
                                  className="dz-message needsclick mt-2"
                                  {...getRootProps()}
                                >
                                  <input {...getInputProps()} />
                                  <div className="mb-3">
                                    <i className="display-4 text-muted ri-upload-cloud-2-line"></i>
                                  </div>
                                  <h4>Drop files here or click to upload.</h4>
                                </div>
                              </div>
                            )}
                          </Dropzone>
                          <div
                            className="dropzone-previews mt-3"
                            id="file-previews"
                          >
                            {selectedFiles.map((f, i) => {
                              return (
                                <Card
                                  className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                  key={i + "-file"}
                                >
                                  <div className="p-2">
                                    <Row className="align-items-center">
                                      <Col className="col-auto">
                                        <img
                                          data-dz-thumbnail=""
                                          height="80"
                                          className="avatar-sm rounded bg-light"
                                          alt={f.name}
                                          src={f.preview}
                                        />
                                      </Col>
                                      <Col>
                                        <Link
                                          to="#"
                                          className="text-muted font-weight-bold"
                                        >
                                          {f.name}
                                        </Link>
                                        <p className="mb-0">
                                          <strong>{f.formattedSize}</strong>
                                        </p>
                                      </Col>
                                    </Row>
                                  </div>
                                </Card>
                              );
                            })}
                          </div>
                        </Form>
                      </TabPane>
                    </TabContent>
                    <ul className="pager wizard twitter-bs-wizard-pager-link">
                      <li
                        className={
                          activeTab === 1 ? "previous disabled" : "previous"
                        }
                      >
                        <Link
                          to="#"
                          onClick={() => {
                            toggleTab(activeTab - 1);
                          }}
                        >
                          Previous
                        </Link>
                      </li>
                      <li
                        className={activeTab === 2 ? "next disabled" : "next"}
                      >
                        <Button
                          color="success"
                          type="submit"
                          onClick={(event) =>
                            activeTab !== 2
                              ? toggleTab(activeTab + 1)
                              : handleSubmit(event)
                          }
                        >
                          {activeTab === 2 ? "Finish" : "Next"}
                        </Button>
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
const mapDispatchToProps = (dispatch) => ({
    addProductStart: (data) => dispatch(addProductStart(data)),
});
export default connect(null, mapDispatchToProps)(AddProduct);
