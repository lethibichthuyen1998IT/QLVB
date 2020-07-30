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

class DanhMucNoiPhatHanh extends React.Component {
    static displayName = DanhMucNoiPhatHanh.name;

    constructor(props) {

        super(props);
        this.state = {
            nph: [],
            source: [],
            showAlert: false,
            newnph: {
                Tenph: ''
            },
            editData: {
                idph: '',
                tenph: ''

            },

            modalAdd: false,
            editModal: false,
            valueSearch: ''

        };

        // This binding is necessary to make "this" work in the callback  


        this._refresh = this._refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deletenph = this.deletenph.bind(this);

    }


    //list
    componentDidMount() {

        axios.get('/noiphathanhs')
            .then((res) => this.setState({
                nph: res.data,
                source: res.data,
                showAlert: false
            })

            );



    }

    //add
    toggleNewnphModal() {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    addnph() {

        axios.post('/noiphathanhs', {
            TENPH: this.state.newnph.Tenph
        })
            .then((response) => {
                alert("Thêm thành công!");
                this.setState({
                    newnph: {
                        Tenph: ''
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
        axios.get('/noiphathanhs')
            .then((res) => this.setState({
                nph: res.data,
                showAlert: false
            }));
    }

    deletenph = (idph) => {
        const apiUrl = '/noiphathanhs/' + idph.idph;
        axios.delete(apiUrl, { idph: idph.idph })
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

    edit(idph, tenph) {
        this.setState({
            editData: { idph, tenph },
            editModal: !this.state.editModal

        });
        console.log(idph);
    }

    updatenph() {
        let { idph, tenph } = this.state.editData;
        axios.put('/noiphathanhs/' + this.state.editData.idph, {
            idph, tenph
        }).then((response) => {

            this.setState({
                editModal: false,
                editData: {
                    idph: '',
                    tenph: ''

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
                if (item.idph.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenph.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            nph: newArray,
            valueSearch: search
        });
    }

    render() {

        const { nph } = this.state;
        if (this.state.modalAdd === false) return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4">Nơi phát hành</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewnphModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm'}</Button>
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
                                                <th>Nơi phát hành</th>

                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                nph.map((nphs) => {
                                                    return (

                                                        <tr key={nphs.idph}>
                                                            <td>{nphs.idph}</td>
                                                            <td>{nphs.tenph}</td>


                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, nphs.idph, nphs.tenph)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>

                                                                            <FormGroup>
                                                                                <Label for="tennph">Nơi phát hành</Label>
                                                                                <Input id="tenph" value={this.state.editData.tenph} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tenph = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updatenph.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: nphs })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa nơi phát hành " + nphs.tenph + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deletenph({ idph: nphs.idph })}

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

                                    <CardTitle tag="h4">Nơi phát hành</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewnphModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm'}</Button>
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
                                                        <Input value={this.state.newnph.Tenph} onChange={(e) => {
                                                            let { newnph } = this.state;
                                                            newnph.Tenph = e.target.value;
                                                            this.setState({ newnph });
                                                        }}
                                                            placeholder="Nhập nơi phát hành" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="7">
                                                    <Button color="primary" onClick={this.addnph.bind(this)}>Thực hiện lưu</Button>{' '}
                                                    <Button color="danger" onClick={this.toggleNewnphModal.bind(this)}>Hủy bỏ</Button>
                                                </Col>
                                            </Form>

                                        </Row>

                                    </CardTitle>


                                </CardHeader>
                                <CardBody>
                                    <Table className="table table-hover">
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Mã</th>
                                                <th>Nơi phát hành</th>

                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                nph.map((nphs) => {
                                                    return (

                                                        <tr key={nphs.idph}>
                                                            <td>{nphs.idph}</td>
                                                            <td>{nphs.tenph}</td>


                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, nphs.idph, nphs.tenph)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>

                                                                            <FormGroup>
                                                                                <Label for="tenph">Nơi phát hành</Label>
                                                                                <Input id="tenph" value={this.state.editData.tenph} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tennph = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updatenph.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: nphs })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa nơi phát hành " + nphs.tenph + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deletenph({ idph: nphs.idph })}

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

export default DanhMucNoiPhatHanh;
