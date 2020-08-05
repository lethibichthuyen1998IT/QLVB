import React, { Component } from 'react';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import SweetAlert from 'sweetalert-react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Search from 'components/Search';

// reactstrap components
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Toast
    ,
} from "reactstrap";


export class Lichlamviecs extends React.Component {
    state = {
        lichlamviecs: [],
     
        source: [],
        newData: {
           
            noidungcv: '',
            diadiem: '',
            ngaybd: '',
            giobd: '',
            giokt: '',
            thanhphankhac: ''
        },
        editData: {
            idlich: '',
            noidungcv: '',
            diadiem: '',
            ngaybd: '',
            giobd: '',
            giokt: '',
            thanhphankhac: ''
        },
        detailData: {
            idlich: '',
            noidungcv: '',
            diadiem: '',
            ngaybd: '',
            giobd: '',
            giokt: '',
            thanhphankhac: ''
        },
        newModal: false,
        editModal: false,
        showAlert: false,
        valueSearch: '',
        detailModal: false,
    }

    componentWillMount() {

        this.refesh();
       
    }
    refesh() {
        axios.get('/Lichlamviecs').then((response) => {
            this.setState({
                lichlamviecs: response.data,
                source: response.data,
            })
           
        });
    }

    toggleNewModal() {
        this.setState({
            newModal: !this.state.newModal
        });
    }

    toggleEditModal() {
        this.setState({
            editModal: !this.state.editModal
        });
    }

    toggleDetailModal(){
          this.setState({
              detailModal: !this.state.detailModal
    });
}

    add() {
        axios.post('/Lichlamviecs', {
            NOIDUNGCV: this.state.newData.noidungcv,
            DIADIEM: this.state.newData.diadiem,
            NGAYBD: this.state.newData.ngaybd,
            GIOBD: this.state.newData.giobd,
            GIOKT: this.state.newData.giokt,
            THANHPHANKHAC: this.state.newData.thanhphankhac

        }).then((response) => {
            this.refesh();
            this.setState({
               
                newModal: false,
                newData: {                   
                    noidungcv: '',
                    diadiem: '',
                    ngaybd: '',
                    giobd: '',
                    giokt: '',
                    thanhphankhac: ''
                }
            });
            alert("Thêm thành công!");
        });
    }

    edit(idlich, noidungcv, diadiem, ngaybd, giobd, giokt, thanhphankhac) {
        this.setState({
            editData: { idlich, noidungcv, diadiem, ngaybd, giobd, giokt, thanhphankhac },
            editModal: !this.state.editModal
        });
        console.log(idlich);
    }

    detail(idlich, noidungcv, diadiem, ngaybd, giobd, giokt, thanhphankhac) {
        axios.get('/Lichlamviecs/' + this.state.editData.idlich, {
            noidungcv, diadiem, ngaybd, giobd, giokt, thanhphankhac
        }).then((response) => {
            this.setState({
                lichlamviecs: response.data,
                detailData: { idlich, noidungcv, diadiem, ngaybd, giobd, giokt, thanhphankhac },
                detailModal: !this.state.detailModal
            })

        });
        console.log(idlich);
      
    }


    update() {
        let { idlich,noidungcv, diadiem, ngaybd, giobd, giokt, thanhphankhac } = this.state.editData;
        axios.put('/lichlamviecs/' + this.state.editData.idlich, {
            noidungcv, diadiem, ngaybd, giobd, giokt, thanhphankhac
        }).then((response) => {
            this.refesh();
            this.setState({
                editModal: false,
                editData: {
                    idlich: '',
                    noidungcv: '',
                    diadiem: '',
                    ngaybd: '',
                    giobd: '',
                    giokt: '',
                    thanhphankhac: ''
                },
            })       
            console.log(idlich);
            alert("Cập nhật thành công!");
        
            });

    }

    deleteLich = (idlich) => {
        const apiUrl = '/lichlamviecs/' + idlich.idlich;
        axios.delete(apiUrl, { idlich: idlich.idlich })
                .then((res) => {
                    alert("Xóa thành công!");
                    this.refesh();
                    this.setState({
                        showAlert: false
                    });
                });
        }
       
    handleShowAlert = (id) => {
        this.setState({
        showAlert: true
         });
        return this;

    }

