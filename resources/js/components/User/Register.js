import React, { Component } from 'react'
import auth from './Auth';
import { Redirect } from 'react-router-dom';
import { Form } from 'react-bootstrap';

class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email : '',
            password: '',
            password_confirmation: '',
        }
     }

    onSubmit(e){
        e.preventDefault();
        const {name, email, password, password_confirmation} = this.state;

        axios.post('api/register', {
            name,
            email,
            password,
            password_confirmation
          })
          .then((response) => {
            sessionStorage.setItem("userEmail", this.state.email);
            this.setState({err: false});
            auth.login();
          })
          .catch(error=> {
            sessionStorage.setItem("authed", "false");
            sessionStorage.removeItem("userEmail");
            this.refs.name.value="";
            this.refs.password.value="";
            this.refs.email.value="";
            this.refs.confirm.value="";
            this.setState({err: true});
          });
     }

     onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
     }

    render() {
        let error = this.state.err;
        let msg = (!error) ? 'Registered Successfully' : 'Oops! , Something went wrong.' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
        
        if (sessionStorage.getItem("authed") === "true") 
            return <Redirect to="/"/>

        return (   
             <div>
                <div className="container pt-4 pb-4">
                    <div className="row">
                        <div className="col-md-8 col-md-offset-2">
                            <div className="panel panel-default">
                                <h5 className="panel-heading pb-2">Register</h5>
                                <div className="panel-body">
                                    <div className="col-md-offset-2 col-md-8 col-md-offset-2">
                                        {error != undefined && <div className={name} role="alert">{msg}</div>}
                                    </div>   
                                    <Form onSubmit= {this.onSubmit.bind(this)}>
                                        <Form.Group>
                                            <Form.Label htmlFor="name" className="col-md-4">Name</Form.Label>
                                            <div className="col-md-6">
                                                <Form.Control id="name" type="text" ref="name" name="name" onChange={this.onChange.bind(this)} required autoFocus />
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="email" className="col-md-4">E-Mail Address</Form.Label>
                                            <div className="col-md-6">
                                                <Form.Control id="email" type="email" ref="email" name="email" onChange={this.onChange.bind(this)} required />
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="password" className="col-md-4">Password</Form.Label>
                                            <div className="col-md-6">
                                                <Form.Control id="password" type="password"  ref="password" name="password" onChange={this.onChange.bind(this)} required/>
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label htmlFor="password-confirm" className="col-md-4">Confirm Password</Form.Label>
                                            <div className="col-md-6">
                                                <Form.Control id="password-confirm" type="password" ref="confirm" name="password_confirmation" onChange={this.onChange.bind(this)} required/>
                                            </div>
                                        </Form.Group>
                                        <Form.Group>
                                            <div className="col-md-6 col-md-offset-4">
                                                <button type="submit" className="btn btn-primary">
                                                    Register
                                                </button>
                                            </div>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        )
      }
}

export default Register