import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { incrementProduct, decrementProduct } from '../redux/actions';

class CartIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pizzas: {}
        }
    }

    componentDidMount() {
        this.setState({
            pizzas: this.props.cartItems
        })
    }

    incrementPizza = (e, id) => {
        e.preventDefault();
        Object.keys(this.state.pizzas).map((key) => {
            let pizza = this.state.pizzas[key].product;
            if (pizza.id === id)
                this.props.incrementProduct(pizza.id);
        })
      }

    decrementPizza = (e, id) => {
        e.preventDefault();
        Object.keys(this.state.pizzas).map((key) => {
            let pizza = this.state.pizzas[key].product;
            if (pizza.id === id) {
                if (pizza.quantity === 1) {
                    this.props.decrementProduct(pizza.id, pizza);
                    const newPizzas = { ...this.state.pizzas };
                    delete newPizzas[id];
                    this.setState({
                        pizzas: newPizzas
                    });
                } else {
                    this.props.decrementProduct(pizza.id);
                }
            }
        });
    }

    render() {
        const cartItems = this.state.pizzas;
        let totalAmount = 0.0;
        return(
            <div className="container pt-4">
                <h5>Cart Items</h5>
                <div className="cartItems">
                    <div className="col-10 col-sm-9 col-md-7 col-lg-6 col-xl-6">
                    {
                        Object.keys(cartItems).map((key, index) => {
                            let pizza = cartItems[key].product;
                            totalAmount += +(pizza.price * pizza.quantity);
                            return <Card key={index} className="cartItem flex-row flex-wrap">
                                <Card.Img src={`/images/${pizza.name.toLowerCase()}.jpg`} alt="..." className="col-8 col-sm-7 col-md-6 p-0" />
                                <Card.Body className="col-4 col-sm-5 col-md-6">
                                    <Card.Title>{cartItems[key].product.name} Pizza</Card.Title>
                                    <Card.Text>
                                        <strong>Quantity:</strong> {cartItems[key].product.quantity}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Price:</strong> {cartItems[key].product.price} &euro;
                                    </Card.Text>
                                    <div className="cartItemRemove">
                                        <Button variant="outline-primary" size="sm" onClick={(e) => this.incrementPizza(e, cartItems[key].product.id)}>+</Button>
                                        <Button variant="outline-danger" size="sm" onClick={(e) => this.decrementPizza(e, cartItems[key].product.id)}>Remove</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        }) 
                    }
                    </div>
                </div>
                <hr/>
                <div className="cartFooter">
                    <div>
                        {Object.keys(cartItems).length > 0 
                            ? 
                            <Link to="/checkout">
                                <Button variant="primary">Proceed to checkout</Button> 
                            </Link> 
                            : 
                            <Link to="/">
                                <Button variant="info" size="sm">Add pizzas to Cart</Button>
                            </Link>
                            }
                    </div>
                        {Object.keys(cartItems).length > 0 ? 
                           <div>
                            <h6>{(totalAmount).toFixed(2)} &euro;</h6>
                            <h6>&#36; {(totalAmount * 1.08).toFixed(2)}</h6>
                         </div> : <></> }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
  return {
    cartItems: state.cartItems
  };
};

export default connect(
    mapStateToProps,
    { incrementProduct, decrementProduct }
)(CartIndex);