import React from 'react';
import moment from 'moment';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';
import Search from 'components/Search';

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
class LayVB extends React.Component {
    static displayName = LayVB.name;
    constructor(props) {
        super(props);
        this.state = {
            empList: [],
            source: [],
            showAlert: false,
            editData: {
                idvb: '',
                idph: '',
                idloai: 0,
                sovb: '',
                trichyeu: '',
                file: '',
                ngayky: '',
                ngaygoi: '',
                ngaynhan: '',
                nguoiky: ''
            },
            detailsData: {
                idvb: '',
                tenph: '',
                tenloai: 0,
                sovb: '',
                trichyeu: '',
                file: '',
                ngayky: '',
                ngaygoi: '',
                ngaynhan: '',
                nguoiky: ''
            },


            ListLoai: [],
            ListPH: [],
            editModal: false,
            detailModal: false,
            valueSearch: ''

        };
     
        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteVB = this.deleteVB.bind(this);
    }

    componentDidMount() {
        axios.get('/Vanbans')
            .then((res) => this.setState({
                empList: res.data,
                source: res.data,
                showAlert: false
            }));

        axios.get('/Noiphathanhs')
            .then((res) =>
                this.setState({
                    ListPH: res.data
                }));

        axios.get('/Loaivanbans')
            .then((res) =>
                this.setState({
                    ListLoai: res.data
                }));

    }



    toggleEditModal() {
        this.setState({
            editModal: !this.state.editModal
        })
    }

