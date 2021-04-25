import React, { Component } from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

//i18n
import i18n from "../../../i18n";
import { withTranslation } from "react-i18next";

// flags
import { ReactComponent as US_Flag } from "../../../assets/SVG/united-states.svg";
import { ReactComponent as VN_Flag } from "../../../assets/SVG/vietnam.svg";
import { ReactComponent as NIPPON_Flag } from "../../../assets/SVG/japan.svg";
class LanguageDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      lng: "en",
    };
    this.toggle = this.toggle.bind(this);
    this.changeLanguageAction.bind(this);
  }
  toggle() {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }
  changeLanguageAction = (lng) => {
    i18n.changeLanguage(lng);
    if (lng === "nippon") this.setState({ lng: "nippon" });
    else if (lng === "vn") this.setState({ lng: "vn" });
    else if (lng === "en") this.setState({ lng: "en" });
  };
  render() {
    {console.log(this.state.lng)}
    return (
      <React.Fragment>
        <Dropdown
          isOpen={this.state.menu}
          toggle={this.toggle}
          className="d-none d-sm-inline-block"
        >
          <DropdownToggle tag="button" className="btn header-item waves-effect">
            {
              this.state.lng === "nippon" ? 
                <NIPPON_Flag className="mr-3" height="24" />
              :
                (this.state.lng === "vn" ?<VN_Flag className="mr-3" height="24" /> : <US_Flag className="mr-3" height="24" />)
              
            }
          </DropdownToggle>

          <DropdownMenu right>
            <DropdownItem
              active={this.state.lng === "eng" ? true : false}
              onClick={() => this.changeLanguageAction("en")}
              className="notify-item"
            >
              <US_Flag className="mr-3" height="24" />
              <span className="align-middle">English</span>
            </DropdownItem>

            <DropdownItem
              active={this.state.lng === "nippon" ? true : false}
              onClick={() => this.changeLanguageAction("nippon")}
              className="notify-item"
            >
              <NIPPON_Flag className="mr-3" height="24" />
              <span className="align-middle">日本語</span>
            </DropdownItem>

            <DropdownItem
              active={this.state.lng === "vn" ? true : false}
              onClick={() => this.changeLanguageAction("vn")}
              className=" notify-item"
            >
              <VN_Flag className="mr-3" height="24" />
              <span className="align-middle">VietNam</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
  }
}

export default withTranslation()(LanguageDropdown);
