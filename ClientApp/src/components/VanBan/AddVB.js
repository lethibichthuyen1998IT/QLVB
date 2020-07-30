import React from 'react';
import axios from 'axios';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button,
    Input, Label, Form, FormGroup
} from "reactstrap";
class AddVB extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newvb: {
                idvb: '',
                idph: '',
                idloai: '',
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
            
            }
  

        this.handleCancel = this.handleCancel.bind(this);  
     
      
    }
    componentDidMount() {
        axios.get('/Vanbans')
            .then((res) => this.setState({
                empList: res.data,
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
  

  
    AddVB() {
        axios.post('/Vanbans', {
            IDVB: this.state.newvb.idvb,
            IDPH: this.state.newvb.idph,
            IDLOAI: this.state.newvb.idloai,
            SOVB: this.state.newvb.sovb,
            TRICHYEU: this.state.newvb.trichyeu,
            FILE: this.state.newvb.file,
            NGAYKY: this.state.newvb.ngayky,
            NGAYGOI: this.state.newvb.ngaygoi,
            NGAYNHAN: this.state.newvb.ngaynhan,
            NGUOIKY: this.state.newvb.nguoiky
        }).then((response) => {
            alert("Lưu thành công!");
            this.setState({
                newvb: {
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
                ListLoai: [],
                ListPH: [],
                
            });
           

        })
            .catch((error) => {
                console.log(error.response);
                alert(error);
            });

    }

     handleChange = (e) =>{
        this.setState({ [e.target.name]: e.target.value });
    }

     handleCancel(e) {
        e.preventDefault();
        this.props.history.push('index');
    }  

  
  
    render() {
        return (
            <div className="content">
                
                <Form onSubmit={this.AddVB.bind(this)}>
                    <Table>
                        <tr>
                            <td width="250px">
                        <Label for="sovb">Văn bản số: </Label>

                                <Input className="form-control" required id="sovb" type="text" maxLength="15" value={this.state.newvb.sovb} onChange={(e) => {
                            let { newvb } = this.state;
                            newvb.sovb = e.target.value;
                            this.setState({ newvb });
                        }} />
                   </td>
                            <td width="250px">
                                <Label for="ngayky">Ngày ký: </Label>
                                <Input className="form-control" required id="ngayky" type="date"
                                    value={this.state.newvb.ngayky}
                                    onChange={(e) => {
                                        let { newvb } = this.state;
                                        newvb.ngayky = e.target.value;
                                        this.setState({ newvb });
                                    }} />
                       
                            </td>
                            </tr>

                   <tr>
                        <td>
                        <Label for="idloai">Loại văn bản: </Label>
                                <Input className="form-control" required  type="select" id="idloai" value={this.state.newvb.idloai} onChange={(e) => {
                            let { newvb } = this.state;
                            newvb.idloai = Number.parseInt(e.target.value);
                            this.setState({ newvb });
                        }} >
                            <option value='0'>-- Chọn Loại --</option>
                            {this.state.ListLoai.map((loaivanban) =>
                                <option key={loaivanban.idloai} value={loaivanban.idloai}>{loaivanban.tenloai}</option>
                            )
                            }

                                    </Input>
                                </td>
                            <td><Label for="ngaygoi">Ngày gởi: </Label>

                                <Input className="form-control" required  id="ngaygoi" type="date" value={this.state.newvb.ngaygoi} onChange={(e) => {
                                    let { newvb } = this.state;
                                    newvb.ngaygoi = e.target.value;
                                    this.setState({ newvb });
                                }} /></td>
                            </tr>
                                <tr>
                                    <td>
                                        <Label for="idphathanh">Nơi phát hành: </Label>
                                <Input className="form-control" required  type="select" id="idph" value={this.state.newvb.idph} onChange={(e) => {
                                            let { newvb } = this.state;
                                            newvb.idph = e.target.value;
                                            this.setState({ newvb });
                                        }} >
                                            <option value="">-- Chọn nơi phát hành --</option>
                                            {

                                                this.state.ListPH.map((noiphathanh) =>
                                                    <option key={noiphathanh.idph} value={noiphathanh.idph}>{noiphathanh.tenph}</option>
                                                )

                                            }
                                    </Input>
                                </td>
                           
                          
                                <td>
                                    <Label for="ngaynhan">Ngày nhận: </Label>

                                <Input required className="form-control" id="ngaynhan" type="date" value={this.state.newvb.ngaynhan} onChange={(e) => {
                                        let { newvb } = this.state;
                                        newvb.ngaynhan = e.target.value;
                                        this.setState({ newvb });
                                    }} />
                                </td>
                        </tr>
                        <tr>
                            <td> <Label for="nguoiky">Người ký: </Label>
                                <Input className="form-control" required id="nguoiky" type="text" value={this.state.newvb.nguoiky} onChange={(e) => {
                                let { newvb } = this.state;
                                newvb.nguoiky = e.target.value;
                                this.setState({ newvb });
                            }} />

                               </td>
                            
                        </tr>
                    
                        <tr>
                            <td colSpan="2">
                                <Label for="trichyeu">Trích yếu: </Label>
                                <div className="col-md-9">
                                    <Input className="form-control" type="textarea" id="trichyeu" value={this.state.newvb.trichyeu} onChange={(e) => {
                            let { newvb } = this.state;
                            newvb.trichyeu = e.target.value;
                            this.setState({ newvb });
                                    }} />
                                    </div>
                            </td>
                            </tr>
                     
                     
                        <tr>
                            <td>
                        <Label for="file">File đính kèm:</Label>

                                <Input required  id="file" type="file" value={this.state.newvb.file} onChange={(e) => {
                            let { newvb } = this.state;
                            newvb.file = e.target.value;
                            this.setState({ newvb });
                                }} />
                            </td>
                        </tr>
                        <hr />
                        <tr>
                            <td>Gửi đến:
                             
                                 <FormGroup check inline>
                                <Label check for="canhan">
                                   <Input
                                        id="canhan"
                                        value="canhan"
                                        name="nguoinhan"
                                            type="radio"
                                            defaultChecked
                                        onChange={this.handleChange}
                                       
                                    />Cá nhân 
                                </Label>
                                <Label for="donvi" check>
                                  <Input
                                        id="donvi"
                                        value="donvi"
                                        name="nguoinhan"
                                        type="radio"
                                        onChange={this.handleChange}
                                    />Đơn vị
                                </Label>
                                <Label for="moinguoi" check>
                              <Input
                                        id="moinguoi"
                                        value="moinguoi"
                                        name="nguoinhan"
                                        type="radio"
                                        onChange={this.handleChange}
                                    />Mọi người 
                                </Label>
                                </FormGroup>
                            </td>
                        </tr>
                   
               
                        <tr>
                            <td align="right">
                            <Button type="submit" color="primary" >Lưu lại </Button> &nbsp;
                    <Button color="secondary" onClick={this.handleCancel.bind(this)}>Bỏ qua</Button>
                                </td>
                </tr>
                    </Table>
                    </Form>
               
            </div>

        )
    }
}
export default AddVB;