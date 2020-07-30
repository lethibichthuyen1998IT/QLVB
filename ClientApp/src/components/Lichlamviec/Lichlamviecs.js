import React, { Component } from 'react';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import NotificationAlert from "react-notification-alert";
import SweetAlert from 'sweetalert-react';
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
        newData: {
           // idlich: '',
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
        //validateData: {
            
        //    noidungcvErr: '',
        //    diadiemErr: '',
        //    err: true
        //},
        newModal: false,
        editModal: false,
        showAlert: false,
    }

    componentWillMount() {

        this.refesh();
       
    }
    refesh() {
        axios.get('/Lichlamviecs').then((response) => {
            this.setState({
                lichlamviecs: response.data
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

    add() {
        axios.post('/Lichlamviecs', {
            NOIDUNGCV: this.state.newData.noidungcv,
            DIADIEM: this.state.newData.diadiem,
            NGAYBD: this.state.newData.ngaybd,
            GIOBD: this.state.newData.giobd,
            GIOKT: this.state.newData.giokt,
            THANHPHANKHAC: this.state.newData.thanhphankhac

        }).then((response) => {
        
            this.setState({
               
                newModal: false,
                newData: {
                    //idlich: '',
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

    update() {
        let { idlich,noidungcv, diadiem, ngaybd, giobd, giokt, thanhphankhac } = this.state.editData;
        axios.put('/lichlamviecs/' + this.state.editData.idlich, {
            noidungcv, diadiem, ngaybd, giobd, giokt, thanhphankhac
        }).then((response) => {
    
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
            this.refresh();
            console.log(idlich);
            alert("Cập nhật thành công!");
        
            });

    }

    //deleteNhanVien(id) {

    //    axios.delete('/Lichlamviecs/' + id.idlich, id.idlich).then((response) => {
    //        alert("Xóa thành công!");
    //        this.setState({
                       
    //                    showAlert: false
    //                });
    //        this.refesh();
    //        console.log(id);

    //    });
    deleteLich = (idlich) => {

        const apiUrl = '/lichlamviecs/' + idlich.idlich;


        axios.delete(apiUrl, { idlich: idlich.idlich })
                .then((res) => {
                    alert("Xóa thành công!");
                    this._refresh();
                    this.setState({
                        showAlert: false
                    });
                });

        }

        //const { lichlamviecs } = this.state;
        //const apiUrl = '/Lichlamviecs/' + idlich;
        //const options = {
        //    method: 'DELETE',

        //}

        //fetch(apiUrl, options)
        //    .then(res => { res.json(); lichlamviecs.push(res.data); })
        //    .then(
        //        (result) => {
        //            this.setState({
        //                lichlamviecs,
        //                showAlert: false
        //            });
        //            this.refesh();
        //   alert("Cập nhật thành công!");
        //        });

    //}
handleShowAlert = (id) => {

    this.setState({
        showAlert: true
    });
    return this;

}


    render() {
        let lichlamviecs = this.state.lichlamviecs.map((emp, index) => {
            return (
                <tr key={emp.idlich}>
                    <td></td>
                    <td>{index + 1 } </td>
                    <td>{emp.noidungcv}</td>
                    <td>{emp.diadiem}</td>
                    <td>{moment(emp.ngaybd).format('DD-MM-yyyy')}</td>
                    <td>{emp.giobd}</td>
                    <td>{emp.giokt}</td>
                    <td>{emp.thanhphankhac}</td>
                    <td>

                        <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, emp.idlich, emp.noidungcv, emp.diadiem, emp.ngaybd, emp.giobd, emp.giokt, emp.thanhphankhac)}>Edit</Button> 

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

                        <Button color="danger" size="sm" className="mr-2" onClick={() => this.handleShowAlert({ id: emp })} >Delete</Button>
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

            <div className="content">
               
                <Row>

                    <Col md="12">
                        <p>
                            <Button color="primary" className="my-3" onClick={this.toggleNewModal.bind(this)}>Tạo lịch làm việc</Button>
                            <Modal isOpen={this.state.newModal} toggle={this.toggleNewModal.bind(this)}>
                                <ModalHeader toggle={this.toggleNewModal.bind(this)}>Add</ModalHeader>
                                <ModalBody>
                                   
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
                                    <Button color="secondary" onClick={this.toggleNewModal.bind(this)}>Cancel</Button>
                                </ModalFooter>
                            </Modal>
                        </p>
                        <Card>

                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th></th>
                                            <th>STT</th>
                                            <th>Nội dung</th>
                                            <th>Địa điểm</th>
                                            <th>Ngày bắt đầu</th>
                                            <th>Giờ bắt đầu</th>
                                            <th>Giờ kết thúc</th>
                                            <th>Thành phần khác</th>
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
        );

    }
     
}


export default Lichlamviecs;
