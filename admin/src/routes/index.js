import React from "react";
import { Redirect } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";
import Register from "../pages/Authentication/Register";
import Dashboard from "../pages/Dashboard/index";
import Products from "../pages/Ecommerce/Products";
import ProductDetail from "../pages/Ecommerce/ProductDetail";
import Orders from "../pages/Ecommerce/Orders";
import Feedback from "../pages/Ecommerce/Feedback";
import AddProduct from "../pages/Ecommerce/AddProduct";
import EditProduct from "../pages/Ecommerce/EditProduct";
import Error404 from "../pages/Utility/Error404";
import MarketingPage from "../pages/Forms/FormEditors";
import FormValidations from "../pages/Forms/FormValidations";
import UiSweetAlert from "../pages/Ui/UiSweetAlert";
import UiRangeSlider from "../pages/Ui/UiRangeSlider";
import UIRoundSlider from "../pages/Ui/UIRoundSlider";
import DatatableTables from "../pages/Tables/DatatableTables";
import ResponsiveTables from "../pages/Tables/ResponsiveTables";
import EditableTables from "../pages/Tables/EditableTables";

const authProtectedRoutes = [
  { path: "/tables-datatable", component: DatatableTables },
  { path: "/tables-responsive", component: ResponsiveTables },
  { path: "/tables-editable", component: EditableTables },
  { path: "/ui-sweet-alert", component: UiSweetAlert },
  { path: "/marketing", component: MarketingPage },
  { path: "/form-validation", component: FormValidations },
  { path: "/products", component: Products },
  { path: "/product-detail/:id", component: ProductDetail },
  { path: "/product-edit/:id", component: EditProduct },
  { path: "/orders", component: Orders },
  { path: "/feedback", component: Feedback },
  { path: "/add-product", component: AddProduct },
  { path: "/dashboard", component: Dashboard },
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
];
const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

export { authProtectedRoutes, publicRoutes };
