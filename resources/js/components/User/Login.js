import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import auth from './Auth';
import { Form, Button } from 'react-bootstrap';

class Login extends Component {
     constructor(props){
        super(props);
        this.state = {
            email : '',
            password: ''
        }
     }

     onSubmit(e){
        e.preventDefault();
        const {email , password} = this.state ;
        axios.post('api/login', {
            email, 
            password
          })
          .then(response=> {
            sessionStorage.setItem("userEmail", this.state.email);
            this.setState({
                err: false
            });
            auth.login();
          })
          .catch(error=> {
            sessionStorage.setItem("authed", "false");
            sessionStorage.removeItem("userEmail");
            this.refs.email.value="";
            this.refs.password.value="";
            this.setState({err: true});
          });
     }

     onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
     }

	render() {
        let error = this.state.err ;
        let msg = (!error) ? 'Login Successful' : 'Wrong Credentials' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;

        if (sessionStorage.getItem("authed") === "true") 
            return <Redirect to="/"/>

	    return (
            <div className="container pt-4 pb-4">
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">
                        <div className="panel panel-default">
                            <h5 className="panel-heading pb-2">Login</h5>
                            <div className="panel-body">   
                                <div className="col-md-offset-2 col-md-8 col-md-offset-2">
                                    {error != undefined && <div className={name} role="alert">{msg}</div>}
                                </div>  
                                <Form onSubmit={this.onSubmit.bind(this)}>
                                    <Form.Group>
                                        <Form.Label htmlFor="email" className="col-md-4">E-Mail Address</Form.Label>
                                        <div className="col-md-6">
                                            <Form.Control id="email" type="email" ref="email" name="email"  onChange={this.onChange.bind(this)} required />
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label htmlFor="password" className="col-md-4">Password</Form.Label>
                                        <div className="col-md-6">
                                            <Form.Control id="password" type="password" ref="password" name="password"  onChange={this.onChange.bind(this)}  required />
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <div className="col-md-6 col-md-offset-4">
                                            <div className="checkbox">
                                                <label>
                                                    <input type="checkbox" name="remember" /> Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group>
                                        <div className="col-md-8 col-md-offset-4">
                                            <Button type="submit">
                                                Login
                                            </Button>
                                            <li className="btn btn-link">
                                                <Link to = "forgotpassword">Forgot Your Password?</Link>
                                            </li>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

