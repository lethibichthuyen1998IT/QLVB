import React from 'react';
import axios from 'axios';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

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
var date = new Date();
class AddVB extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newvb: {
              
                idph: '',
                idloai: '',
                sovb: '',
                trichyeu: '',
               file:'',
                ngayky: '',
                ngaygoi: date,
                ngaynhan: '',
                nguoiky: '',
                idnv: 14
            },
            quyenvb:
            {
               
                idnv: 14,
                quyen: 0,
                daxuly: 0

            },
                        
             ListLoai: [],
            ListPH: [],
            ListNV: [],
            ListDV: [],
            optionnv: [],
            optiondv:[],
            selectedFile: '',
            progress: 0,
            status: '',
            planet: 'moinguoi',
            planets:[],
            selected: []
          
        }
      
        this.onChange = this.onChange.bind(this);
        this.onPlanetChange = this.onPlanetChange.bind(this);
        this.handleCancel = this.handleCancel.bind(this);   
    }
    //load du lieu
    componentDidMount() {

        axios.get('/donvis')
            .then((res) =>
                this.setState({
                    ListDV: res.data,
                  
                }));
        
    
        axios.get('/nhanviens')
            .then((res) =>
                this.setState({
                    ListNV: res.data,
                   
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
    //nhan gia tri 
      handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }
    
            
    //them van ban
    AddVB() {
        axios.post('/Vanbans', {
           
            IDPH: this.state.newvb.idph,
            IDLOAI: this.state.newvb.idloai,
            SOVB: this.state.newvb.sovb,
            TRICHYEU: this.state.newvb.trichyeu,
            FILE: this.state.newvb.file,
            NGAYKY: this.state.newvb.ngayky,
            NGAYGOI: this.state.newvb.ngaygoi,
            NGAYNHAN: this.state.newvb.ngaynhan,
            NGUOIKY: this.state.newvb.nguoiky,
            IDNV: this.state.newvb.idnv
        }).then((response) => {
           
            return axios.post('/Quyenvanbans', {    
                IDNV: this.state.quyenvb.idnv, 
                QUYEN: this.state.quyenvb.quyen,
                DAXULY: this.state.quyenvb.daxuly,

            });
        })
            .then((response) => {
                alert("Phát hành văn bản thành công!");
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
                        nguoiky: '',
                        idnv: 14
                    },
                    quyenvb:
                    {
                        idquyenvb: '',
                        idnv: 14,
                        quyen: 0,
                        daxuly: 0

                    },
                    ListLoai: [],
                    ListPH: [],
                    selectedFile: '',
                    progress: 0,
                    status: ''
                });
            })
           
       
        }
     
    //them file
    selectFileHandler = (event) => {
        const fileTypes = ['application/pdf'];
        let file = event.target.files;
        console.log(`File ${file}`);
        let errMessage = [];
        if (fileTypes.every(extension => file[0].type != extension)) {
            errMessage.push(`The file ${file.type} extension is not supported`);
        } else {
            let { newvb } = this.state;
            newvb.file = event.target.value;

            this.setState({
                selectedFile: file[0],
                newvb

            }, () => this.uploadHandler());
        }
    };
    //upload file
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
                this.setState({

                    status: `Tải file lên thành công`
                });
            })
            .catch((error) => {
                this.setState({ status: `Tải lên thất bại` });
            })
    }
    //tro ve
    handleCancel(e) {
        e.preventDefault();
        this.props.history.push('index');
    }  
    //dual listbox radio
    renderPlanets() {
        const { ListNV, ListDV} = this.state;
        this.state.optiondv = ListDV.map(dv => ({
            "value": dv.iddonvi,
            "label": dv.tendonvi
             }));
        this.state.optionnv = ListNV.map(nv => ({
            "value": nv.idnv,
            "label": nv.hoten


        }));
        

        this.state.planets = {
            nhanvien: { name: 'Nhân viên', moons: this.state.optionnv },
            donvi: { name: 'Đơn vị', moons: this.state.optiondv },
            moinguoi: { name: 'Mọi người', moons: [] },

        };
        
        const { planet: selectedPlanet } = this.state;
        return Object.keys(this.state.planets).map((planet) => (
            <FormGroup check inline>
                <label key={planet} htmlFor={planet}>
                    <input
                        checked={planet === selectedPlanet}
                        id={planet}
                        name="planets"
                        type="radio"
                        value={planet}
                        onChange={this.onPlanetChange}
                    />
                    {this.state.planets[planet].name}&nbsp; &nbsp; 
                </label>
            </FormGroup>
           
        ));
        
    }

    onPlanetChange(event) {
        const planet = event.currentTarget.value;
        this.setState({
            planet
        });
    }
    onChange = (selected) => {
        this.setState({
            selected
        });
    };



    //hien thi
    render() {
        var d = new Date();
        
        const { selected, planet } = this.state;
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
                            <td>
                                <Label for="idphathanh">Nơi phát hành: </Label>
                                <Input className="form-control" required type="select" id="idph" value={this.state.newvb.idph} onChange={(e) => {
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

                            </tr>
                                <tr>
                                    
                            <td> <Label for="nguoiky">Người ký: </Label>
                                <Input className="form-control" required id="nguoiky" type="text" value={this.state.newvb.nguoiky} onChange={(e) => {
                                    let { newvb } = this.state;
                                    newvb.nguoiky = e.target.value;
                                    this.setState({ newvb });
                                }} />

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
                                <Label for="file" >File đính kèm:</Label>

                                <Input required className="upload" id="file" type="file" value={this.state.newvb.file} onChange={this.selectFileHandler.bind(this)} /> 
                                <br/>
                                <div>{this.state.progress}%</div>

                                <div>{this.state.status}</div>  
                 
                            </td>

                          
                                
                                
                        </tr>    
                            <div className="restrict-available-container">
                                <div className="moons">
                                Gửi đến:&nbsp;  {this.renderPlanets()}  
                            </div>
                          
                     
                        <DualListBox
                               
                            options={this.state.planets[planet].moons}
                                selected={selected}
                            onChange={this.onChange}
                        />
          
                            </div>
                                <tr>
                            <td align="right">
                            <Button type="submit" color="primary" >Gửi </Button> &nbsp;
                    <Button color="secondary" onClick={this.handleCancel.bind(this)}>Thoát</Button>
                                </td>
                                </tr>
                    </Table>
                    </Form>
               
            </div>
              
        )
      
        }
    
}
export default AddVB;