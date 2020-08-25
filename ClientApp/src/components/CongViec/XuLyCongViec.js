import React, { useState } from 'react';
import axios from 'axios';
import SweetAlert from 'sweetalert-react';

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
export class XuLyCongViec extends React.Component {
    static displayName = XuLyCongViec.name;
    constructor(props) {
        super(props);
        this.state = {
            xulycongviec: [],
            giaoviec: {
                Idcongviec: '',
                Idnv: '',
                Trangthaixuly: ''
               
            },
            deleteData: {
                idcongviec: '',
                idnv: 0,
                trangthaixuly: '',
                tieude: '',
                hoten: ''
            },
            congviec: [],
            nhanvien: [],
            giaoviecModal: false,
            showAlert: false,
            deleteModal: false
        };
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteGiaoViec = this.handleShowAlert.bind(this);
        
    }

    refresh() {
        axios.get('/XuLyCongViec/Index')
            .then((res) => this.setState({
                xulycongviec: res.data,
                showAlert: false
            }));
    }

    componentDidMount() {
        axios.get('/XuLyCongViec/Index')
            .then((res) => this.setState({
                xulycongviec: res.data,
                showAlert: false
            }));

        axios.get('/XuLyCongViec/GetCongViec')
            .then((res) =>
                this.setState({
                    congviec: res.data
                }));
        axios.get('/XuLyCongViec/GetNhanVien')
            .then((res) =>
                this.setState({
                    nhanvien: res.data
                }));

      
    }
    handleShowAlert = (id, nv) => {
        this.setState({
            showAlert: true,
          
        });
        return this;
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    giaoviecModal() {
        this.setState({
            giaoviecModal: !this.state.giaoviecModal
        })
    }
   
    //Xóa giao việc
    //details(idcongviec, idnv, trangthaixuly, tieude, hoten) {
    //    this.setState({
    //        deleteData: { idcongviec, idnv, trangthaixuly, tieude, hoten },
    //        deleteModal: !this.state.deleteModal
    //    });
    //    console.log(idcongviec, idnv);
    //}

    //toggleDeleteModal() {
    //    this.setState({
    //        deleteModal: !this.state.deleteModal
    //    })
    //}
    //deleteGiaoViec = (idcongviec, idnv) => {
  
    //    const apiUrl = '/XuLyCongViec/Delete/' + idcongviec.idcongviec + "/" + idnv.idnv;

    //    axios.delete(apiUrl, { idcongviec: idcongviec.idcongviec, idnv: idnv.idnv })
    //        .then((res) => {
    //            this.setState({
    //                showAlert: false
    //            });
    //            this.refresh();

    //        });
    //}


    render() {
       
    
        return (
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Danh sách công việc được giao</CardTitle>
                               
                            </CardHeader>
                            <CardBody>
                                <Table responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Mã công việc</th>
                                            <th>Nội dung</th>
                                            <th>Tên nhân viên</th>
                                         
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.xulycongviec.map((xlcv, nv) =>
                                                <tr key={xlcv.idcongviec} nv={nv}>
                                                    <td>{xlcv.idcongviec}</td>
                                                    <td>{xlcv.tieude}</td>
                                                    <td>{xlcv.hoten}</td>

                                                    <td>

                                                        
                                                    </td>

                                                </tr>
                                            )
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
export default XuLyCongViec;