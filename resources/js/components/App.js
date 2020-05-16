import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'
import PizzaIndex from './Pizza/Index';
import Index from './Index';
import CartIndex from './Cart/Index';
import { Provider } from 'react-redux'
import store from "./redux/reducers/store";
import Navbar from './Navbar';
import OrderCheckout from './Orders/Checkout';
import Register from './User/Register';
import Login from './User/Login';
import ForgotPassword from './User/Forgot';
import ResetPassword from './User/Reset';
import auth from './User/Auth';

const PrivateRoute = ({component: Component, authed, ...rest}) => (
    <Route 
        {...rest}
        render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
)

const routing = (
    <BrowserRouter>
        <Navbar />
        <Switch>
            <Route exact path="/" component={Index} />
            <PrivateRoute authed={auth.isAuthenticated()} path="/pizzas" component={PizzaIndex} /> 
            <Route path="/cart" component={CartIndex} />
            <PrivateRoute authed={auth.isAuthenticated()} path="/checkout" component={OrderCheckout} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path='/forgotpassword' component={ForgotPassword}/>
            <Route path='/password/reset/:token' component={ResetPassword}/>
            <Route path="*" component={() => "404 Not Found"} />
        </Switch>
    </BrowserRouter>
);

if (document.getElementById('site')) {
    ReactDOM.render(
        <Provider store={store}>
            {routing}
        </Provider>, document.getElementById('site'));
}
