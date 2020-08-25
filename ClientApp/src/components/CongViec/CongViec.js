
import React, { useState } from 'react';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';
import moment from 'moment';
import Select from '@material-ui/core/Select';
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





    export class CongViec extends React.Component {
        static displayName = CongViec.name;

        constructor(props) {
            super(props);
            this.state = {
                numberPages: null,
                pageNumber: 1,
                congviec: [],
                newcongviec: {
                    Idcongviec: '',
                    Idlv: '',
                    Iddqt: '',
                    Idhoso: '',
                    Tieude: '',
                    Hanxuly: '',
                    Ngaygiomo: '',
                    Ngaygioht: '',
                    Filedinhkem: ''
                },
                detailData: {
                    idcongviec: '',
                    iddqt: '',
                    idhoso: '',
                    idlv: '',
                    tendqt: '',
                    tenlv: '',
                    tenhoso: '',
                    ngaygiomo: '',
                    ngaygioht: '',
                    tieude: '',
                    hanxuly: '',
                    filedinhkem: ''
                },
                giaoviecData: {
                    idcongviec: ''
                },
                editData: {
                    idcongviec: '',
                    iddqt: '',
                    idhoso: '',
                    idlv: '',
                    ngaygiomo: '',
                    ngaygioht: '',
                    tieude: '',
                    hanxuly: '',
                    filedinhkem: ''
               
                },
                values: [],
                showAlert: false,
                hoso: [],
                doquantrong: [],
                linhvuc: [],
                nhanvien: [],
                xulycongviec: [],
                editModal: false,
                AddModal: false,
                giaoviecModal: false,
                GiaoViecModal: false,
                showAlert: false,
                detailModal: false,
                fileModal: false,
                valueSearch: '',
                source: [],
                selectedFile: '',
                progress: 0,
                status: ''

            };
            this.handleShowAlert = this.handleShowAlert.bind(this);
            this.deleteCongViec = this.deleteCongViec.bind(this);
        
           
        }




        refesh() {
            fetch('/CongViec/Index').then(response => response.json()).then(data => this.setState({ congviec: data, showAlert: false }))
        }

     

        componentDidMount() {
            axios.get('/CongViec/Index')
                .then((res) => this.setState({
                    congviec: res.data,
                    source: res.data,
                    showAlert: false
                }));

            axios.get('/CongViec/GetLinhVuc')
                .then((res) =>
                    this.setState({
                        linhvuc: res.data
                    }));

            axios.get('/CongViec/GetDoQuanTrong')
                .then((res) =>
                    this.setState({
                        doquantrong: res.data
                    }));
            axios.get('/CongViec/GetHoSo')
                .then((res) =>
                    this.setState({
                        hoso: res.data
                    }));

            axios.get('/CongViec/GetNhanVien')
                .then((res) =>
                    this.setState({
                        nhanvien: res.data
                    }));
        }

        AddCongViec = () => {
            axios.post('/CongViec/AddCongViec', {
                Tieude: this.state.Tieude,
                Idlv: this.state.Idlv,
                Idcongviec: this.state.Idcongviec,
                Idhoso: this.state.Idhoso,
                Iddqt: this.state.Iddqt,
                Hanxuly: this.state.Hanxuly,
                Ngaygiomo: this.state.Ngaygiomo,
                Ngaygioht: this.state.Ngaygioht,
                Filedinhkem: this.state.Filedinhkem

            })
                .then(json => {
                    this.refesh();
                    this.setState({
                        AddModal: false,
                        newcongviec: {
                            Idcongviec: '',
                            Idlv: '',
                            Iddqt: '',
                            Idhoso: '',
                            Tieude: '',
                            Hanxuly: '',
                            Ngaygiomo: '',
                            Ngaygioht: '',
                            Filedinhkem: ''
                        }
                    })

                    alert("Thêm thành công!");

                })
        }
        handleShowAlert = (id) => {

            this.setState({
                showAlert: true
            });
            return this;

        }
        handleChange = (e) => {
            this.setState({ [e.target.name]: e.target.value });
        }


        AddModal() {
            this.setState({
                AddModal: !this.state.AddModal
            })
        }

        toggleFileModal() {
            this.setState({
                fileModal: !this.state.fileModal
            });
        }

        //edit
        toggleEditModal() {
            this.setState({
                editModal: !this.state.editModal
            });
        }

        edit(idcongviec, iddqt, idhoso, idlv, tieude, ngaygiomo, ngaygioht, hanxuly, filedinhkem) {
            this.setState({
                editData: { idcongviec, iddqt, idhoso, idlv, tieude, ngaygiomo, ngaygioht, hanxuly, filedinhkem },
                editModal: !this.state.editModal

            });
            console.log(idcongviec);
        }

        updateCV() {
            let { idcongviec, iddqt, idhoso, idlv, tieude, ngaygiomo, ngaygioht, hanxuly, filedinhkem } = this.state.editData;
            axios.put('/CongViec/Edit/' + this.state.editData.idcongviec, {
                idcongviec, iddqt, idhoso, idlv, tieude, ngaygiomo, ngaygioht, hanxuly, filedinhkem
            }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        idcongviec: '',
                        idhoso: '',
                        idlv: '',
                        iddqt: '',
                        ngaygiomo: '',
                        ngaygioht: '',
                        tieude: '',
                        hanxuly: '',
                        filedinhkem: '',
                    }
                });
                alert("Sửa thành công!");
                this.refesh();

            });

        }

        deleteCongViec = (idcongviec) => {

            const apiUrl = '/CongViec/Delete/' + idcongviec.idcongviec;
            console.log(idcongviec.idcongviec);

            axios.delete(apiUrl, { idcongviec: idcongviec.idcongviec })
                .then((res) => {
                    alert("Xóa thành công!");
                    this.refesh();
                    this.setState({
                        showAlert: false
                    });
                });
        }


        details(idcongviec, tenhoso, tendqt, tenlv, iddqt, idhoso, idlv, tieude, ngaygiomo, ngaygioht, hanxuly, filedinhkem) {
            this.setState({
                detailData: { idcongviec, tenhoso, tendqt, tenlv, iddqt, idhoso, idlv, tieude, ngaygiomo, ngaygioht, hanxuly, filedinhkem },
                detailModal: !this.state.detailModal
            });
            console.log(idcongviec);
        }
        toggleDetailModal() {
            this.setState({
                detailModal: !this.state.detailModal

            });
        }



        //Chuyển giao công việc
        toggleGiaoViecModal() {
            this.setState({
                giaoviecModal: !this.state.giaoviecModal
            })
        }

     

      
        handleChangeMultiple = (event) => {


            this.state.values.forEach(
                (i) => {
                    axios.post('/XuLyCongViec/GiaoViec', {
                        IDNV: Number.parseInt(i),
                        IDCONGVIEC: this.state.giaoviecData.idcongviec
                    }).then((response) => {

                        this.setState({
                            giaoviecModal: false
                        });
                        alert("Lưu thành công!");


                    });
                    this.refesh();
                    
                })
        }
        giaoviec(idcongviec) {
            this.setState({
                giaoviecData: { idcongviec},
                giaoviecModal: !this.state.giaoviecModal

            });
            console.log(idcongviec);
        }
        //Delete XuLyCongViec
        deleteGiaoViec = (idcongviec, idnv) => {
            this.state.values.forEach(
                (i) => {
                    console.log(i, this.state.giaoviecData.idcongviec)
                    const apiUrl = '/XuLyCongViec/Delete/' + this.state.giaoviecData.idcongviec.trim() + "/" + i;

                    axios.delete(apiUrl, { idcongviec: this.state.giaoviecData.idcongviec.trim(), idnv: i })
                        .then((res) => {

                            this.refesh();
                            alert("Xóa thành công!");
                        });
                })
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
                    if (item.tieude.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.idcongviec.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenhoso.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tendqt.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenlv.toLowerCase().indexOf(search.toLowerCase()) > -1 ) {
                        newArray.push(item);
                    }
                }

            }

            this.setState({
                congviec: newArray,
                valueSearch: search
            });
        }
        //Upload file
        selectFileHandler = (event) => {

            const fileTypes = ['application/pdf'];
            let filedinhkem = event.target.files;
            console.log(`File ${filedinhkem}`);

            let errMessage = [];

            if (fileTypes.every(extension => filedinhkem[0].type != extension)) {
                errMessage.push(`The file ${filedinhkem.type} extension is not supported`);
            } else {
                let { newcongviec } = this.state;
                newcongviec.filedinhkem = event.target.value;

                this.setState({
                    selectedFile: filedinhkem[0],
                    newcongviec


                });
            }
        };

        uploadHandler = (event) => {

            const formData = new FormData();
            formData.append('PDF', this.state.selectedFile);
            axios.post('/uploadfile', formData, {
                onUploadProgress: progressEvent => {
                    this.setState({

                        progress: (progressEvent.loaded / progressEvent.total * 100)
                    })
                }
            })
                .then((response) => {
                    this.setState({ status: `Tải lên thành công` });
                })
                .catch((error) => {
                    this.setState({ status: `Tải lên thất bại` });
                })
        }




        render() {

            //const contents = CongViec.renderCongViecTable(this.state.congviec);
            const { nhanvien, value } = this.state;
            return (
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>
                                  
                                    <CardTitle tag="h4">Danh sách công việc</CardTitle>
                                    <Row md="12">
                                        <Col md="4">
                                            <Button color="primary" onClick={this.AddModal.bind(this)}>Thêm</Button>
                                           
                                            
                                        </Col>
                                        <Col md="4">
                                            <Search
                                                valueSearch={this.state.valueSearch}
                                                handleSearch={this.handleSearch} />
                                        </Col>
                                    </Row>
                                    <Modal isOpen={this.state.AddModal} toggle={this.AddModal.bind(this)}>
                                        <ModalHeader toggle={this.AddModal.bind(this)}>Thêm Công việc mới</ModalHeader>
                                        <ModalBody>
                                            <Form>
                                                <FormGroup>
                                                    <Label for="idcv">Mã công việc</Label>
                                                    <Input type="text" name="Idcongviec" onChange={this.handleChange} value={this.state.Idcongviec} placeholder="Mã cv" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="linhvuc1">Lĩnh vực</Label>
                                                    <select class="form-control" name="Idlv" value={this.state.Tenlv} onChange={this.handleChange} >
                                                        <option value='0' >--Chọn lĩnh vực--</option>
                                                        {
                                                            this.state.linhvuc.map((lv) => <option key={lv.idlv} value={lv.idlv}>{lv.tenlv}</option>)
                                                        }
                                                    </select>

                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="dqt">Độ quan trọng</Label>
                                                    <select class="form-control" name="Iddqt" value={this.state.Tendqt} onChange={this.handleChange}>
                                                        <option value='0' >--Chọn độ quan trọng--</option>
                                                        {
                                                            this.state.doquantrong.map((dqt) =>
                                                                <option key={dqt.iddqt} value={dqt.iddqt}>{dqt.tendqt}</option>)
                                                        }
                                                    </select>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="hs">Hồ sơ</Label>
                                                    <select class="form-control" name="Idhoso" value={this.state.Tenhoso} onChange={this.handleChange}>
                                                        <option value='0' >--Chọn hồ sơ--</option>
                                                        {
                                                            this.state.hoso.map((hs) =>
                                                                <option key={hs.idhoso} value={hs.idhoso}>{hs.tenhoso}</option>)
                                                        }
                                                    </select>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="td">Tiêu đề</Label>
                                                    <Input type="text" name="Tieude" onChange={this.handleChange} value={this.state.Tieude} placeholder="Tiêu đề" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="hxl">Hạn xử lý</Label>
                                                    <Input type="datetime-local" name="Hanxuly" onChange={this.handleChange} value={this.state.Hanxuly} placeholder="Hạn xử lý" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="ngm">Ngày giờ mở</Label>
                                                    <Input type="datetime-local" name="Ngaygiomo" onChange={this.handleChange} value={this.state.Ngaygiomo} placeholder="Ngày giờ mở" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="nght">Ngày giờ hoàn thành</Label>
                                                    <Input type="datetime-local" name="Ngaygioht" onChange={this.handleChange} value={this.state.Ngaygioht} placeholder="Ngày giờ hoàn thành" />
                                                </FormGroup>
                                                <FormGroup>
                                                    <Label for="filedk">Đính kèm tệp</Label>
                                                    <Input required id="filedinhkem" type="file" value={this.state.filedinhkem} onChange={(event) => this.selectFileHandler(event)} />
                                                    <br />
                                                    <div><button type="button" onClick={this.uploadHandler}>Tải lên </button></div>
                                                    <div>{this.state.progress}</div>

                                                    <div>{this.state.status}</div>  
                                                </FormGroup>
                                            </Form>
                                        </ModalBody>
                                        <ModalFooter>
                                            <button type="button" onClick={this.AddCongViec} className="btn btn-success">Lưu</button>{' '}
                                            <Button color="danger" onClick={this.AddModal.bind(this)}>Hủy bỏ</Button>
                                        </ModalFooter>
                                    </Modal>
                                </CardHeader>
                                <CardBody>
                                    <Table responsive>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Mã số</th>
                                                <th>Tên công việc</th>

                                                <th>Hạn xử lý</th>


                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.congviec.map(cv =>
                                                    <tr key={cv.idcongviec}>
                                                        <td>{cv.idcongviec}</td>
                                                        <td>{cv.tieude}</td>
                                                        <td>{moment(cv.hanxuly).format("DD-MM-YYYY HH:MM:SS")}</td>




                                                        <td>
                                                            <Button className="btn btn-info" onClick={this.details.bind(this, cv.idcongviec, cv.tenhoso, cv.tendqt, cv.tenlv, cv.iddqt, cv.idhoso, cv.idlv, cv.tieude, cv.ngaygiomo, cv.ngaygioht, cv.hanxuly, cv.filedinhkem)}>Xem chi tiết  </Button>&nbsp;

                                                    <Modal isOpen={this.state.detailModal} toggle={this.toggleDetailModal.bind(this)}>
                                                                <ModalHeader toggle={this.toggleDetailModal.bind(this)}>Chi tiết công việc</ModalHeader>
                                                                <ModalBody>
                                                                    
                                                                    <Form color="blue">

                                                                        <Label>Mã công việc: {this.state.detailData.idcongviec} </Label>
                                                                        <br />
                                                                        <Label >Nội dung công việc: {this.state.detailData.tieude} </Label>
                                                                        <br />
                                                                        <Label >Hồ sơ: {this.state.detailData.tenhoso} </Label>
                                                                        <br />
                                                                        <Label >Lĩnh vực: {this.state.detailData.tenlv} </Label>
                                                                        <br />
                                                                        <Label>Độ quan trọng: {this.state.detailData.tendqt} </Label>
                                                                        <br />
                                                                        <Label >Hạn xử lý: {moment(this.state.detailData.hanxuly).format("DD-MM-YYYY HH:MM:SS")}</Label>
                                                                        <br />
                                                                        <Label >Ngày giờ mở: {moment(this.state.detailData.ngaygiomo).format("DD-MM-YYYY HH:MM:SS")}</Label>
                                                                        <br />
                                                                        <Label >Ngày giờ hoàn thành: {moment(this.state.detailData.ngaygioht).format("DD-MM-YYYY HH:MM:SS")}</Label>
                                                                        <br />
                                                                      
                                                                    </Form>

                                                                </ModalBody>
                                                                <ModalFooter>

                                                                    <Button className="btn btn-danger" onClick={this.toggleDetailModal.bind(this)}>Thoát</Button>
                                                                </ModalFooter>

                                                            </Modal>
                                                            <Button className="btn btn-success" onClick={this.edit.bind(this, cv.idcongviec, cv.iddqt, cv.idhoso, cv.idlv, cv.tieude, cv.ngaygiomo, cv.ngaygioht, cv.hanxuly, cv.filedinhkem)}>Sửa</Button>&nbsp;

                                                        <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                <ModalBody>
                                                                    <Form>

                                                                        <FormGroup>
                                                                            <Label for="iddqt">Độ quan trọng</Label>
                                                                            <Input type="select" id="iddqt" value={this.state.editData.iddqt} onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.iddqt = e.target.value;
                                                                                this.setState({ editData });
                                                                            }}>

                                                                                {
                                                                                    this.state.doquantrong.map((dqt) =>
                                                                                        <option key={dqt.iddqt} value={dqt.iddqt}>{dqt.tendqt}</option>)
                                                                                }
                                                                            </Input>
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <Label for="idhoso">Hồ sơ</Label>
                                                                            <Input type="select" id="idhoso" value={this.state.editData.idhoso} onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.idhoso = e.target.value;
                                                                                this.setState({ editData });
                                                                            }}>

                                                                                {
                                                                                    this.state.hoso.map((hs) =>
                                                                                        <option key={hs.idhoso} value={hs.idhoso}>{hs.tenhoso}</option>)
                                                                                }
                                                                            </Input>
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <Label for="idlv">Lĩnh vực</Label>
                                                                            <Input type="select" id="idlv" value={this.state.editData.idlv} onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.idlv = e.target.value;
                                                                                this.setState({ editData });
                                                                            }}>

                                                                                {
                                                                                    this.state.linhvuc.map((lv) =>
                                                                                        <option key={lv.idlv} value={lv.idlv}>{lv.tenlv}</option>)
                                                                                }
                                                                            </Input>
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <Label for="tieude">Tiêu đề</Label>
                                                                            <Input id="tieude" value={this.state.editData.tieude} onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.tieude = e.target.value;
                                                                                this.setState({ editData });
                                                                            }} />
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <Label for="ngaygiomo">Ngày giờ mở</Label>
                                                                            <Input type="datetime-local" id="ngaygiomo" value={this.state.editData.ngaygiomo} onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.ngaygiomo = e.target.value;
                                                                                this.setState({ editData });
                                                                            }} />
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <Label for="ngaygioht">Ngày giờ hoàn thành</Label>
                                                                            <Input type="datetime-local" id="ngaygioht" value={this.state.editData.ngaygioht} onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.ngaygioht = e.target.value;
                                                                                this.setState({ editData });
                                                                            }} />
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <Label for="hanxuly">Hạn xử lý</Label>
                                                                            <Input type="datetime-local" id="hanxuly" value={this.state.editData.hanxuly} onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.hanxuly = e.target.value;
                                                                                this.setState({ editData });
                                                                            }} />
                                                                        </FormGroup>
                                                                        <FormGroup>
                                                                            <Label for="file">File đính kèm</Label>
                                                                            <Input type="file" id="filedinhkem" name="filedinhkem" onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.filedinhkem = e.target.value;
                                                                                this.setState({ editData });
                                                                            }} value={this.state.filedinhkem} />
                                                                        </FormGroup>
                                                                    </Form>
                                                                </ModalBody>
                                                                <ModalFooter>
                                                                    <Button color="primary" onClick={this.updateCV.bind(this)}>Thực hiện lưu</Button>
                                                                    <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                </ModalFooter>
                                                            </Modal>
                                                            <Button type="button" className="btn btn-danger"
                                                                onClick={() => this.handleShowAlert({ id: cv })}> Xóa </Button>&nbsp;

                                                            <SweetAlert
                                                                show={this.state.showAlert}

                                                                title="Thu hồi"
                                                                html
                                                                text={"Bạn có muốn xóa công việc số " + cv.idcongviec + " (" + cv.tieude + ") không?"}
                                                                showCancelButton
                                                                onOutsideClick={() => this.setState({ showAlert: false })}
                                                                onEscapeKey={() => this.setState({ showAlert: false })}

                                                                onConfirm={() => this.deleteCongViec({ idcongviec: cv.idcongviec })}
                                                                onCancel={() => this.setState({ showAlert: false })}

                                                            />
                                                             

                                                            <Button className="btn btn-warning" onClick={this.giaoviec.bind(this,cv.idcongviec)}>Giao việc</Button>
                                                                <Modal isOpen={this.state.giaoviecModal} toggle={this.toggleGiaoViecModal.bind(this)}>
                                                                    <ModalHeader toggle={this.toggleGiaoViecModal.bind(this)}>Giao việc cho nhân viên</ModalHeader>
                                                                    <ModalBody>
                                                                    <Form>
                                                                       
                                                                        <FormGroup>


                                                                            <Label >Nhân viên</Label>
                                                                            <div>
                                                                                
                                                                                <Select multiple native value={value} onChange={(event) => {
                                                                                    const { options } = event.target;
                                                                                    const value = [];
                                                                                    for (let i = 0, l = options.length; i < l; i += 1) {
                                                                                        if (options[i].selected) {
                                                                                            value.push(options[i].value);
                                                                                        }
                                                                                    }
                                                                                    this.setState({ values: value });
                                                                                }}>

                                                                                    {nhanvien.map((name, index) => (
                                                                                        <option id={name.idnv} key={index} value={name.idnv}>
                                                                                            {name.hoten}
                                                                                        </option>
                                                                                    ))}

                                                                                </Select>
                                                                              
                                                                            </div>
                                                                            <Button color="primary" onClick={this.deleteGiaoViec}>Xóa</Button>

                                                                            </FormGroup>
                                                                           
                                                                           



                                                                        </Form>
                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                    <Button color="primary" onClick={this.handleChangeMultiple}>Giao việc</Button>
                                                                    

                                                                        <Button color="secondary" onClick={this.toggleGiaoViecModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>
                                                                </Modal>
                                                                           
                                                        </td>

                                                    </tr>)
                                            }
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


export default CongViec;
