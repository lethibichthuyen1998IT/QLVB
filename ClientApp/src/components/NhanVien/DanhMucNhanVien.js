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

class DanhMucNhanVien extends React.Component {
    static displayName = DanhMucNhanVien.name;
  
    constructor(props) {
        
        super(props);
        this.state = {
            nhanvien: [],
            source:[],
            showAlert: false,  
            newnv: {            
                Iddonvi: 0,
                Idvaitro: '',
                Hoten: '',
                Sdt: '',
                Ngaysinh: '',
                Diachi: '',
                Username: '',
                Password: ''
            },
            editData: {
                idnv: 0,
                iddonvi: 0,
                idvaitro: '',
                hoten: '',
                ngaysinh: '',
                sdt: '',              
                diachi: '',
              
            },
            donvi: [],           
            vaitro: [],
            modalAdd: false,
            editModal: false,
            valueSearch: ''
           
        };
       
        // This binding is necessary to make "this" work in the callback  
     
     
        this._refresh = this._refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteNhanVien = this.deleteNhanVien.bind(this);
         
    }


     //list
     componentDidMount() {
        
         axios.get('/nhanviens')
             .then((res) => this.setState({
                 nhanvien: res.data,
                 source: res.data,
                 showAlert: false
             })
      
            );
        
         axios.get('/donvis')
             .then((res) =>
                 this.setState({
                     donvi: res.data
                 }));

         axios.get('/vaitros')
             .then((res) =>
                 this.setState({
                     vaitro: res.data
                 }));

     }

     //add
     toggleNewNhanVienModal() {
         this.setState({
             modalAdd: !this.state.modalAdd
         })
     }

