import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../redux/actions';
import { Alert, Button, Card, CardGroup } from 'react-bootstrap';
import FlashMassage from 'react-flash-message';
import { Link } from 'react-router-dom';

import { API_BASE_URL } from '../../config';

class PizzaList extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoading: false,
          pizzas: [],
          cartItems: {},
          displayFlashMessage: false
        }
      }

      componentDidMount() { 
          this._isMounted = true;
          if (this._isMounted) {
            this.getPizzas();
         }
         this.setState({
            cartItems: this.props.cartItems,
         })
      }

      componentWillUnmount() {
        this._isMounted = false;
      }

      async getPizzas() {
        try {
            this.setState({ isLoading: true });
            const response = await fetch(API_BASE_URL + '/pizzas', {
                headers: {
                    Accept: 'application/json'
                },
            });
            const pizzasList = await response.json();
            this.setState({ 
                pizzas: pizzasList, 
                isLoading: false
            });
        } catch (err) {
            this.setState({ isLoading: false });
            console.error(err);
        }
    }

    addPizza = (e, pizza) => {
        e.preventDefault();
        this.setState({
           cartItems: this.props.cartItems,
           displayFlashMessage: true
        });

        let cartItem;
        Object.keys(this.state.cartItems).map((key) => {
            let item = this.state.cartItems[key].product;
            if (item.id === pizza.id) {
                cartItem = item;
                this.props.addToCart(item);
            }
        });

        if(cartItem == null || cartItem == undefined)
            this.props.addToCart(pizza);

        setTimeout(() => {
            this.setState({
                displayFlashMessage: false    
            }) 
        }, 5000)
      }

    render() {
        const pizzas = this.state.pizzas;
        let {isLoading, displayFlashMessage} = this.state;
        return(
            <div>
                <div className="container">
                    { displayFlashMessage ? 
                    <FlashMassage duration={5000} persistOnHover={true}>
                        <div className="col-md-12">
                            <Alert variant="dark" className="flashMessageCart">
                                <h6 className="p-0 mb-0">Pizza added to cart</h6>
                                <Link to="cart" className="pl-4 pb-0">Go to cart</Link>
                            </Alert>
                        </div>
                    </FlashMassage> : <></> }
                </div>
                {!isLoading ? 
                <div className="row productsList">
                    {pizzas.map(pizza => (
                        <Card key={ pizza.id } className="pizzaCard">
                            <Card.Img src={`/images/${pizza.name.toLowerCase()}.jpg`} variant="top" alt="..." />
                            <Card.Body className="card-body">
                                <Card.Title className="card-title">{ pizza.name }</Card.Title>
                                <Card.Text className="card-text">{ pizza.fillers }</Card.Text>
                                <Card.Text className="card-text"><strong>{ pizza.price } &euro;</strong></Card.Text>
                                <Button variant="outline-primary addToCartItem" size="sm" onClick={(e) => this.addPizza(e, pizza)}>Add to cart</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                :
                <div className="row productsList">Loading...</div>}
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
    {addToCart}
)(PizzaList);