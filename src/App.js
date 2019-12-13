/* global EventSource */

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";
//import { allMessages } from "./actions";

class App extends Component {
  stream = new EventSource("http://localhost:4000/stream");

  componentDidMount() {
    this.stream.onmessage = event => {
      console.log("event.data test:", event.data);

      const parsed = JSON.parse(event.data);

      //this.props.allMessages(parsed);
      this.props.dispatch(parsed);

      console.log("parsed test", parsed);
    };
  }

  render() {
    console.log("this.props.messages. test", this.props.messages);

    const { messages } = this.props;
    const list = messages.map(message => {
      return <p key={message.id}>{message.text}</p>;
    });

    console.log("this.props test", this.props);

    return (
      <div className="div">
        <h1 className="title">Client chat!!</h1>
        <img src={logo} className="App-logo" alt="logo" />
        {list}
      </div>
    );
  }
}

//Get data from store
function mapStateToProps(state) {
  return {
    messages: state // inside of the component, this.props.messages will be the entire state of the redux store
  };
}

// //poner data en store
// const mapDispachToProps = {
//   allMessages // the action can be dispached by running this.props.allMessages inside of the component
// };

export default connect(mapStateToProps)(App);