     addNV() {

         axios.post('/nhanviens', {
             IDDONVI: this.state.newnv.Iddonvi,
             IDVAITRO: this.state.newnv.Idvaitro,
             HOTEN: this.state.newnv.Hoten,
             SDT: this.state.newnv.Sdt,
             NGAYSINH: this.state.newnv.Ngaysinh,
             DIACHI: this.state.newnv.Diachi,
             USERNAME: this.state.newnv.Username,
             PASSWORD: this.state.newnv.Password
         })
             .then((response) => {
                 alert("Thêm thành công!");
                 this.setState({
                     newnv: {
                         
                         Iddonvi: 0,
                         Idvaitro: '',
                         Hoten: '',
                         Sdt: '',
                         Ngaysinh: '',
                         Diachi: '',
                         Username: '',
                         Password: ''
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
         axios.get('/nhanviens')
             .then((res) => this.setState({
                 nhanvien: res.data,
                 showAlert: false
             }));
     }
     deleteNhanVien = (idnv) => {
     
         const apiUrl = '/nhanviens/' + idnv.idnv; 
        

         axios.delete(apiUrl, { idnv: idnv.idnv })
             .then((res) => {
                 alert("Xóa thành công!");
                 this._refresh();
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

     //edit
     toggleEditModal() {
         this.setState({
             editModal: !this.state.editModal
         });
     }

     edit(idnv, iddonvi, idvaitro, hoten, ngaysinh, sdt, diachi) {
         this.setState({
             editData: { idnv, iddonvi, idvaitro, hoten, ngaysinh, sdt, diachi },
             editModal: !this.state.editModal

         });
         console.log(idnv);
     }

     updateNV() {
         let { idnv, iddonvi, idvaitro, hoten, ngaysinh, sdt, diachi } = this.state.editData;
         axios.put('/nhanviens/' + this.state.editData.idnv, {
           idnv, iddonvi, idvaitro, hoten, ngaysinh, sdt, diachi
         }).then((response) => {
            
             this.setState({
                 editModal: false,
                 editData: {
                     idnv: 0,
                     iddonvi: 0,
                     idvaitro: '',
                     hoten: '',
                     ngaysinh: '',
                     sdt: '',
                     diachi: '',

                 },
                
             });
             this._refresh();
             //console.log(response.data);
         });

     }
     //search
     handleSearch = (search) => {

         let sourceArray = this.state.source;
        
         let newArray = [];
         if (search.length <= 0) {
             newArray = sourceArray;
         } else
         {
             
             console.log(search);
             for (let item of sourceArray) {
                 console.log(item);
                 if (item.hoten.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.manv.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tendonvi.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenvaitro.toLowerCase().indexOf(search.toLowerCase()) > -1)
                 {
                     newArray.push(item);                     
                 }
             }
            
         }
       
         this.setState({
             nhanvien: newArray,
             valueSearch: search
         }); 
     }
     
     render() {

         const { nhanvien} = this.state;
       
             return (
                 <>

                     <div className="content">
                     
                         <Row>
                             <Col md="12">
                                 <Card>
                                     <CardHeader>

                                         <CardTitle tag="h4">Nhân Viên</CardTitle>
                                         <CardTitle>
                                             <Row md="12">
                                                 <Col md="4">
                                                     <Button color="primary" onClick={this.toggleNewNhanVienModal.bind(this)}>Thêm nhân viên</Button>
                                                 </Col>
                                             <Col md="4">
                                                     <Search
                                                         valueSearch={this.state.valueSearch}
                                                         handleSearch={this.handleSearch} />
                                                 </Col>
                                                
                                               
                                            </Row>
                                         </CardTitle>
                                        
                                         <Modal isOpen={this.state.modalAdd} toggle={this.toggleNewNhanVienModal.bind(this)}>
                                             <ModalHeader toggle={this.toggleNewNhanVienModal.bind(this)}>Thêm nhân viên mới</ModalHeader>
                                             <ModalBody>
                                                 <Form>
                                                     <Row>
                                                         <Col className="pr-1" md="6">
                                                     <FormGroup>
                                                         <Label for="iddonvi">Đơn vị</Label>
                                                         <Input type="select" id="iddonvi" value={this.state.newnv.Iddonvi} onChange={(e) => {
                                                             let { newnv } = this.state;
                                                             newnv.Iddonvi = Number.parseInt(e.target.value);
                                                             this.setState({ newnv });
                                                         }} >
                                                             <option value='0' >--Chọn đơn vị--</option>
                                                             {
                                                                         this.state.donvi.map((dv) =>
                                                                             <option key={dv.iddonvi} value={dv.iddonvi}>{dv.tendonvi}</option>)
                                                             }
                                                         </Input>
                                                             </FormGroup>
                                                         </Col>
                                                         <Col className="pl-1" md="6">
                                                     <FormGroup>
                                                         <Label for="idvaitro">Vai trò</Label>
                                                         <Input type="select" id="idvaitro" value={this.state.newnv.Idvaitro} onChange={(e) => {
                                                             let { newnv } = this.state;
                                                             newnv.Idvaitro = e.target.value;
                                                             this.setState({ newnv });
                                                         }}>
                                                             <option value='' >--Chọn vai trò--</option>
                                                             {
                                                                 this.state.vaitro.map((vt) =>
                                                                     <option key={vt.idvaitro} value={vt.idvaitro}>{vt.tenvaitro}</option>)
                                                             }
                                                             </Input>
                                                             </FormGroup>
                                                         </Col>
                                                     </Row>
                                                     <Row>
                                                         <Col md="12">
                                                     <FormGroup>
                                                                 <Label for="hoten">Họ tên</Label>
                                                                 <Input id="hoten" required value={this.state.newnv.Hoten} onChange={(e) => {
                                                             let { newnv } = this.state;
                                                             newnv.Hoten = e.target.value;
                                                             this.setState({ newnv });
                                                         }} placeholder="Nhập họ tên" />
                                                             </FormGroup>
                                                         </Col>
                                                     </Row>
                                                     <Row>
                                                         <Col className="pr-1" md="6">
                                                     <FormGroup>
                                                                 <Label for="sdt">Số điện thoại</Label>
                                                                 <Input id="sdt" value={this.state.newnv.Sdt} onChange={(e) => {
                                                             let { newnv } = this.state;
                                                             newnv.Sdt = e.target.value;
                                                             this.setState({ newnv });
                                                         }}placeholder="Nhập số điện thoại" />
                                                             </FormGroup>
                                                         </Col>
                                                         <Col className="pl-1" md="6">
                                                     <FormGroup>
                                                         <Label for="ngaysinh">Ngày sinh</Label>
                                                         <Input type="date" id="ngaysinh" value={this.state.newnv.Ngaysinh} onChange={(e) => {
                                                             let { newnv } = this.state;
                                                             newnv.Ngaysinh = e.target.value;
                                                             this.setState({ newnv });
                                                         }} />
                                                             </FormGroup>
                                                         </Col>
                                                     </Row>
                                                     <Row>
                                                         <Col md="12">
                                                         <FormGroup>
                                                            
                                                         <Label for="diachi">Địa chỉ</Label>
                                                         <Input type="textarea" id="diachi" value={this.state.newnv.Diachi} onChange={(e) => {
                                                             let { newnv } = this.state;
                                                             newnv.Diachi = e.target.value;
                                                             this.setState({ newnv });
                                                         }} />
                                                     </FormGroup>
                                                         </Col>
                                                     </Row>
                                                     <Row>
                                                         <Col className="pr-1" md="6">
                                                     <FormGroup>
                                                                 <Label for="username">Tài khoản</Label>
                                                                 <Input id="username" value={this.state.newnv.Username} onChange={(e) => {
                                                             let { newnv } = this.state;
                                                             newnv.Username = e.target.value;
                                                             this.setState({ newnv });
                                                         }} placeholder="Nhập tài khoản" />
                                                             </FormGroup>
                                                         </Col>
                                                         <Col className="pl-1" md="6">
                                                     <FormGroup>
                                                                 <Label for="password">Mật khẩu</Label>
                                                                 <Input type="password" value={this.state.newnv.Password} onChange={(e) => {
                                                             let { newnv } = this.state;
                                                             newnv.Password = e.target.value;
                                                             this.setState({ newnv });
                                                         }} id="password" placeholder="Nhập mật khẩu" />
                                                             </FormGroup>
                                                         </Col>
                                                         </Row>
                                                 </Form>
                                             </ModalBody>
                                             <ModalFooter>
                                                 <Button color="primary" onClick={this.addNV.bind(this)}>Thực hiện lưu</Button>{' '}
                                                 <Button color="danger" onClick={this.toggleNewNhanVienModal.bind(this)}>Hủy bỏ</Button>
                                             </ModalFooter>
                                         </Modal>
                                     </CardHeader>
                                     <CardBody>
                                         <Table className="table table-hover">
                                             <thead className="text-primary">
                                                 <tr>
                                                     <th>Mã nhân viên</th>
                                                     <th>Đơn vị</th>
                                                     <th>Vai trò</th>
                                                     <th>Họ tên</th>
                                                     <th>Địa chỉ</th>
                                                     <th>Ngày sinh</th>
                                                     <th>Thao tác</th>
                                                 </tr>
                                             </thead>
                                             <tbody>
                                                 {
                                                     nhanvien.map((nv) => {
                                                         return (

                                                             <tr key={nv.idnv}>
                                                                 <td>{nv.manv}</td>
                                                                 <td>{nv.tendonvi}</td>
                                                                 <td>{nv.tenvaitro}</td>
                                                                 <td>{nv.hoten}</td>
                                                                 <td>{nv.diachi}</td>
                                                                 <td>{moment(nv.ngaysinh).format("DD-MM-YYYY")}</td>
                                                                 <td>
                                                                     

                                                                     <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, nv.idnv, nv.iddonvi, nv.idvaitro, nv.hoten, nv.ngaysinh, nv.sdt, nv.diachi)}>Edit</Button>

                                                                     <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                         <ModalHeader toggle={this.toggleEditModal.bind(this)}>Edit</ModalHeader>
                                                                         <ModalBody>
                                                                             <Form>
                                                                                 <Row>
                                                                                     <Col className="pr-1" md="6">
                                                                             <FormGroup>
                                                                                     <Label for="iddonvi">Đơn vị</Label>
                                                                                     <Input type="select" id="iddonvi" value={this.state.editData.iddonvi} onChange={(e) => {
                                                                                         let { editData } = this.state;
                                                                                         editData.iddonvi = Number.parseInt(e.target.value);
                                                                                         this.setState({ editData });
                                                                                 }}>
                                                                                     <option value='0' >--Chọn đơn vị--</option>
                                                                                     {
                                                                                         this.state.donvi.map((dv) =>
                                                                                             <option key={dv.iddonvi} value={dv.iddonvi}>{dv.tendonvi}</option>)
                                                                                     }
                                                                                 </Input>
                                                                                         </FormGroup>
                                                                                     </Col>
                                                                                     <Col className="pl-1" md="6">
                                                                             <FormGroup>
                                                                                     <Label for="idvaitro">Vai trò</Label>
                                                                                     <Input type="select" id="idvaitro" value={this.state.editData.idvaitro} onChange={(e) => {
                                                                                         let { editData } = this.state;
                                                                                         editData.idvaitro = e.target.value;
                                                                                         this.setState({ editData });
                                                                                 }}>
                                                                                     <option value='' >--Chọn vai trò--</option>
                                                                                     {
                                                                                         this.state.vaitro.map((vt) =>
                                                                                             <option key={vt.idvaitro} value={vt.idvaitro}>{vt.tenvaitro}</option>)
                                                                                     }
                                                                                 </Input>
                                                                                         </FormGroup>
                                                                                     </Col>
                                                                                 </Row>
                                                                                 <Row>
                                                                                     <Col md="12">
                                                                                     <FormGroup>
                                                                                      
                                                                                     <Label for="hoten">Họ tên</Label>
                                                                                     <Input id="hoten" value={this.state.editData.hoten} onChange={(e) => {
                                                                                         let { editData } = this.state;
                                                                                         editData.hoten = e.target.value;
                                                                                         this.setState({ editData });
                                                                                 }} placeholder="Nhập họ tên" />
                                                                                     </FormGroup>
                                                                                         </Col>
                                                                                 </Row>
                                                                                     
                                                                                 <Row>
                                                                                     <Col className="pr-1" md="6">
                                                                             <FormGroup>
                                                                                     <Label for="sdt">Số điện thoại</Label>
                                                                                     <Input id="sdt" value={this.state.editData.sdt} onChange={(e) => {
                                                                                         let { editData } = this.state;
                                                                                         editData.sdt = e.target.value;
                                                                                         this.setState({ editData });
                                                                                 }} placeholder="Nhập số điện thoại" />
                                                                                         </FormGroup>
                                                                                     </Col>
                                                                                     <Col className="pl-1" md="6">
                                                                             <FormGroup>
                                                                                     <Label for="ngaysinh">Ngày sinh</Label>
                                                                                     <Input type="datetime-local" id="ngaysinh" value={this.state.editData.ngaysinh} onChange={(e) => {
                                                                                         let { editData } = this.state;
                                                                                         editData.ngaysinh = e.target.value;
                                                                                         this.setState({ editData });
                                                                                 }} />
                                                                                         </FormGroup>
                                                                                     </Col>
                                                                                 </Row>
                                                                                 <Row>
                                                                                     <Col md="12">
                                                                             <FormGroup>
                                                                                     <Label for="diachi">Địa chỉ</Label>
                                                                                     <Input type="textarea" id="diachi" value={this.state.editData.diachi} onChange={(e) => {
                                                                                         let { editData } = this.state;
                                                                                         editData.diachi = e.target.value;
                                                                                         this.setState({ editData });
                                                                                 }} />
                                                                                         </FormGroup>
                                                                                     </Col>
                                                                                 </Row>
                                                                             </Form>
                                                                         </ModalBody>
                                                                         <ModalFooter>
                                                                             <Button color="primary" onClick={this.updateNV.bind(this)}>Thực hiện lưu</Button>
                                                                             <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                         </ModalFooter>
                                                                     </Modal>
                                                                     <Button
                                                                         type="button" className="btn btn-danger btn-sm"
                                                                         onClick={() => this.handleShowAlert({ id: nv })}>
                                                                         Delete
                                                                     </Button>
                                                                     <SweetAlert
                                                                         show={this.state.showAlert}

                                                                         title="Xóa"
                                                                         html
                                                                         text={"Bạn có muốn xóa nhân viên " + nv.hoten +" (" + nv.manv + ") không?"}
                                                                                                                                                
                                                                         showCancelButton
                                                                         onOutsideClick={() => this.setState({ showAlert: false })}
                                                                         onEscapeKey={() => this.setState({ showAlert: false })}
                                                                         onCancel={() => this.setState({ showAlert: false })}
                                                                         onConfirm={() => this.deleteNhanVien({ idnv: nv.idnv })}
                                                                        
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

export default DanhMucNhanVien;
