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

class DanhMucDonVi extends React.Component {
    static displayName = DanhMucDonVi.name;

    constructor(props) {

        super(props);
        this.state = {
            donvi: [],
            source: [],
            showAlert: false,
            newdv: {
               Tendonvi:''
            },
            editData: {
                iddonvi:0,
                tendonvi: ''

            },
           
            modalAdd: false,
            editModal: false,
            valueSearch: ''

        };

        // This binding is necessary to make "this" work in the callback  


        this._refresh = this._refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteDonVi = this.deleteDonVi.bind(this);
      
    }


    //list
    componentDidMount() {

        axios.get('/donvis')
            .then((res) => this.setState({
                donvi: res.data,
                source: res.data,
                showAlert: false
            })

            );

     

    }

    //add
    toggleNewDonViModal() {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    addDV() {

        axios.post('/donvis', {
            TENDONVI: this.state.newdv.Tendonvi
        })
            .then((response) => {
                alert("Thêm thành công!");
                this.setState({
                    newdv: {
                       Tendonvi: ''
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
        axios.get('/donvis')
            .then((res) => this.setState({
                donvi: res.data,
                showAlert: false
            }));
    }
   
    deleteDonVi = (iddonvi) => {
        const apiUrl = '/donvis/' + iddonvi.iddonvi;
        axios.delete(apiUrl, { iddonvi: iddonvi.iddonvi })
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

    edit(iddonvi,tendonvi) {
        this.setState({
            editData: {iddonvi, tendonvi },
            editModal: !this.state.editModal

        });
        console.log(iddonvi);
    }

    updateDV() {
        let { iddonvi, tendonvi } = this.state.editData;
        axios.put('/donvis/' + this.state.editData.iddonvi, {
            iddonvi, tendonvi
        }).then((response) => {

            this.setState({
                editModal: false,
                editData: {
                    iddonvi: 0,
                    tendonvi:''

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
                if (item.madonvi.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tendonvi.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            donvi: newArray,
            valueSearch: search
        });
    }

    render() {

        const { donvi } = this.state;
        if (this.state.modalAdd === false) return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4">Đơn vị</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewDonViModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm đơn vị'}</Button>
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
                                                <th>Mã đơn vị</th>
                                                <th>Tên đơn vị</th>

                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                donvi.map((dv) => {
                                                    return (

                                                        <tr key={dv.iddonvi}>
                                                            <td>{dv.madonvi}</td>
                                                            <td>{dv.tendonvi}</td>


                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, dv.iddonvi, dv.tendonvi)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>

                                                                            <FormGroup>
                                                                                <Label for="tendonvi">Tên đơn vị</Label>
                                                                                <Input id="tendonvi" value={this.state.editData.tendonvi} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tendonvi = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updateDV.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: dv })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa đơn vị " + dv.tendonvi + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deleteDonVi({ iddonvi: dv.iddonvi })}

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

                                    <CardTitle tag="h4">Đơn vị</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            <Col md="4">
                                                <Button color="primary" onClick={this.toggleNewDonViModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm đơn vị'}</Button>
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
                                                        <Input value={this.state.newdv.Tendonvi} onChange={(e) => {
                                                               let { newdv } = this.state;
                                                               newdv.Tendonvi = e.target.value;
                                                               this.setState({ newdv });}}
                                                                placeholder="Nhập tên đơn vị" />
                                                    </FormGroup> 
                                                      </Col>
                                                    <Col md="7">
                                                        <Button color="primary" onClick={this.addDV.bind(this)}>Thực hiện lưu</Button>{' '}
                                                        <Button color="danger" onClick={this.toggleNewDonViModal.bind(this)}>Hủy bỏ</Button>
                                                </Col>
                                            </Form>
                                                                                   
                                        </Row>
                                      
                                    </CardTitle>                                      
                                          
                                      
                                </CardHeader>
                                <CardBody>
                                    <Table className="table table-hover">
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Mã đơn vị</th>
                                                <th>Tên đơn vị</th>
                                              
                                                <th>Thao tác</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                donvi.map((dv) => {
                                                    return (

                                                        <tr key={dv.iddonvi}>
                                                            <td>{dv.madonvi}</td>
                                                            <td>{dv.tendonvi}</td>
                                                           
                                                         
                                                            <td>


                                                                <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, dv.iddonvi, dv.tendonvi)}>Edit</Button>

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                    <ModalBody>
                                                                        <Form>
                                                                           
                                                                            <FormGroup>
                                                                                <Label for="tendonvi">Tên đơn vị</Label>
                                                                                <Input id="tendonvi" value={this.state.editData.tendonvi} onChange={(e) => {
                                                                                    let { editData } = this.state;
                                                                                    editData.tendonvi = e.target.value;
                                                                                    this.setState({ editData });
                                                                                }} />
                                                                            </FormGroup>
                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updateDV.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                <Button
                                                                    type="button" className="btn btn-danger btn-sm"
                                                                    onClick={() => this.handleShowAlert({ id: dv })}>
                                                                    Delete
                                                                     </Button>
                                                                <SweetAlert
                                                                    show={this.state.showAlert}

                                                                    title="Xóa"
                                                                    html
                                                                    text={"Bạn có muốn xóa đơn vị " + dv.tendonvi + " không?"}

                                                                    showCancelButton
                                                                    onOutsideClick={() => this.setState({ showAlert: false })}
                                                                    onEscapeKey={() => this.setState({ showAlert: false })}
                                                                    onCancel={() => this.setState({ showAlert: false })}
                                                                    onConfirm={() => this.deleteDonVi({ iddonvi: dv.iddonvi })}

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

export default DanhMucDonVi;