    handleSearch = (search) => {

        let sourceArray = this.state.source;

        let newArray = [];
        if (search.length <= 0) {
            newArray = sourceArray;
        } else {

            console.log(search);
            for (let item of sourceArray) {
                console.log(item);
                if (item.sovb.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenloai.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            empList: newArray,
            valueSearch: search
        });
    }

    refresh = () => {
        axios.get('/Vanbans')
            .then((res) => this.setState({
                empList: res.data,
                showAlert: false
            }));
    }

    deleteVB = (idvb) => {
        const apiUrl = '/Vanbans/' + idvb.idvb;
        axios.delete(apiUrl, idvb.idvb)
            .then((res) => {
                alert("Thu hồi văn bản thành công!");
                this.refresh();
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
    toggleDetailModal() {
        this.setState({
           
            detailModal: !this.state.detailModal

        });
    }

    details(idvb, tenph, tenloai, sovb, trichyeu, file, ngayky, ngaygoi, ngaynhan, nguoiky) {
        this.setState({
            detailsData: { idvb, tenph, tenloai, sovb, trichyeu, file, ngayky, ngaygoi, ngaynhan, nguoiky },
                    detailModal: !this.state.detailModal
        });
        console.log(idvb);
    }


    edit(idvb, idph, idloai, sovb, trichyeu, file, ngayky, ngaygoi, ngaynhan, nguoiky) {
        this.setState({
            editData: { idvb, idph, idloai, sovb, trichyeu, file, ngayky, ngaygoi, ngaynhan, nguoiky },
            editModal: !this.state.editModal

        });
        console.log(idvb);
    }
    updateVB() {
        let {idvb, idph, idloai, sovb, trichyeu, file, ngayky, ngaygoi, ngaynhan, nguoiky } = this.state.editData;
        axios.put('/Vanbans/' + this.state.editData.idvb,
            {idvb,idph, idloai, sovb, trichyeu, file, ngayky, ngaygoi, ngaynhan, nguoiky }).then((response) => {
               
                this.setState({
                    editModal: false,
                    editData: {
                        idvb: '',
                        idph: '',
                        idloai: 0,
                        sovb: '',
                        trichyeu: '',
                        file: '',
                        ngayky: '',
                        ngaygoi: '',
                        ngaynhan: '',
                        nguoiky: ''
                    },
                });
                this.refresh();
                console.log(idvb);
                alert("Cập nhật văn bản thành công!");
            });

    }


    render() {
        const { empList } = this.state;
        return (

            <div className="content">
                <Col md="4">
                    <Search
                        valueSearch={this.state.valueSearch}
                        handleSearch={this.handleSearch} />
                </Col>
                <Card>
                    <CardBody>

                        <Table responsive >
                            <thead className="text-primary">
                                <tr>
                                    <th>STT</th>
                                    <th>Số văn bản</th>
                                    <th>Loại VB</th>
                                    <th>Nơi PH</th>
                                    <th>Người ký</th>
                                    <th>Ngày ký</th>
                                  
                                   

                                </tr>
                            </thead>
                            <tbody>
                                {
                                    empList.map((emp,index) => {
                                        return (
                                            <tr key={emp.idvb}>
                                                <td>{index+1}</td>
                                                <td>{emp.sovb}</td>
                                               
                                                <td>{emp.tenloai}</td>
                                                <td>{emp.tenph}</td>
                                                <td>{emp.nguoiky}</td>
                                                <td>{moment(emp.ngayky).format("DD-MM-YYYY")}</td>
                                               

                                                <td width="320px" >
                                                    <Button className="btn btn-info" onClick={this.details.bind(this, emp.idvb, emp.tenph, emp.tenloai, emp.sovb, emp.trichyeu, emp.file, emp.ngayky, emp.ngaygoi, emp.ngaynhan, emp.nguoiky)}>Xem chi tiết  </Button>&nbsp;

                                                    <Modal isOpen={this.state.detailModal} toggle={this.toggleDetailModal.bind(this)}>
                                                        <ModalHeader toggle={this.toggleDetailModal.bind(this)}>Chi tiết văn bản</ModalHeader>
                                                        <ModalBody>
                                                            <Form color="blue">
                                                                <Label for="sovb">Số văn bản: {this.state.detailsData.sovb} </Label>
                                                                <br />
                                                                <Label for="idph">Nơi phát hành:  {this.state.detailsData.tenph} </Label>
                                                                <br />
                                                                <Label for="idloai">Loại văn bản:  {this.state.detailsData.tenloai} </Label>
                                                                <br />
                                                                <Label for="trichyeu">Trích yếu:  {this.state.detailsData.trichyeu} </Label> 
                                                                <br />

                                                                <Label for="file">Xem file: <a href={"/UploadedFiles/" + (this.state.detailsData.file).split('\\').pop()} download> Tải xuống </a> </Label> 
                                                                <br />
                                                                <Label for="ngayky">Ngày ký: {moment(this.state.detailsData.ngayky).format("DD-MM-YYYY")}</Label> 
                                                                <br />
                                                                <Label for="ngaygoi">Ngày gởi: {moment(this.state.detailsData.ngaygoi).format("DD-MM-YYYY")}</Label> 
                                                                <br />
                                                                   
                                                                <Label for="ngaynhan">Ngày nhận: {moment(this.state.detailsData.ngaynhan).format("DD-MM-YYYY")} </Label> 

                                                                <br />
                                                                <Label for="nguoiky">Người ký: {this.state.detailsData.nguoiky} </Label>

                                                            </Form>

                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" onClick={this.updateVB.bind(this)}>Bút phê</Button>
                                                            <Button color="secondary" onClick={this.toggleDetailModal.bind(this)}>Thoát</Button>
                                                        </ModalFooter>
                                                      
                                                    </Modal>
                                               
                                                    <Button className="btn btn-success" onClick={this.edit.bind(this, emp.idvb, emp.idph, emp.idloai, emp.sovb, emp.trichyeu, emp.file, emp.ngayky, emp.ngaygoi, emp.ngaynhan, emp.nguoiky)}>Sửa</Button>&nbsp;

                                                    <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                        <ModalHeader toggle={this.toggleEditModal.bind(this)}>Chỉnh sửa văn bản</ModalHeader>
                                                        <ModalBody>
                                                            <Form>
                                                            <FormGroup>
                                                                <Label for="sovb">Số văn bản: </Label>

                                                                <Input id="sovb" type="text" value={this.state.editData.sovb} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.sovb = e.target.value;
                                                                    this.setState({ editData });
                                                                }} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="idph">Nơi phát hành: </Label>

                                                                <Input id="idph" type="select" value={this.state.editData.idph} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.idph = e.target.value;
                                                                    this.setState({ editData });

                                                                }} >
                                                                    <option value="">-- Chọn nơi phát hành --</option>
                                                                    {this.state.ListPH.map(noiphathanh =>
                                                                        <option key={noiphathanh.idph} value={noiphathanh.idph}>{noiphathanh.tenph}</option>)
                                                                    }
                                                                </Input>
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="idloai">Loại văn bản: </Label>

                                                                <Input id="idloai" type="select" value={this.state.editData.idloai} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.idloai = Number.parseInt(e.target.value);
                                                                    this.setState({ editData });
                                                                }}>
                                                                    <option value='0'>-- Chọn Loại --</option>
                                                                    {this.state.ListLoai.map((loaivanban) =>
                                                                        <option key={loaivanban.idloai} value={loaivanban.idloai}>{loaivanban.tenloai}</option>
                                                                    )}
                                                                </Input>
                                                            </FormGroup>
                                  
                                                            <FormGroup>
                                                                <Label for="trichyeu">Trích yếu: </Label>

                                                                <Input id="trichyeu" type="text" value={this.state.editData.trichyeu} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.trichyeu = e.target.value;
                                                                    this.setState({ editData });
                                                                }} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="file">File:</Label>

                                                                <Input id="file" type="text" value={this.state.editData.file} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.file = e.target.value;
                                                                    this.setState({ editData });
                                                                }} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="ngayky">Ngày ký: </Label>
                                                                <Input id="ngayky" type="date"
                                                                        value={moment(this.state.editData.ngayky).format("YYYY-MM-DD")}
                                                                    onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.ngayky = e.target.value;
                                                                        this.setState({ editData });
                                                                    }} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="ngaygoi">Ngày gởi: </Label>

                                                                    <Input id="ngaygoi" type="date" value={moment(this.state.editData.ngaygoi).format("YYYY-MM-DD")} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                   editData.ngaygoi = e.target.value;
                                                                    this.setState({ editData });
                                                                }} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="ngaynhan">Ngày nhận: </Label>

                                                                    <Input id="ngaynhan" type="date" value={moment(this.state.editData.ngaynhan).format("YYYY-MM-DD")} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.ngaynhan = e.target.value;
                                                                    this.setState({ editData });
                                                                }} />
                                                            </FormGroup>
                                                            <FormGroup>
                                                                <Label for="nguoiky">Người ký: </Label>

                                                                <Input id="ngayky" type="text" value={this.state.editData.nguoiky} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.nguoiky = e.target.value;
                                                                    this.setState({ editData });
                                                                }} />
                                                                </FormGroup>
                                                            </Form>

                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" onClick={this.updateVB.bind(this)}>Lưu</Button>
                                                            <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy</Button>
                                                        </ModalFooter>
                                                        
                                                    </Modal>

                                             

                                                    <Button type="button" className="btn btn-danger"
                                                        onClick={() => this.handleShowAlert({ id: emp })}> Thu hồi </Button>

                                                    <SweetAlert
                                                        show={this.state.showAlert}

                                                        title="Thu hồi"
                                                        html
                                                        text={"Bạn có muốn thu hồi văn bản số " + emp.sovb + " (" + emp.idvb + ") không?"}
                                                        showCancelButton
                                                        onOutsideClick={() => this.setState({ showAlert: false })}
                                                        onEscapeKey={() => this.setState({ showAlert: false })}

                                                        onConfirm={() => this.deleteVB({ idvb: emp.idvb })}
                                                        onCancel={() => this.setState({ showAlert: false })}

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
            </div>
        );



    }


}


export default LayVB;