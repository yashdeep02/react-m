import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Movies from "./components/movies";
import CartTotal from "./components/cartTotal";
import "bootstrap/dist/css/bootstrap.css";

class App extends Component {
  render() {
    // called 2nd in mounting phase
    console.log("App - render");

    return (
      <main className="container">
        <Movies />
      </main>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
