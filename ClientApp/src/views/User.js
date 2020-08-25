
import React from "react";
import axios from 'axios';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nv: [],
            msg: ''
        }
        this.refresh = this.refresh.bind(this);
    }
    componentDidMount() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            nv: nvs
        });

    }
    refresh() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            nv: nvs
        });
    }
    updateNV() {
        let { idnv, hoten, ngaysinh, sdt, diachi } = this.state.nv;
        console.log(idnv);
        if (sdt.length > 11 || sdt.length < 10) {
            this.setState({
                msg: "Số điện thoại từ 10 đến 11 chữ số",
            });
        }
        else {
            axios.put('/users/' + idnv, {
                idnv, hoten, ngaysinh, sdt, diachi
            }).then((response) => {
                this.setState({            
                    msg: ''
                });
                localStorage.setItem('user', this.state.nv);
                alert("Cập nhật thành công");
            });
            this.refresh();
        }
    }
    render() {
        const { nv, msg } = this.state;
        
    return (
        <>
            
        <div className="content">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                                <img
                                    alt="..."
                                    src={require("assets/img/banner_gioithieu.jpg")}
                                />
                            </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                                            src={require("assets/img/default-avatar.png")}
                      />
                                        <h5 className="title">{ nv.hoten}</h5>
                    </a>
                   
                  </div>
                 
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="button-container">
                    <Row>
                      <Col className="ml-auto" lg="3" md="6" xs="6">
                        <h5>
                          12 <br />
                          <small>Files</small>
                        </h5>
                      </Col>
                      <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                        <h5>
                          2GB <br />
                          <small>Used</small>
                        </h5>
                      </Col>
                      <Col className="mr-auto" lg="3">
                        <h5>
                          24,6$ <br />
                          <small>Spent</small>
                        </h5>
                      </Col>
                    </Row>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Team Members</CardTitle>
                </CardHeader>
                <CardBody>
                  <ul className="list-unstyled team-members">
                    <li>
                      <Row>
                        <Col md="2" xs="2">
                          <div className="avatar">
                            <img
                              alt="..."
                              className="img-circle img-no-padding img-responsive"
                              src={require("assets/img/faces/ayo-ogunseinde-2.jpg")}
                            />
                          </div>
                        </Col>
                        <Col md="7" xs="7">
                          DJ Khaled <br />
                          <span className="text-muted">
                            <small>Offline</small>
                          </span>
                        </Col>
                        <Col className="text-right" md="3" xs="3">
                          <Button
                            className="btn-round btn-icon"
                            color="success"
                            outline
                            size="sm"
                          >
                            <i className="fa fa-envelope" />
                          </Button>
                        </Col>
                      </Row>
                    </li>
                  
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-user">
                <CardHeader>
                  <CardTitle tag="h5">Cập nhật thông tin cá nhân</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>Công ty</label>
                          <Input
                            defaultValue="VNPT Cần Thơ"
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Họ và tên</label>
                                                <Input                           
                                                         placeholder="Nhập họ và tên"
                                                         type="text"
                                                         value={nv.hoten} onChange={(e) => {
                                                        let { nv } = this.state;
                                                        nv.hoten = e.target.value;
                                                        this.setState({ nv });
                                                    }} />
                                                </FormGroup>
                                             </Col>
                    
                                     </Row>
                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <label>
                                                    Số điện thoại
                                                </label>
                                                <Input                                                
                                                    value={nv.sdt}
                                                    onChange={(e) => {
                                                    let { nv } = this.state;
                                                    nv.sdt = e.target.value;
                                                    this.setState({ nv });
                                                    }} placeholder="Nhập số điện thoại" />
                                                {
                                                    (msg) ?
                                                        <p className="text-danger">{msg}</p>
                                                        : null
                                                }
                                            </FormGroup>
                                           
                                        </Col>
                                        <Col className="pl-1" md="6">
                                            <FormGroup>
                                                <label>Ngày sinh</label>
                                                <Input
                                                    type="datetime-local" value={nv.ngaysinh} onChange={(e) => {
                                                        let { nv } = this.state;
                                                        nv.ngaysinh = e.target.value;
                                                        this.setState({ nv });
                                                    }} 
                                                />
                                            </FormGroup>
                                        </Col>
                                      

                                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Địa chỉ</label>
                                                <Input
                                                    
                                                    value={nv.diachi} onChange={(e) => {
                                                        let { nv } = this.state;
                                                        nv.diachi = e.target.value;
                                                        this.setState({ nv });
                                                    }}
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                 
                  
                    <Row>
                      <div className="update ml-auto mr-auto">
                        <Button
                          className="btn-round"
                                                color="primary"
                                                onClick={this.updateNV.bind(this)}>
                          Cập nhật thông tin
                        </Button>
                      </div>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
