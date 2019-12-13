/* global EventSource */

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      console.log("event.data test:", event.data);

      const parsed = JSON.parse(event.data);

      console.log("parsed test", parsed);
    };
  }

  render() {
    return (
      <div>
        Client chat!!
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    );
  }
}

export default App;