    //search
    handleSearch = (search) => {
        let sourceArray = this.state.source;
        let newArray = [];
        if (search.length <= 0) {
            newArray = sourceArray;
        } else {
            console.log(search);
            for (let item of sourceArray) {
                console.log(item);
                if (item.noidungcv.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.diadiem.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.thanhphankhac.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }
        }
        this.setState({
            lichlamviecs: newArray,
            valueSearch: search
        });
    }

    render() {
        let lichlamviecs = this.state.lichlamviecs.map((emp, index) => {
            return (
                <tr key={emp.idlich}>
                    <td></td>
                    <td>{index + 1} </td>
                    <td>{moment(emp.ngaybd).format('DD-MM-yyyy')}</td>
                    <td>{emp.giobd} - {emp.giokt}</td>
                    <td>{emp.noidungcv}</td>
                    <td>{emp.thanhphankhac}</td>
                    <td>{emp.diadiem}</td>                                    
                    <td>
                        <Button color="warning" size="sm" className="mr-2" onClick={this.detail.bind(this, emp.idlich, emp.noidungcv, emp.diadiem, emp.ngaybd, emp.giobd, emp.giokt, emp.thanhphankhac)} ><i className="fas fa-info-circle"></i></Button>
                        <Modal isOpen={this.state.detailModal} toggle={this.toggleDetailModal.bind(this)}>
                            <ModalHeader toggle={this.toggleDetailModal.bind(this)}> Thông tin chi tiết</ModalHeader>
                            <ModalBody>

                                <FormGroup>
                                    <Label for="noidungcv"> Nội dung công việc:</Label>
                                    <Input id="noidungcv" type="textarea" plaintext readOnly defaultValue={this.state.detailData.noidungcv} />
                                </FormGroup>
                               
                                <FormGroup>
                                    <Label for="diadiem">Địa điểm:</Label>
                                    <Input id="diadiem" type="textarea" plaintext readOnly defaultValue={this.state.detailData.diadiem} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="ngaybd"> Ngày bắt đầu: </Label>
                                    <Input id="ngaybd" type="textarea" plaintext readOnly defaultValue={this.state.detailData.ngaybd} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="giobd"> Giờ bắt đầu</Label>
                                    <Input id="giobd" type="textarea" plaintext readOnly defaultValue={this.state.detailData.giobd} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="giokt"> Giờ kết thúc: </Label>
                                    <Input id="giokt" type="textarea" plaintext readOnly defaultValue={this.state.detailData.giokt} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="thanhphankhac"> Thành phần khác:  </Label>
                                    <Input id="thanhphankhac" type="textarea" plaintext readOnly defaultValue={this.state.detailData.thanhphankhac} />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>

                                <Button color="secondary" onClick={this.toggleDetailModal.bind(this)}>Đóng</Button>
                            </ModalFooter>
                        </Modal>
                        <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, emp.idlich, emp.noidungcv, emp.diadiem, emp.ngaybd, emp.giobd, emp.giokt, emp.thanhphankhac)}><i className="fas fa-edit"></i></Button> 
                         <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                            <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="noidungcv"> Nội dung công viêc:</Label>
                                    <Input id="noidungcv" type="textarea" value={this.state.editData.noidungcv} onChange={(e) => {
                                        let { editData } = this.state;
                                        editData.noidungcv = e.target.value;
                                        this.setState({ editData });
                                    }} />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="diadiem">Địa điểm:</Label>

                                    <Input id="diadiem" value={this.state.editData.diadiem} onChange={(e) => {
                                        let { editData } = this.state;
                                        editData.diadiem = e.target.value;
                                        this.setState({ editData });                                    
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="ngaybd">Ngày bắt đầu</Label>

                                    <Input id="ngaybd" type="datetime-local" value={this.state.editData.ngaybd} onChange={(e) => {
                                        let { editData } = this.state;
                                        editData.ngaybd = e.target.value;
                                        this.setState({ editData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="giobd">Giờ bắt đầu</Label>
                                    <Input id="giobd" type="time" value={this.state.editData.giobd} onChange={(e) => {
                                        let { editData } = this.state;
                                        editData.giobd = e.target.value;
                                        this.setState({ editData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="giokt">Giờ kết thúc</Label>
                                    <Input id="giokt" type="time" value={this.state.editData.giokt} onChange={(e) => {
                                        let { editData } = this.state;
                                        editData.giokt = e.target.value;
                                        this.setState({ editData });
                                    }} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="thanhphankhac">Thành phần khác: </Label>
                                    <Input id="thanhphankhac" value={this.state.editData.thanhphankhac} onChange={(e) => {
                                        let { editData } = this.state;
                                        editData.thanhphankhac = e.target.value;
                                        this.setState({ editData });
                                    }} />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={this.update.bind(this) }>Update</Button>
                                <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Cancel</Button>
                            </ModalFooter>
                        </Modal>

                        <Button color="danger" size="sm" className="mr-2" onClick={() => this.handleShowAlert({ id: emp })} ><i className="fas fa-trash-alt"></i></Button>
                        <SweetAlert
                            show={this.state.showAlert}

                            title="Xóa"
                            html
                            text={"Bạn có muốn xóa " + emp.noidungcv + " không?"}

                            showCancelButton
                            onOutsideClick={() => this.setState({ showAlert: false })}
                            onEscapeKey={() => this.setState({ showAlert: false })}
                            onCancel={() => this.setState({ showAlert: false })}
                            onConfirm={() => this.deleteLich({ idlich: emp.idlich })}

                        />
                    </td>
                </tr>)
        });
        return (
        <>
            <div className="content">              
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>

                                <CardTitle tag="h4">Lịch làm việc</CardTitle>
                                <CardTitle>
                                    <Row md="12">
                                         <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewModal.bind(this)}><i className="fa fa-plus"></i>   Tạo lịch làm việc</Button>
                                          </Col>
                                         <Col md="4">
                                               <Search
                                                   valueSearch={this.state.valueSearch}
                                                   handleSearch={this.handleSearch.bind(this)} />
                                        </Col>
                                    </Row>
                                </CardTitle>
                            <Modal isOpen={this.state.newModal} toggle={this.toggleNewModal.bind(this)}>
                                <ModalHeader toggle={this.toggleNewModal.bind(this)}> Tạo Lịch làm việc mới</ModalHeader>
                                <ModalBody>
                                    <FormGroup>
                                        <Label for="ngaybd">Ngày bắt đầu</Label>

                                        <Input id="ngaybd" type="datetime-local" value={this.state.newData.ngaybd} onChange={(e) => {
                                            let { newData } = this.state;
                                            newData.ngaybd = e.target.value;
                                            this.setState({ newData });
                                        }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="giobd">Giờ bắt đầu</Label>
                                        <Input id="giobd" type="time" value={this.state.newData.giobd} onChange={(e) => {
                                            let { newData } = this.state;
                                            newData.giobd = e.target.value;
                                            this.setState({ newData });
                                        }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="giokt">Giờ kết thúc</Label>
                                        <Input id="giokt" type="time" value={this.state.newData.giokt} onChange={(e) => {
                                            let { newData } = this.state;
                                            newData.giokt = e.target.value;
                                            this.setState({ newData });
                                        }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="noidungcv"> Nội dung công viêc:</Label>
                                        <Input id="noidungcv" type="textarea" value={this.state.newData.noidungcv} onChange={(e) => {
                                            let { newData } = this.state;
                                            newData.noidungcv = e.target.value;
                                            this.setState({ newData });
                                        }} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="diadiem">Địa điểm:</Label>

                                        <Input id="diadiem" value={this.state.newData.diadiem} onChange={(e) => {
                                            let { newData } = this.state;
                                            newData.diadiem = e.target.value;
                                            this.setState({ newData });                                           
                                        }} />
                                    </FormGroup>                                  
                                    <FormGroup>
                                        <Label for="thanhphankhac">Thành phần khác: </Label>

                                        <Input id="thanhphankhac" value={this.state.newData.thanhphankhac} onChange={(e) => {
                                            let { newData } = this.state;
                                            newData.thanhphankhac = e.target.value;
                                            this.setState({ newData });
                                        }} />
                                    </FormGroup>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.add.bind(this)}>Lưu</Button>
                                    <Button color="secondary" onClick={this.toggleNewModal.bind(this)}>Hủy</Button>
                                </ModalFooter>
                            </Modal>
                            </CardHeader>
                        
                            <CardBody>
                                <Table className="table table-hover" responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Ngày bắt đầu</th>
                                            <th>Giờ</th>
                                            <th>Nội dung</th>
                                            <th>Thành phần </th>
                                            <th>Địa điểm</th>  
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {lichlamviecs}
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
        );
    }   
}

export default Lichlamviecs;
