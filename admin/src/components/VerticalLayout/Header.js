import React, { Component } from "react";

import { connect } from "react-redux";
import {
  Button
} from "reactstrap";

import { Link } from "react-router-dom";
import LanguageDropdown from "../CommonForBoth/TopbarDropdown/LanguageDropdown";
import ProfileMenu from "../CommonForBoth/TopbarDropdown/ProfileMenu";
import { withTranslation } from "react-i18next";
import { toggleRightSidebar } from "../../store/actions";
import logosmlight from "../../assets/SVG/crown.svg";
import logolight from "../../assets/SVG/crown.svg";
class Header extends Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
  }
  toggleMenu() {
    this.props.toggleMenuCallback();
  }
  toggleFullscreen() {
    if (
      !document.fullscreenElement &&!document.mozFullScreenElement &&!document.webkitFullscreenElement
    ) {
      // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT
        );
      }
    } else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      }
    }
  }

  render() {
    return (
      <React.Fragment>
            <header id="page-topbar">
                <div className="navbar-header">
                    <div className="d-flex">

                        <div className="navbar-brand-box">
                            <Link to="#" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src={logosmlight} alt="" height="36"/>
                                </span>
                                <span className="logo-lg">
                                    <img src={logolight} alt="" height="36"/>
                                </span>
                            </Link>
                        </div>

                        <Button size="sm" color="none" type="button" onClick={this.toggleMenu} className="px-3 font-size-24 header-item waves-effect" id="vertical-menu-btn">
                            <i className="ri-menu-2-line align-middle"></i>
                        </Button>
                    </div>
                      <div className="d-flex">
                        <LanguageDropdown/>
                        <div className="dropdown d-none d-lg-inline-block ml-1">
                            <Button color="none" type="button" className="header-item noti-icon waves-effect" onClick={this.toggleFullscreen}>
                                <i className="ri-fullscreen-line"></i>
                            </Button>
                        </div>
                        <ProfileMenu/>
                    </div>
                </div>
            </header>
      </React.Fragment>
    );
  }
}

const mapStatetoProps = state => {
  const { layoutType } = state.Layout;
  return { layoutType };
};

export default connect(mapStatetoProps, { toggleRightSidebar })(withTranslation()(Header));
