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

class DanhMucDoQuanTrong extends React.Component {
    static displayName = DanhMucDoQuanTrong.name;

    constructor(props) {

        super(props);
        this.state = {
            doqt: [],
            source: [],
            showAlert: false,
            newdqt: {
                Tendqt: ''
            },
            editData: {
                iddqt: '',
                tendqt: ''

            },

            modalAdd: false,
            editModal: false,
            valueSearch: ''

        };

        // This binding is necessary to make "this" work in the callback  


        this._refresh = this._refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deletedoqt = this.deletedoqt.bind(this);

    }


    //list
    componentDidMount() {

        axios.get('/doquantrongs')
            .then((res) => this.setState({
                doqt: res.data,
                source: res.data,
                showAlert: false
            })

            );



    }

    //add
    toggleNewdoqtModal() {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    addDQT() {

        axios.post('/doquantrongs', {
            TENDQT: this.state.newdqt.Tendqt
        })
            .then((response) => {
                alert("Thêm thành công!");
                this.setState({
                    newdqt: {
                        Tendqt: ''
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
        axios.get('/doquantrongs')
            .then((res) => this.setState({
                doqt: res.data,
                showAlert: false
            }));
    }

    deletedoqt = (iddqt) => {
        const apiUrl = '/doquantrongs/' + iddqt.iddqt;
        axios.delete(apiUrl, { iddqt: iddqt.iddqt })
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

    edit(iddqt, tendqt) {
        this.setState({
            editData: { iddqt, tendqt },
            editModal: !this.state.editModal

        });
        console.log(iddqt);
    }

    updateDQT() {
        let { iddqt, tendqt } = this.state.editData;
        axios.put('/doquantrongs/' + this.state.editData.iddqt, {
            iddqt, tendqt
        }).then((response) => {

            this.setState({
                editModal: false,
                editData: {
                    iddqt: '',
                    tendqt: ''

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
                if (item.iddqt.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tendqt.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            doqt: newArray,
            valueSearch: search
        });
    }

    render() {

        const { doqt } = this.state;
        if (this.state.modalAdd === false) return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4">Độ quan trọng văn bản</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewdoqtModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm độ quan trọng'}</Button>
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
                                                <th>Mã dộ quan trọng</th>
                                                <th>Độ quan trọng</th>

                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                doqt.map((dqt) => {
                                                    return (

                                                        <tr key={dqt.iddqt}>
                                                            <td>{dqt.iddqt}</td>
                                                            <td>{dqt.tendqt}</td>


                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, dqt.iddqt, dqt.tendqt)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>

                                                                            <FormGroup>
                                                                                <Label for="tendqt">Độ quan trọng</Label>
                                                                                <Input id="tendqt" value={this.state.editData.tendqt} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tendqt = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updateDQT.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: dqt })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa độ quan trọng: " + dqt.tendqt + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deletedoqt({ iddqt: dqt.iddqt })}

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

                                    <CardTitle tag="h4">Độ quan trọng văn bản</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewdoqtModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm độ quan trọng'}</Button>
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
                                                        <Input value={this.state.newdqt.Tendqt} onChange={(e) => {
                                                            let { newdqt } = this.state;
                                                            newdqt.Tendqt = e.target.value;
                                                            this.setState({ newdqt });
                                                        }}
                                                            placeholder="Nhập độ quan trọng" />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="7">
                                                    <Button color="primary" onClick={this.addDQT.bind(this)}>Thực hiện lưu</Button>{' '}
                                                    <Button color="danger" onClick={this.toggleNewdoqtModal.bind(this)}>Hủy bỏ</Button>
                                                </Col>
                                            </Form>

                                        </Row>
                                    </CardTitle>


                                </CardHeader>
                                <CardBody>
                                    <Table className="table table-hover">
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Mã dộ quan trọng</th>
                                                <th>Độ quan trọng</th>

                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                doqt.map((dqt) => {
                                                    return (

                                                        <tr key={dqt.iddqt}>
                                                            <td>{dqt.iddqt}</td>
                                                            <td>{dqt.tendqt}</td>


                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, dqt.iddqt, dqt.tendqt)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>

                                                                            <FormGroup>
                                                                                <Label for="tendqt">Độ quan trọng</Label>
                                                                                <Input id="tendqt" value={this.state.editData.tendqt} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tendqt = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updateDQT.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: dqt })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa độ quan trọng: " + dqt.tendqt + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deletedoqt({ iddqt: dqt.iddqt })}

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

export default DanhMucDoQuanTrong;
