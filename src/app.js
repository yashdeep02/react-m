import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./App.css";
import Products from "./components/products";
import CartTotal from "./components/cartTotal";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  constructor() {
    // must call parent constructor first
    super();
    // called 1st during mounting phase
    console.log("App - constructor");
    this.state = {
      products: [
        { id: 1, count: 0 },
        { id: 2, count: 2 },
        { id: 3, count: 0 },
        { id: 4, count: 0 },
        { id: 5, count: 1 }
      ]
    };
    this.handleIncrement = product => {
      const products = [...this.state.products];
      const index = products.indexOf(product);
      products[index] = { ...product };
      products[index].count++;
      this.setState({ products });
    };

    this.handleDelete = productId => {
      const products = this.state.products.filter(p => p.id !== productId);
      this.setState({ products });
    };

    this.handleReset = () => {
      const products = this.state.products.map(p => {
        p.count = 0;
        return p;
      });
      this.setState({ products });
    };
  }

  componentDidMount() {
    // good place to make ajax calls to fetch remote data
    // called 3rd in mounting phase
    console.log("App - componentDidMount");
  }

  componentDidUpdate() {
    // called during update phase along with render
    console.log("App - componentDidUpdate");
  }

  render() {
    // called 2nd in mounting phase
    console.log("App - render");

    return (
      <div className="jumbotron m-4">
        <h1>Shopping Cart</h1>
        <CartTotal
          className="m-2"
          totalProducts={this.state.products.filter(p => p.count > 0).length}
        />
        <main className="container m-2">
          <Products
            products={this.state.products}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
            onReset={this.handleReset}
          />
        </main>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
