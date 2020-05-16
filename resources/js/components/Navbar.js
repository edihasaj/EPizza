import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import auth from './User/Auth';

class NavbarComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            authed: ""
        }
    } 

    componentDidMount() {
        let authed = sessionStorage.getItem("authed");
        this.setState({
            authed: authed
          });
    }

    componentDidUpdate() {
        let authed = sessionStorage.getItem("authed");
        if (authed !== this.state.authed) {
            this.setState({
                authed: authed
              });
        }
    }

    logout(e){
        e.preventDefault();  
        axios.post('api/logout')
           .then(response=> {
             this.setState({
                authed: "false"
              });
             auth.logout();
           })
           .catch(error=> {
             console.log(error);
           });
    }

    render() {
        if(this.state.authed === "true"){
            return(
                <nav className="navbar navbar-expand-sm navbar-light bg-light">
                    <div className="container">
                        <Link className="navbarLink nav-link brandName" to="/">E-Pizza</Link>
                        <Button className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-expanded="false">
                            <span className="navbar-toggler-icon"></span>
                        </Button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item">
                                    <Link className="navbarLink nav-link" to="/pizzas">Pizza Menu</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="navbarLink nav-link" to="/orders">Orders</Link>
                                </li>
                                <li className="cartIcon nav-item">
                                    <Link className="navbarLink nav-link" to="/cart"><i className="fas fa-shopping-cart"></i></Link>
                                </li>
                                <li className="nav-item">
                                    <a className="navbarLink nav-link" onClick={this.logout.bind(this)}>Logout</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            );
        }
        return(
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
                <div className="container">
                    <Link className="navbarLink nav-link brandName" to="/">E-Pizza</Link>
                    <Button className="navbar-toggler" data-toggle="collapse" data-target="#navbarSupportedContent" aria-expanded="false">
                        <span className="navbar-toggler-icon"></span>
                    </Button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <li className="cartIcon nav-item">
                                <Link className="navbarLink nav-link" to="/cart"><i className="fas fa-shopping-cart"></i></Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbarLink nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="navbarLink nav-link" to="/register">Register</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default withRouter(NavbarComponent);