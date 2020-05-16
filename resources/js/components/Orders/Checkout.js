import React, { Component } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { emptyCart } from '../redux/actions';

class OrderCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cartItems: {},
            address: '',
            phoneNumber: '',
            cardNumber: '',
            cardName: '',
            cvv: '',
            expirationDate: '',
            userId: '',
            deliveryCost: 4.59,
            dollarExchangeUnit: 1.08
        }
    }

    componentDidMount() {
        this.setState({
            cartItems: this.props.cartItems,
            userId: sessionStorage.getItem("userEmail")
        })
    }

    onChange(e){
        const {name, value} = e.target;
        this.setState({[name]: value});
     }

     onSubmit(e){
        e.preventDefault();
        const newCartItems = {...this.state.cartItems};
        const userEmail = sessionStorage.getItem("userEmail");
        this.setState({
            ...this.state,
            cartItems: newCartItems,
            userId: userEmail
        })

        const {
            cartItems,
            address,
            phoneNumber,
            cardNumber,
            cardName,
            cvv,
            expirationDate,
            userId
        } = this.state;
        
        axios.post('api/orders', {
            cartItems,
            address,
            phoneNumber,
            cardNumber,
            cardName,
            cvv,
            expirationDate,
            userId
          })
          .then(response=> {
            this.props.emptyCart();

            this.setState({
                err: false,
                cartItems: {},
                address: '',
                phoneNumber: '',
                cardNumber: '',
                cardName: '',
                cvv: '',
                expirationDate: ''
            });
            
            this.props.history.push('/orders');
          })
          .catch(error=> {
            this.setState({err: true});
          });
     }

    render() {
        const cartItems = this.state.cartItems;
        let totalAmount = 0.0,
            {deliveryCost, dollarExchangeUnit } = this.state;
        return(
            <div className="container checkoutContainer pt-2">
                <h5>Billing and shipping information</h5>
                <div className="cartItems">
                    <div className="col-10 col-sm-9 col-md-7 col-lg-7 col-xl-7">
                    {
                        Object.keys(cartItems).map(function(key, index) {
                            let pizza = cartItems[key].product;
                            totalAmount += +(pizza.price * pizza.quantity);
                            return <Card key={index} className="cartItem flex-row flex-wrap">
                                <Card.Img src={`/images/${pizza.name.toLowerCase()}.jpg`} alt="..." className="col-5 col-md-5 p-0" />
                                <Card.Body className="col-7 col-md-7">
                                    <Card.Title>{cartItems[key].product.name}</Card.Title>
                                    <Card.Text>
                                        <strong>Quantity:</strong> {cartItems[key].product.quantity}
                                    </Card.Text>
                                    <Card.Text>
                                        <strong>Price:</strong> {cartItems[key].product.price} &euro;
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        }) 
                    }
                    </div>
                </div>
                {
                Object.keys(cartItems).length > 0 
                ? 
                <div className="checkoutAmount">
                    <hr/>
                    <div>
                        <div className="checkoutAmountItem">
                            <strong>Subtotal: </strong>
                            <div>
                                <h6>{(totalAmount).toFixed(2)} &euro;</h6>
                                <h6>&#36; {(totalAmount * dollarExchangeUnit).toFixed(2)}</h6>
                                <hr/>
                            </div>
                        </div>
                        <div className="checkoutAmountItem">
                            <strong>Delivery cost: </strong>
                            <div>
                                <h6>{deliveryCost.toFixed(2)} &euro;</h6>
                                <hr/>
                            </div>
                        </div>
                        <div className="checkoutAmountItem">
                            <strong>Total cost: </strong>
                            <div>
                                <h6>{(totalAmount + deliveryCost).toFixed(2)} &euro;</h6>
                                <h6>&#36; {((totalAmount * dollarExchangeUnit) + (deliveryCost * dollarExchangeUnit)).toFixed(2)}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                    : 
                        <></>
                    }
                <hr/>
                <div className="orderInfo">
                    <div className="col-md-5 col-lg-5 col-xl-5">
                        <h5>Add your shipping information</h5>
                        <div>
                            <Form.Text className="text-muted">
                                We'll never share your information with anyone else.
                            </Form.Text>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Shipping address</Form.Label>
                                    <Form.Control type="text" placeholder="385 Willow St.Statesville, NC 28625" name="address" onChange={this.onChange.bind(this)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Phone number</Form.Label>
                                    <Form.Control type="text" placeholder="0038349657998" name="phoneNumber" onChange={this.onChange.bind(this)} />
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                    <div className="col-md-5 col-lg-5 col-xl-5">
                        <h5>Add payment details</h5>
                        <div>
                            <Form.Text className="text-muted">
                                We'll never share your information with anyone else.
                            </Form.Text>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Card number</Form.Label>
                                    <Form.Control type="text" placeholder="4000500060007000" name="cardNumber" onChange={this.onChange.bind(this)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Card name</Form.Label>
                                    <Form.Control type="text" placeholder="Mr. John Smith" name="cardName" onChange={this.onChange.bind(this)} />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>CVV</Form.Label>
                                    <Form.Control type="text" placeholder="012" name="cvv" onChange={this.onChange.bind(this)}/>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Expiration date</Form.Label>
                                    <Form.Control type="text" placeholder="03/03/2022" name="expirationDate" onChange={this.onChange.bind(this)}/>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>
                </div>
                <div className="checkoutFooter">
                    <Button type="submit" onClick={(e) => this.onSubmit(e)}>Buy</Button>
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
    {emptyCart}
)(OrderCheckout);