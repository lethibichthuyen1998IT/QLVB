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
import axios from 'axios';
import Search from 'components/Search';

import SweetAlert from 'sweetalert-react';

class DanhMucVaiTro extends React.Component {
    static displayName = DanhMucVaiTro.name;

    constructor(props) {

        super(props);
        this.state = {
            vaitro: [],
            source: [],
            showAlert: false,
            newvaitro: {
                Tenvaitro: ''
            },
            editData: {
                idvaitro: '',
                tenvaitro: ''

            },
            Macn: '',
            Mavt: '',
           
            nv: [],
            quyen:[],
            chucnang: [],
            modalAdd: false,
            editModal: false,
            valueSearch: '',
            isChecked:false
        };

        // This binding is necessary to make "this" work in the callback  


        this._refresh = this._refresh.bind(this);
        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deletevaitro = this.deletevaitro.bind(this);
        this.addQuyen = this.addQuyen.bind(this);
        this.deleteQuyen = this.deleteQuyen.bind(this);
    
        this.isChange = this.isChange.bind(this);
    }


    //list
    componentDidMount() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            nv: nvs
        });
        axios.get('/vaitros')
            .then((res) => this.setState({
                vaitro: res.data,
                source: res.data,
                showAlert: false
                })
            );

        axios.get('/chucnangs')
            .then((res) => this.setState({
                chucnang: res.data,
               
                showAlert: false
            })

            );
        axios.get('/quyens')
            .then((res) => this.setState({
                quyen: res.data,
                
                showAlert: false
            })
            );

    }

    

    //add
    toggleNewvaitroModal() {
        this.setState({
            modalAdd: !this.state.modalAdd
        })
    }

    addvaitro() {

        axios.post('/vaitros', {
            TENVAITRO: this.state.newvaitro.Tenvaitro
        })
            .then((response) => {
                alert("Thêm thành công!");
                this.setState({
                    newvaitro: {
                        Tenvaitro: ''
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
    //Quyen
   

    addQuyen() {
      
        axios.post('/quyens', {
            IDVAITRO: this.state.Mavt,
            IDCN: this.state.Macn
        })
            .then((response) => {                          
                this.refresh();
            });

    }

    deleteQuyen = (idvt, idcn) => {

        const apiUrl = '/quyens/' + this.state.Mavt.trim() + "/" + this.state.Macn.trim() ;
      
        axios.delete(apiUrl, { idvt: this.state.Mavt.trim(), idcn: this.state.Macn.trim() })
            .then((res) => {              
                
                this.refresh();
              
            });

    }
   
    //Checkbox
    isChange = (e) => {
        var dt = document.getElementById(e.target.name + e.target.value);
        
        this.state.Macn = e.target.value;
        this.state.Mavt = e.target.name;

        if (!dt.checked === false) {   
            this.addQuyen();         
        }
        else {
            this.deleteQuyen({ idvt: this.state.Mavt, idcn: this.state.Macn });;  
        }
       
    }
    refresh() {
        axios.get('/quyens')
            .then((res) => this.setState({
                quyen: res.data,
                showAlert: false
            }));
    }
    //refresh
    _refresh() {
        axios.get('/vaitros')
            .then((res) => this.setState({
                vaitro: res.data,
                showAlert: false
            }));
    }
    deletevaitro = (idvaitro) => {
        const apiUrl = '/vaitros/' + idvaitro.idvaitro;
        axios.delete(apiUrl, { idvaitro: idvaitro.idvaitro })
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

    edit(idvaitro, tenvaitro) {
        this.setState({
            editData: { idvaitro, tenvaitro },
            editModal: !this.state.editModal

        });
        console.log(idvaitro);
    }

    updatevaitro() {
        let { idvaitro, tenvaitro } = this.state.editData;
        axios.put('/vaitros/' + this.state.editData.idvaitro, {
            idvaitro, tenvaitro
        }).then((response) => {

            this.setState({
                editModal: false,
                editData: {
                    idvaitro: '',
                    tenvaitro: ''

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
                if (item.idvaitro.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenvaitro.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            vaitro: newArray,
            valueSearch: search
        });
    }
  
    
    render() {

        const { vaitro } = this.state;
        //Quyền
        const { nv, quyen, chucnang} = this.state;
        let rules = [];
        quyen.forEach((e) => {
            if (e.idvaitro.trim() === nv.idvaitro.trim())
                rules.push(e.idcn);
        });
        const name = "Quản lý vai trò";
        let cns = [];
        chucnang.forEach((x) => {
            if (x.tencn.toLowerCase() === name.toLowerCase())
                cns.push(x.idcn);
        });
     
        return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4">Vai trò</CardTitle>
                                    <CardTitle>
                                        <Row md="12">
                                            {
                                                (rules.find(x => x == cns)) ?
                                                    <Col md="4">
                                                        <Button color="primary" onClick={this.toggleNewvaitroModal.bind(this)}>{(this.state.modalAdd) ? 'Đóng' : 'Thêm vai trò'}</Button>
                                                    </Col>
                                                    :null
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
                                                            <Input value={this.state.newvaitro.Tenvaitro} onChange={(e) => {
                                                                let { newvaitro } = this.state;
                                                                newvaitro.Tenvaitro = e.target.value;
                                                                this.setState({ newvaitro });
                                                            }}
                                                                placeholder="Nhập vai trò" />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="7">
                                                        <Button color="primary" disabled={!(this.state.newvaitro.Tenvaitro.length > 0)} onClick={this.addvaitro.bind(this)}>Thực hiện lưu</Button>{' '}
                                                        <Button color="danger" onClick={this.toggleNewvaitroModal.bind(this)}>Hủy bỏ</Button>
                                                    </Col>
                                                </Form>
                                            }
                                        </Row>

                                    </CardTitle>


                                </CardHeader>
                                <CardBody>
                                    <Table id="dataTable" className="table table-hover">
                                        <thead className="text-primary">
                                            <tr>
                                                <th>Mã</th>
                                                <th>Vai trò</th>
                                                <th>Chức năng</th>
                                                {

                                                    (rules.find(x => x == cns)) ?
                                                        <th>Thao tác</th>
                                                        : null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                vaitro.map((vt) => {
                                                    return (

                                                        <tr key={vt.idvaitro}>
                                                            <td>{vt.idvaitro}</td>
                                                            <td>{vt.tenvaitro}</td>

                                                            <td>
                                                                {
                                                                    chucnang.map((cn) =>

                                                                        <ul key={cn.idcn} style={{ listStyle: 'none' }}>
                                                                            {
                                                                                
                                                (rules.find(x => x == cns)) ?
                                                                                (quyen.find(x => x.idvaitro == vt.idvaitro && x.idcn == cn.idcn)) ?
                                                                                        <li key={vt.idvaitro, cn.idcn}>
                                                                                            <Input id={vt.idvaitro + cn.idcn} type="checkbox" name={vt.idvaitro} onChange={(e) => this.isChange(e)} checked={true} value={cn.idcn} />
                                                                                        {cn.tencn}
                                                                                    </li>
                                                                                    :
                                                                                    <li key={vt.idvaitro, cn.idcn}>
                                                                                        <Input id={vt.idvaitro + cn.idcn} type="checkbox" name={vt.idvaitro} onChange={(e) => this.isChange(e)} checked={false} value={cn.idcn} />
                                                                                        {cn.tencn}
                                                                                        </li>
                                                                                    :
                                                                                    (quyen.find(x => x.idvaitro == vt.idvaitro && x.idcn == cn.idcn)) ?
                                                                                        <li key={vt.idvaitro, cn.idcn}>
                                                                                            <Input id={vt.idvaitro + cn.idcn} type="checkbox" name={vt.idvaitro} onChange={(e) => this.isChange(e)} checked={true} value={cn.idcn} disabled />
                                                                                            {cn.tencn}
                                                                                        </li>
                                                                                        :
                                                                                        <li key={vt.idvaitro, cn.idcn}>
                                                                                            <Input id={vt.idvaitro + cn.idcn} type="checkbox" name={vt.idvaitro} onChange={(e) => this.isChange(e)} checked={false} value={cn.idcn} disabled />
                                                                                            {cn.tencn}
                                                                                        </li>
                                                                            }
                                                                        </ul>
                                                                    )
                                                                }
                                                            </td>
                                                            {
                                                                (rules.find(x => x == cns)) ?
                                                                    <td>


                                                                        <Button color="success" size="sm" className="mr-2" onClick={this.edit.bind(this, vt.idvaitro, vt.tenvaitro)}>Chỉnh sửa</Button>

                                                                        <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                            <ModalHeader toggle={this.toggleEditModal.bind(this)}>Chỉnh sửa</ModalHeader>
                                                                            <ModalBody>
                                                                                <Form>

                                                                                    <FormGroup>
                                                                                        <Label for="tenvaitro">Vai trò</Label>
                                                                                        <Input id="tenvaitro" value={this.state.editData.tenvaitro} onChange={(e) => {
                                                                                            let { editData } = this.state;
                                                                                            editData.tenvaitro = e.target.value;
                                                                                            this.setState({ editData });
                                                                                        }} />
                                                                                    </FormGroup>
                                                                                </Form>
                                                                            </ModalBody>
                                                                            <ModalFooter>
                                                                                <Button color="primary" disabled={!(this.state.editData.tenvaitro.length > 0)} onClick={this.updatevaitro.bind(this)}>Thực hiện lưu</Button>
                                                                                <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                            </ModalFooter>
                                                                        </Modal>
                                                                        <Button
                                                                            type="button" className="btn btn-danger btn-sm"
                                                                            onClick={() => this.handleShowAlert({ id: vt })}>
                                                                            Xóa
                                                                     </Button>
                                                                        <SweetAlert
                                                                            show={this.state.showAlert}

                                                                            title="Xóa"
                                                                            html
                                                                            text={"Bạn có muốn xóa vai trò " + vt.tenvaitro + " không?"}

                                                                            showCancelButton
                                                                            onOutsideClick={() => this.setState({ showAlert: false })}
                                                                            onEscapeKey={() => this.setState({ showAlert: false })}
                                                                            onCancel={() => this.setState({ showAlert: false })}
                                                                            onConfirm={() => this.deletevaitro({ idvaitro: vt.idvaitro })}

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

export default DanhMucVaiTro;
