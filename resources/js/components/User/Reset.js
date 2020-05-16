import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import { API_BASE_URL } from '../../config';

class Reset extends Component{
 	constructor(props){
        super(props);
        this.state = {
        	token: props.match.params.token,
            email : '',
            password: '',
            password_confirmation: '',
        }
    }

    onSubmit(e){
        e.preventDefault();
        const url = API_BASE_URL + '/password/reset' ;
        const {token, email, password, password_confirmation} = this.state ;
        axios.post(url, {
	    	token,
	        email,
	        password,
	        password_confirmation
          })
          .then(response=> {
            this.setState({err: false});
            this.props.history.push('login');
          })
          .catch(error=> {
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


	render(){
		let error = this.state.err ;
        let msg = (!error) ? 'Password Successfully reset' : 'Oops! , Something went wrong' ;
        let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
		return(
			<div className="container pt-4 pb-4">
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<div className="panel panel-default">
							<h5 className="panel-heading pb-2">Reset Password</h5>
							<div className="panel-body">
								<div className="col-md-offset-2 col-md-8 col-md-offset-2">
									{error != undefined && <div className={name} role="alert">{msg}</div>}
								</div>  
								<Form onSubmit= {this.onSubmit.bind(this)}>
									<Form.Group>
										<Form.Label for="email" className="col-md-4">E-Mail Address</Form.Label>
                                        <div className="col-md-6">
											<Form.Control id="email" type="email" ref="email" name="email" onChange={this.onChange.bind(this)} required autofocus />
										</div>
									</Form.Group>
									<Form.Group>
										<Form.Label for="password" className="col-md-4">Password</Form.Label>
                                        <div className="col-md-6">
											<Form.Control id="password" type="password" ref="password" name="password" onChange={this.onChange.bind(this)} required />
										</div>
									</Form.Group>
									<Form.Group>
										<Form.Label for="password-confirm" className="col-md-4">Confirm Password</Form.Label>
                                        <div className="col-md-6">
											<Form.Control id="password-confirm" type="password" ref="confirm" name="password_confirmation" onChange={this.onChange.bind(this)}  required />
										</div>
									</Form.Group>
									<Form.Group>
										<div className="col-md-6 col-md-offset-4">
											<Button type="submit">
												Reset Password
											</Button>
										</div>
									</Form.Group>
								</Form>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Reset