/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav">
              <ul>
                            <li>
                                <a href="#" target="_blank">
                                    Nhóm thực tập sinh
                                </a>
                            </li>
                            <li>
                              <a href="#" target="_blank">
                                    Lê Thị Kim Ngân - B1607004
                               </a>

                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    Lê Thị Bích Thuyền - B1606941
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    Lê Thị Ngọc Cẩn - B1606961
                                </a>
                            </li>
                            <li>
                                <a href="#" target="_blank">
                                    Ro Ny - B1607012
                                </a>
                            </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <div className="copyright">
                &copy; {1900 + new Date().getYear()}{" "}
                <i className="fa fa-heart heart" /> VNPT Cần Thơ
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool,
};

export default Footer;
