import React from 'react';
import axios from 'axios';
import moment from 'moment';

import { Container, Col, Form, Row, FormGroup, Label, Input, Button } from 'reactstrap';

class AddCongViec extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

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
            hoso: [],
            doquantrong: [],
            linhvuc: []

        }

    }

    listLinhvuc(linhvuc) {

        fetch('/CongViec/GetLinhVuc')
            .then((response) => response.json())
            .then(data =>
                this.setState({
                    linhvuc: data
                }));

        return (
            linhvuc.map((lv) =>
                <option key={lv.idlv} value={lv.idlv}>{lv.tenlv}</option>)
        )
    }

    componentDidMount() {
        axios.get('/CongViec/Index')
            .then((res) => this.setState({
                nhanvien: res.data,
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


    }

    listDoquantrong(doquantrong) {

        fetch('/CongViec/GetDoQuanTrong')
            .then((response) => response.json())
            .then(data =>
                this.setState({
                    doquantrong: data
                }));

        return (
            doquantrong.map((dqt) =>
                <option key={dqt.iddqt} value={dqt.iddqt}>{dqt.tendqt}</option>)
        )
    }

    listHoso(hoso) {

        fetch('/CongViec/GetHoSo')
            .then((response) => response.json())
            .then(data =>
                this.setState({
                    hoso: data
                }));

        return (
            hoso.map((hs) =>
                <option key={hs.idhoso} value={hs.idhoso}>{hs.tenhoso}</option>)
        )
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

                alert("Data Save Successfully");
                this.props.history.push('index')
            })
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <Container className="App">
                <h4 className="PageHeading">Thêm công việc mới</h4>

                <div class="contain">
                    <Form className="form">
                        <Col>
                            <FormGroup row>
                                <Label for="name" sm={2}>Mã</Label>
                                <Col sm={6}>
                                    <Input type="text" name="Idcongviec" onChange={this.handleChange} value={this.state.Idcongviec} placeholder="Mã cv" />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>Lĩnh vực</Label>
                                <Col sm={10}>
                                    <select name="Idlv" value={this.state.Tenlv} onChange={this.handleChange} >
                                        <option value='0' >--Chọn lĩnh vực--</option>
                                        {
                                            this.state.linhvuc.map((lv) =>
                                                <option key={lv.idlv} value={lv.idlv}>{lv.tenlv}</option>)
                                        }
                                    </select>
                                </Col>
                            </FormGroup>


                            
                            <FormGroup row>
                                <Label sm={2}>Hồ sơ</Label>
                                <Col sm={10}>
                                    <select name="Idhoso" value={this.state.Tenhoso} onChange={this.handleChange}>
                                        <option value='0' >--Chọn hồ sơ--</option>
                                        {
                                            this.state.hoso.map((hs) =>
                                                <option key={hs.idhoso} value={hs.idhoso}>{hs.tenhoso}</option>)
                                        }
                                    </select>
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>Độ quan trọng</Label>
                                <Col sm={10}>
                                    <select name="Iddqt" value={this.state.Tendqt} onChange={this.handleChange}>
                                        <option value='0' >--Chọn độ quan trọng--</option>
                                        {this.listDoquantrong(this.state.doquantrong)}
                                    </select>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>Nội dung</Label>
                                <Col sm={10}>
                                    <Input type="text" name="Tieude" onChange={this.handleChange} value={this.state.Tieude} placeholder="Tiêu đề" />
                                </Col>
                            </FormGroup>

                           
                            <FormGroup row>
                                <Label sm={2}>Hạn xử lý</Label>
                                <Col sm={10}>
                                    <Input type="datetime-local" name="Hanxuly" onChange={this.handleChange} value={this.state.Hanxuly} placeholder="Hạn xử lý" />
                                </Col>
                            </FormGroup>
                           

                            <FormGroup row>
                                <Label sm={2}>Ngày giờ mở</Label>
                                <Col sm={10}>
                                    <Input type="datetime-local" name="Ngaygiomo" onChange={this.handleChange} value={this.state.Ngaygiomo} placeholder="Ngày giờ mở" />
                                </Col>
                            </FormGroup>

                            <FormGroup row>
                                <Label sm={2}>Ngày giờ hoàn thành</Label>
                            <Col sm={10}>
                                <Input type="datetime-local" name="Ngaygioht" onChange={this.handleChange} value={this.state.Ngaygioht} placeholder="Ngày giờ hoàn thành" />
                            </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>File đính kèm</Label>
                                <Col sm={10}>
                                    <Input type="file" name="Filedinhkem" onChange={this.handleChange} value={this.state.Filedinhkem} placeholder="File đính kèm" />
                                </Col>
                            </FormGroup>


                           

                              
                        </Col>
                        <Col>
                            <FormGroup row>
                                <Col sm={5}>
                                </Col>
                                <Col sm={1}>
                                    <button type="button" onClick={this.AddCongViec} className="btn btn-success">Lưu</button>
                                </Col>
                                <Col sm={1}>
                                    <Button color="danger">Hủy</Button>{' '}
                                </Col>
                                <Col sm={5}>
                                </Col>
                            </FormGroup>
                        </Col>
                    </Form>
                </div>
            </Container>
        );
    }

}

export default AddCongViec;