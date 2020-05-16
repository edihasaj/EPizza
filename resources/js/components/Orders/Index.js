import React, { Component } from 'react';
import { Alert, Card, Spinner } from 'react-bootstrap';
import { API_BASE_URL } from '../../config';

class OrderIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoading: false,
            orders: []
        }
    }

    componentDidMount() {
        this.getOrders();
    }

    async getOrders() {
      try {
          const userEmail = sessionStorage.getItem("userEmail");
          if (userEmail !== null || userEmail !== undefined) {
            this.setState({ isLoading: true });
            const response = await fetch(API_BASE_URL + '/orders/' + userEmail, {
                headers: {
                    Accept: 'application/json'
                }
            });
            const ordersList = await response.json();
            this.setState({ 
                orders: ordersList, 
                isLoading: false
            });
          }
      } catch (err) {
        this.setState({ 
            isLoading: false,
            error: err
        });
      }
  }

    render() {
        const {orders, isLoading} = this.state;
        return(
            <div className="container pt-3 pb-4">
                <h5 className="pb-2">Orders</h5>
                {
                    !isLoading ?
                    <div>
                        {
                            orders.length >= 1 ?
                            <div>
                                <div className="col-md-12 col-lg-9 col-xl-8">
                                    <Alert variant="success">
                                        <h6 className="p-0 mb-0">Your orders has been send for processing...</h6>
                                    </Alert>
                                </div>
                                <div className="col-md-12 col-lg-9 col-xl-8">
                                    {orders.map(order => (
                                        <Card key={order.id}>
                                            <Card.Header as="h5"><strong>{ order.name } Pizza</strong></Card.Header>
                                            <Card.Body>
                                                <Card.Text><strong>Ordered at:</strong> { order.orderDate}</Card.Text>
                                                <Card.Text><strong>Ordered address:</strong> { order.address}</Card.Text>
                                                <Card.Text><strong>Product quantity:</strong> { order.quantity}</Card.Text>
                                                <Card.Text><strong>Product price:</strong> { order.price} &euro;</Card.Text>
                                            </Card.Body>
                                        </Card>
                                    ))}
                                </div>
                            </div>
                            :
                            <div>
                                <h6>You should buy something first!</h6>
                            </div>
                        }
                    </div>
                    :
                    <div className="row productsList">
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </div>
                }
            </div>
        );
    }
}

export default OrderIndex;