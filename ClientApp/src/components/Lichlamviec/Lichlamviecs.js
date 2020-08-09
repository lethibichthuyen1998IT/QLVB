﻿import React, { Component, useState } from 'react';
import moment from 'moment';
import { RouteComponentProps } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';
import Select from '@material-ui/core/Select';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import MultiSelect from "react-multi-select-component";
import ReactDOM from 'react-dom';
import { MultiSelect } from '@progress/kendo-react-dropdowns';
//import { Multiselect } from 'react-widgets';
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
    Toast,
    Form
} from "reactstrap";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
library.add(faTimes);



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
        newtp: {
            idnv: 0,
            idlich: ''
        },
        modalAdd: false,
        value: [],
        newModal: false,
        editModal: false,
        showAlert: false,
        valueSearch: '',
        detailModal: false,

        isOpen: false,

        
    }

    componentWillMount() {
      
        axios.get('/nhanviens')
            .then((res) =>
                this.setState({
                    nhanvien: res.data
                }));
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

    toggleNewthanhphanModal() {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
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


    addthanhphan() {

        axios.post('https://localhost:44331/api/Thanhphanthamdus', this.state.newtp).then((response) => {
            console.log(response.data);
           
            this.setState({
                
                newModal: false,
              
                
            });
            alert("Lưu thành công!");
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

    handleOpen = (idnv) => {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            newtp:idnv
        }));
    }

    handleSelect = (newtp) => {
        if (!this.state.isOpen) {
            document.addEventListener('click', this.handleOutsideClick, false);
        } else {
            document.removeEventListener('click', this.handleOutsideClick, false);
        }

        this.setState(prevState => ({
            isOpen: !prevState.isOpen,
            newtp: newtp
        }));
    };

    handleOutsideClick = () => {
        this.handleSelect();
    };

    //handleChange(event) {
    //    this.setState({
    //        value: event.option
    //    });
    //}
    //handleChange = (event) => {
    //    this.setState({
    //        value: event.target.value
    //    });
    //}
    //handleChange = (event) => {
    //    var options = event.target.options;
    //        var value = [];
    //        for (var i = 0, l = options.length; i < l; i++) {
    //            if (options[i].selected) {
    //                value.push(options[i].value);
    //            }
    //        }
    //        this.setState({ value: value });
    //}

    //handleChange(event) {
    //    //this.setState({value: event.option});
    //    this.setState({ value: Array.from(event.target.selectedOptions, (item) => item.value) });
    //}

    handleChangeMultiple = (event) => {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        this.setState({ value: value });
    };
    //handleChange (e) {
    //    var options = e.target.options;
    //    var value = [];
    //    for (var i = 0, l = options.length; i < l; i++) {
    //        if (options[i].selected) {
    //            value.push(options[i].value);
    //        }
    //    }
    //    this.setState({ value: value });
    //}

    handleSubmit() {
        alert("you have choose :" + this.state.value);

    }

    render() {
        //const [selected, setSelected] = useState([]);
        //let { nhanvien } = this.nhanvien.data;
        // const { nhanvien } = this.state.nhanvien.map((vt) => ({ nhanvien: vt.idnv }))handle;
        const nhanvien = [];
       // const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
       // const { idnv, hoten } = this.state.newtp; 
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
                            <ModalHeader toggle={this.toggleDetailModal.bind(this)}> <i className="fas fa-info-circle"></i> Thông tin chi tiết</ModalHeader>
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
                            <ModalHeader toggle={this.toggleEditModal.bind(this)}>Chỉnh sửa lịch làm việc</ModalHeader>
                            <ModalBody>
                                <div>
                                    <div className="example-config">
                                        Selected Values: {JSON.stringify(this.state.value)}
                                    </div>

                                    <Select
                                        multiple
                                        native
                                        value={this.state.value}
                                        onChange={this.handleChangeMultiple}
                                        inputProps={{
                                            id: 'select-multiple-native',
                                        }}
                                    >
                                        {this.state.nhanvien.map((name) => (
                                            <option key={name.idnv} value={name.idnv}>
                                                {name.hoten}
                                            </option>
                                        ))}
                                    </Select>

                                </div>
                                <Form>
                                    <Row>
                                        <Col md="12">
                                            <FormGroup>
                                                <Label for="ngaybd">Ngày bắt đầu</Label>

                                                <Input id="ngaybd" type="datetime-local" value={this.state.editData.ngaybd} onChange={(e) => {
                                                    let { editData } = this.state;
                                                    editData.ngaybd = e.target.value;
                                                    this.setState({ editData });
                                                }} />
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Row>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <Label for="giobd">Giờ bắt đầu</Label>
                                                <Input id="giobd" type="time" value={this.state.editData.giobd} onChange={(e) => {
                                                    let { editData } = this.state;
                                                    editData.giobd = e.target.value;
                                                    this.setState({ editData });
                                                }} />
                                            </FormGroup>
                                        </Col>
                                        <Col className="pr-1" md="6">
                                            <FormGroup>
                                                <Label for="giokt">Giờ kết thúc</Label>
                                                <Input id="giokt" type="time" value={this.state.editData.giokt} onChange={(e) => {
                                                    let { editData } = this.state;
                                                    editData.giokt = e.target.value;
                                                    this.setState({ editData });
                                                }} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="12">
                                        <FormGroup>
                                            <Label for="noidungcv"> Nội dung công việc</Label>
                                            <Input id="noidungcv" type="textarea" value={this.state.editData.noidungcv} onChange={(e) => {
                                                let { editData } = this.state;
                                                editData.noidungcv = e.target.value;
                                                this.setState({ editData });
                                            }} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                   
                                    <Row>
                                        <Col md="12">
                                        <FormGroup>
                                            <Label for="diadiem">Địa điểm</Label>

                                            <Input id="diadiem" value={this.state.editData.diadiem} onChange={(e) => {
                                                let { editData } = this.state;
                                                editData.diadiem = e.target.value;
                                                this.setState({ editData });
                                            }} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                   
                                  
                                       
                                   
                                        
                                   
                                    <Row>
                                        <Col md="12">
                                        <FormGroup>
                                            <Label for="thanhphankhac">Thành phần khác: </Label>
                                            <Input id="thanhphankhac" value={this.state.editData.thanhphankhac} onChange={(e) => {
                                                let { editData } = this.state;
                                                editData.thanhphankhac = e.target.value;
                                                this.setState({ editData });
                                            }} />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                </Form>
                               
                               
                            </ModalBody>
                            <ModalFooter>
                                  
                                <Button color="primary" onClick={this.update.bind(this) }>Cập nhật</Button>
                                <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy</Button>
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
                                            <th>Thời gian</th>
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
