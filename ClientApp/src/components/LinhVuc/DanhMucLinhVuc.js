import React from 'react';
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

class  DanhMucLinhVuc extends React.Component {
    static displayName =  DanhMucLinhVuc.name;

    constructor(props) {

        super(props);
        this.state = {
            linhvuc: [],
            source: [],
            showAlert: false,
            newlinhvuc: {
                Tenlv: ''
            },
            editData: {
                idlv: '',
                tenlv: ''

            },

            modalAdd: false,
            editModal: false,
            valueSearch: ''

        };

        // This binding is necessary to make "this" work in the callback  


        this._refresh = this._refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deletelinhvuc = this.deletelinhvuc.bind(this);

    }


    //list
    componentDidMount() {

        axios.get('/linhvucs')
            .then((res) => this.setState({
                linhvuc: res.data,
                source: res.data,
                showAlert: false
            })

            );



    }

    //add
    toggleNewlinhvucModal() {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    addlinhvuc() {

        axios.post('/linhvucs', {
            TENLV: this.state.newlinhvuc.tenlv
        })
            .then((response) => {
                alert("Thêm thành công!");
                this.setState({
                    newlinhvuc: {
                        tenlv: ''
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
        axios.get('/linhvucs')
            .then((res) => this.setState({
                linhvuc: res.data,
                showAlert: false
            }));
    }

    deletelinhvuc = (idlv) => {
        const apiUrl = '/linhvucs/' + idlv.idlv;
        axios.delete(apiUrl, { idlv: idlv.idlv })
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

    edit(idlv, tenlv) {
        this.setState({
            editData: { idlv, tenlv },
            editModal: !this.state.editModal

        });
        console.log(idlv);
    }

    updatelinhvuc() {
        let { idlv, tenlv } = this.state.editData;
        axios.put('/linhvucs/' + this.state.editData.idlv, {
            idlv, tenlv
        }).then((response) => {

            this.setState({
                editModal: false,
                editData: {
                    idlv: '',
                    tenlv: ''

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
                if (item.idlv.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenlv.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            linhvuc: newArray,
            valueSearch: search
        });
    }

    render() {

        const { linhvuc } = this.state;
        if (this.state.modalAdd === false) return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4">Lĩnh vực</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewlinhvucModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm lĩnh vực'}</Button>
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
                                                <th>Lĩnh vực</th>

                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                linhvuc.map((lv) => {
                                                    return (

                                                        <tr key={lv.idlv}>
                                                            <td>{lv.idlv}</td>
                                                            <td>{lv.tenlv}</td>


                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, lv.idlv, lv.tenlv)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>

                                                                            <FormGroup>
                                                                                <Label for="tenlv">Lĩnh vực</Label>
                                                                                <Input id="tenlv" value={this.state.editData.tenlv} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tenlv = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updatelinhvuc.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: lv })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa lĩnh vực " + lv.tenlv + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deletelinhvuc({ idlv: lv.idlv })}

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

                                    <CardTitle tag="h4">Lĩnh vực</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewlinhvucModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm lĩnh vực'}</Button>
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
                                                        <Input value={this.state.newlinhvuc.tenlv} onChange={(e) => {
                                                            let { newlinhvuc } = this.state;
                                                            newlinhvuc.tenlv = e.target.value;
                                                            this.setState({ newlinhvuc });
                                                        }}
                                                            placeholder="Nhập lĩnh vực" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="7">
                                                    <Button color="primary" onClick={this.addlinhvuc.bind(this)}>Thực hiện lưu</Button>{' '}
                                                    <Button color="danger" onClick={this.toggleNewlinhvucModal.bind(this)}>Hủy bỏ</Button>
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
                                                <th>Lĩnh vực</th>

                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                linhvuc.map((lv) => {
                                                    return (

                                                        <tr key={lv.idlv}>
                                                            <td>{lv.idlv}</td>
                                                            <td>{lv.tenlv}</td>


                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, lv.idlv, lv.tenlv)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>

                                                                            <FormGroup>
                                                                                <Label for="tenlv">Lĩnh vực</Label>
                                                                                <Input id="tenlv" value={this.state.editData.tenlv} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tenlinhvuc = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updatelinhvuc.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: lv })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa lĩnh vực " + lv.tenlv + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deletelinhvuc({ idlv: lv.idlv })}

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

export default  DanhMucLinhVuc;
