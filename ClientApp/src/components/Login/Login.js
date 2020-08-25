import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import {
    Button,
    Input, Label, Form, FormGroup, Card,
    CardHeader,
    CardBody,
    CardTitle,

    Alert
} from "reactstrap";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", nhanvien:[], errors:"" };
        
        this.handleForm = this.handleForm.bind(this);
    }
    componentDidMount() {

        axios.get('/nhanviens')
            .then((res) => this.setState({
                nhanvien: res.data,
                errors:'',
                showAlert: false,
               
            })

            );
    }
    handleForm = (e) => {
        e.preventDefault();
        const { nhanvien } = this.state;

        
            axios.post("/users/authenticate", { USERNAME: this.state.username, PASSWORD: this.state.password })
                .then(res => {
                    //cookie.set("token", res.data.access_token);
                    //this.props.setLogin(res.data.nhanvien);
                    localStorage.setItem('user', JSON.stringify(res.data));
                    this.props.history.push("/admin/dashboard");
                    this.setState({ errors: "" });
                }).catch(e => { this.setState({ errors: "Sai tài khoản hoặc mật khẩu" }) });
        
        
        
    };
   
    render() {
        
        const { username, password, errors } = this.state;
        return (
            
            <div className="wrapper bg-info mh-100">

                <div className="d-flex justify-content-center" style={{ paddingTop: '200px' }}>
                    <Card className="w-25">
                        <CardHeader className="bg-success text-light">
                            <CardTitle tag="h3" align="center">Đăng nhập thành viên</CardTitle>
                        </CardHeader>
                        <CardBody>
                            <Form onSubmit={(e) => this.handleForm(e)}>
                                    {
                                    (errors) ?
                                        <Alert color="danger">{errors}</Alert>
                                        :
                                        null
                                    }
                                <FormGroup className="input-group">
                                    <div className="input-group-prepend bg-warning" style={{ width:'40px' }}>
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                  
                                <Input
                                    className="form-control"                                   
                                    type="username"
                                    name="username"
                                    placeholder="Nhập tài khoản"
                                    value={username}
                                    onChange={(e) => this.setState({ username: e.target.value})}
                                    
                                />

                            </FormGroup>
                                <FormGroup className="input-group">
                                    <div className="input-group-prepend bg-warning" style={{ width: '40px' }}>
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                <Input
                                    className="form-control"
                                    required
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={(e) => this.setState({ password: e.target.value })}
                                    placeholder="**********"
                                   
                                />

                            </FormGroup>
                            <FormGroup className="mt-4">
                                <Button block
                                    type="submit"
                                    color="success"
                                    disabled={!(password.length > 0 && username.length > 0)}>
                                    Đăng nhập
                                </Button>
                            </FormGroup>
                        
                            </Form>
                        </CardBody>
                    </Card>
                </div>
              
                </div>
            
        );
    }
}

export default Login;
