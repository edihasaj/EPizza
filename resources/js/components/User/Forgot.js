import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


class Forgot extends Component{
	constructor(props){
		super(props);
		this.state =  {
			email : '',
		}
	}

	onSubmit(e){
		e.preventDefault();
		const {email} = this.state;
        axios.post('api/password/email', {
             email,
          })
          .then(response=> {
          	this.refs.email.value="";
            this.setState({err: false});
          })
          .catch(error=> {
            this.setState({err: true});
            this.refs.email.value="";
          });
     }
	

	onChange(e){
		const email = e.target.value;
		this.setState({email : email});
	}

	render(){	
		let error = this.state.err ;
		let msg = (!error) ? 'We have e-mailed your password reset link!' : 'User doesnt exist' ;
		let name = (!error) ? 'alert alert-success' : 'alert alert-danger' ;
		return(
			<div className="container">
				<div className="row">
					<div className="col-md-8 col-md-offset-2">
						<div className="panel panel-default">
							<div className="panel-heading">Reset Password</div>
							<div className="panel-body">
								<div className="col-md-offset-2 col-md-8 col-md-offset-2">
									{error != undefined && <div className={name} role="alert">{msg}</div>}
								</div>  
								<Form onSubmit={this.onSubmit.bind(this)}>
									<Form.Group>
										<Form.Label for="email" className="col-md-4">E-Mail Address</Form.Label>
										<Form.Control id="email" type="email" ref= "email" name="email"  onChange={this.onChange.bind(this)} required />
									</Form.Group>
									<Form.Group>
										<div className="col-md-6 col-md-offset-4">
											<Button type="submit">
												Send Password Reset Link
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

export default Forgot