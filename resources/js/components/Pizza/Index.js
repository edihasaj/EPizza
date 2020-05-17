import React, { Component } from 'react';
import PizzaList from './PizzaList';

class PizzaIndex extends Component {
    constructor (props) {
        super(props);
        this.state = {
            createModalShow: false
        }
    }

    render() {
        return(
            <div className="container">
                <h5 className="pt-4 pb-2">Our pizza menu</h5>
                <PizzaList />
            </div>
        );
    }
}

export default PizzaIndex;