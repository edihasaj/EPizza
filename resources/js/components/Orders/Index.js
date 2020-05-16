import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class OrderIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const cartItems = this.props.cartItems;
        return(
            <div className="container">
                Orders
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        cartItems: state.cartItems
    };
};

export default connect(mapStateToProps)(OrderIndex);