﻿import React from 'react';
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
    ModalFooter,
    ModalBody,
    Input, Label, Form, FormGroup
} from "reactstrap";
import moment from "moment";
import axios from 'axios';
import Search from 'components/Search';

import SweetAlert from 'sweetalert-react';

class  DanhMucChucNang extends React.Component {
    static displayName =  DanhMucChucNang.name;

    constructor(props) {

        super(props);
        this.state = {
            chucnang: [],
            source: [],
            showAlert: false,
            newchucnang: {
                Tencn: ''
            },
            editData: {
                idcn: '',
                tencn: ''

            },

            modalAdd: false,
            editModal: false,
            valueSearch: ''

        };

        // This binding is necessary to make "this" work in the callback  


        this._refresh = this._refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deletechucnang = this.deletechucnang.bind(this);

    }


    //list
    componentDidMount() {

        axios.get('/chucnangs')
            .then((res) => this.setState({
                chucnang: res.data,
                source: res.data,
                showAlert: false
            })

            );



    }

    //add
    toggleNewchucnangModal() {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    addchucnang() {

        axios.post('/chucnangs', {
            TENCN: this.state.newchucnang.Tencn
        })
            .then((response) => {
                alert("Thêm thành công!");
                this.setState({
                    newchucnang: {
                       Tencn: ''
                    },

                    modalAdd: false
                });
                this._refresh();
            })
            .catch((error) => {
                console.log(error.response);
                alert(error);
            });

    }

    //refresh
    _refresh() {
        axios.get('/chucnangs')
            .then((res) => this.setState({
                chucnang: res.data,
                showAlert: false
            }));
    }

    deletechucnang = (idcn) => {
        const apiUrl = '/chucnangs/' + idcn.idcn;
        axios.delete(apiUrl, { idcn: idcn.idcn })
            .then((res) => {
                this.setState({
                    showAlert: false
                });
                alert("Xóa thành công");
                this._refresh();

            });

    }
    handleShowAlert = (id) => {

        this.setState({
            showAlert: true
        });


    }

    //edit
    toggleEditModal() {
        this.setState({
            editModal: !this.state.editModal
        });
    }

    edit(idcn, tencn) {
        this.setState({
            editData: { idcn, tencn },
            editModal: !this.state.editModal

        });
        console.log(idcn);
    }

    updatechucnang() {
        let { idcn, tencn } = this.state.editData;
        axios.put('/chucnangs/' + this.state.editData.idcn, {
            idcn, tencn
        }).then((response) => {

            this.setState({
                editModal: false,
                editData: {
                    idcn: '',
                    tencn: ''

                },

            });
            this._refresh();

        });

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
                if (item.idcn.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tencn.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            chucnang: newArray,
            valueSearch: search
        });
    }

    render() {

        const { chucnang } = this.state;
        if (this.state.modalAdd === false) return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4">Chức năng</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewchucnangModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm chức năng'}</Button>
                                            </Col>
                                            <Col md="4">
                                                <Search
                                                    valueSearch={this.state.valueSearch}
                                                    handleSearch={this.handleSearch} />
                                            </Col>


                                        </Row>
                                    </CardTitle>


                                </CardHeader>
                                <CardBody>
                                    <Table className="table table-hover">
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Mã</th>
                                                <th>Chức năng</th>

                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                chucnang.map((cn) => {
                                                    return (

                                                        <tr key={cn.idcn}>
                                                            <td>{cn.idcn}</td>
                                                            <td>{cn.tencn}</td>


                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, cn.idcn, cn.tencn)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>

                                                                            <FormGroup>
                                                                                <Label for="tencn">Chức năng</Label>
                                                                                <Input id="tencn" value={this.state.editData.tencn} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tencn = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updatechucnang.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: cn })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa chức năng " + cn.tencn + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deletechucnang({ idcn: cn.idcn })}

                                                                />
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </Table>
                                </CardBody>
                            </Card>
                        </Col>

                    </Row>
                </div>
            </>
        );
        return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4">Chức năng</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewchucnangModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm chức năng'}</Button>
                                            </Col>
                                            <Col md="4">
                                                <Search
                                                    valueSearch={this.state.valueSearch}
                                                    handleSearch={this.handleSearch} />
                                            </Col>


                                        </Row>
                                        <Row md="12">

                                            <Form className="form-inline">
                                                <Col md="5">
                                                    <FormGroup>
                                                        <Input value={this.state.newchucnang.Tencn} onChange={(e) => {
                                                            let { newchucnang } = this.state;
                                                            newchucnang.Tencn = e.target.value;
                                                            this.setState({ newchucnang });
                                                        }}
                                                            placeholder="Nhập chức năng" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="7">
                                                    <Button color="primary" onClick={this.addchucnang.bind(this)}>Thực hiện lưu</Button>{' '}
                                                    <Button color="danger" onClick={this.toggleNewchucnangModal.bind(this)}>Hủy bỏ</Button>
                                                </Col>
                                            </Form>

                                        </Row>

                                    </CardTitle>


                                </CardHeader>
                                <CardBody>
                                    <Table id="dataTable" className="table table-hover">
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Mã</th>
                                                <th>Chức năng</th>

                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                chucnang.map((cn) => {
                                                    return (

                                                        <tr key={cn.idcn}>
                                                            <td>{cn.idcn}</td>
                                                            <td>{cn.tencn}</td>


                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, cn.idcn, cn.tencn)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>

                                                                            <FormGroup>
                                                                                <Label for="tencn">Chức năng</Label>
                                                                                <Input id="tencn" value={this.state.editData.tencn} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tenchucnang = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updatechucnang.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: cn })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa chức năng " + cn.tencn + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deletechucnang({ idcn: cn.idcn })}

                                                                />
                                                            </td>

                                                        </tr>
                                                    )
                                                })
                                            }

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

export default  DanhMucChucNang;
