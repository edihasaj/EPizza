import React, { Component } from 'react';
import PizzaList from './Pizza/PizzaList';

class App extends Component {
    render() {
        return (
            <div>
                <div className="headerImage">
                    <h1 className="headerText">Let's buy some Yummy Pizza!</h1>
                </div>
                <div className="container pt-5 pb-5">
                    <PizzaList />
                </div>
            </div>
        );
    }
}

export default App;