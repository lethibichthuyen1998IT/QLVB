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

class DanhMucLoaiVanBan extends React.Component {
    static displayName = DanhMucLoaiVanBan.name;

    constructor(props) {

        super(props);
        this.state = {
            loaivanban: [],
            source: [],
            showAlert: false,
            newloai: {
                Tenloai: ''
            },
            editData: {
                idloai: 0,
                tenloai: ''

            },

            chucnang: [],
            quyen: [],
            nv: [],

            modalAdd: false,
            editModal: false,
            valueSearch: ''

        };

        // This binding is necessary to make "this" work in the callback  


        this._refresh = this._refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteloaivanban = this.deleteloaivanban.bind(this);

    }


    //list
    componentDidMount() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            nv: nvs
        });
        axios.get('/quyens')
            .then((res) => this.setState({
                quyen: res.data,

            })

            );
        axios.get('/chucnangs')
            .then((res) => this.setState({
                chucnang: res.data,

            })

            );

        axios.get('/loaivanbans')
            .then((res) => this.setState({
                loaivanban: res.data,
                source: res.data,
                showAlert: false
            })

            );



    }

    //add
    toggleNewloaivanbanModal() {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    addloai() {

        axios.post('/loaivanbans', {
            TENLOAI: this.state.newloai.Tenloai
        })
            .then((response) => {
                alert("Thêm thành công!");
                this.setState({
                    newloai: {
                        Tenloai: ''
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
        axios.get('/loaivanbans')
            .then((res) => this.setState({
                loaivanban: res.data,
                showAlert: false
            }));
    }

    deleteloaivanban = (idloai) => {
        const apiUrl = '/loaivanbans/' + idloai.idloai;
        axios.delete(apiUrl, { idloai: idloai.idloai })
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

    edit(idloai, tenloai) {
        this.setState({
            editData: { idloai, tenloai },
            editModal: !this.state.editModal
        });
        console.log(idloai);
    }

    updateloai() {
        let { idloai, tenloai } = this.state.editData;
        axios.put('/loaivanbans/' + this.state.editData.idloai, {
            idloai, tenloai
        }).then((response) => {

            this.setState({
                editModal: false,
                editData: {
                    idloai: 0,
                    tenloai: ''

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
                if (item.maloai.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenloai.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            loaivanban: newArray,
            valueSearch: search
        });
    }

    render() {

        const { loaivanban } = this.state;
        //Quyền
        const { nv, quyen, chucnang } = this.state;
        let rules = [];
        quyen.forEach((e) => {
            if (e.idvaitro.trim() === nv.idvaitro.trim())
                rules.push(e.idcn);
        });
        const name = "Quản lý loại văn bản";
        let cn = [];
        chucnang.forEach((x) => {
            if (x.tencn.toLowerCase() === name.toLowerCase())
                cn.push(x.idcn);
        });

        return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4">Loại văn bản</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            {
                                                (rules.find(x => x == cn)) ?
                                                    <Col md="4">
                                                        <Button color="primary" onClick={this.toggleNewloaivanbanModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm thể loại'}</Button>
                                                    </Col> : null
                                            }
                                            <Col md="4">
                                                <Search
                                                    valueSearch={this.state.valueSearch}
                                                    handleSearch={this.handleSearch} />
                                            </Col>


                                        </Row>
                                        <Row md="12">
                                            {(this.state.modalAdd === false) ?
                                                <div></div>
                                                :
                                                <Form className="form-inline">
                                                    <Col md="5">
                                                        <FormGroup>
                                                            <Input value={this.state.newloai.Tenloai} onChange={(e) => {
                                                                let { newloai } = this.state;
                                                                newloai.Tenloai = e.target.value;
                                                                this.setState({ newloai });
                                                            }}
                                                                placeholder="Nhập loại văn bản" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="7">
                                                        <Button color="primary" disabled={!(this.state.newloai.Tenloai.length > 0)} onClick={this.addloai.bind(this)}>Thực hiện lưu</Button>{' '}
                                                        <Button color="danger" onClick={this.toggleNewloaivanbanModal.bind(this)}>Hủy bỏ</Button>
                                                    </Col>
                                                </Form>
                                            }
                                        </Row>

                                    </CardTitle>


                                </CardHeader>
                                <CardBody>
                                    <Table className="table table-hover">
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Mã</th>
                                                <th>Loại văn bản</th>
                                                {
                                                    (rules.find(x => x == cn)) ?
                                                        <th>Thao tác</th> : null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                loaivanban.map((loai) => {
                                                    return (

                                                        <tr key={loai.idloai}>
                                                            <td>{loai.maloai}</td>
                                                            <td>{loai.tenloai}</td>

                                                            {
                                                                (rules.find(x => x == cn)) ?
                                                                    <td>


                                                                        <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, loai.idloai, loai.tenloai)}>Chỉnh sửa</Button>

                                                                        <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                            <ModalHeader toggle={this.toggleEditModal.bind(this)}>Chỉnh sửa</ModalHeader>
                                                                            <ModalBody>
                                                                                <Form>

                                                                                    <FormGroup>
                                                                                        <Label for="tenloai">Loại văn bản</Label>
                                                                                        <Input id="tenloai" value={this.state.editData.tenloai} onChange={(e) => {
                                                                                            let { editData } = this.state;
                                                                                            editData.tenloai = e.target.value;
                                                                                            this.setState({ editData });
                                                                                        }} />
                                                                                    </FormGroup>
                                                                                </Form>
                                                                            </ModalBody>
                                                                            <ModalFooter>
                                                                                <Button color="primary" disabled={!(this.state.editData.tenloai.length > 0)} onClick={this.updateloai.bind(this)}>Thực hiện lưu</Button>
                                                                                <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                            </ModalFooter>
                                                                        </Modal>
                                                                        <Button
                                                                            type="button" className="btn btn-danger btn-sm"
                                                                            onClick={() => this.handleShowAlert({ id: loai })}>
                                                                            Xóa
                                                                     </Button>
                                                                        <SweetAlert
                                                                            show={this.state.showAlert}

                                                                            title="Xóa"
                                                                            html
                                                                            text={"Bạn có muốn xóa loại văn bản " + loai.tenloai + " không?"}

                                                                            showCancelButton
                                                                            onOutsideClick={() => this.setState({ showAlert: false })}
                                                                            onEscapeKey={() => this.setState({ showAlert: false })}
                                                                            onCancel={() => this.setState({ showAlert: false })}
                                                                            onConfirm={() => this.deleteloaivanban({ idloai: loai.idloai })}

                                                                        />
                                                                    </td>
                                                                    : null
}
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

export default DanhMucLoaiVanBan;
