/* global EventSource */

import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import { connect } from "react-redux";
//import { allMessages } from "./actions";
import superagent from "superagent";

class App extends Component {
  state = {
    text: ""
  };

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

  onchange = event => {
    //const value = event.target.value;
    //const { value } = target; //fancy way
    //const {target} = event
    const {
      target: { value }
    } = event;
    this.setState({ text: value });
  };

  onClick = () => {
    this.setState({ text: "" });
  };

  onSubmit = async event => {
    event.preventDefault();
    const url = "http://localhost:4000/message";
    const response = await superagent.post(url).send(this.state);
    console.log("response test:", response);
    this.onClick();
  };

  render() {
    console.log("this.props.messages. test", this.props.messages);

    const { messages } = this.props;
    const list = messages.map(message => (
      <p key={message.id}>{message.text}</p>
    ));

    console.log("this.props test", this.props);

    return (
      <main>
        <form onSubmit={this.onSubmit}>
          <input onChange={this.onchange} type="text" value={this.state.text} />
          <button>submit</button>
        </form>
        {/* <NameContainer data={} /> */}
        <button onClick={this.onClick}>Reset</button>

        <div className="div">
          <h1 className="title">Client chat!!</h1>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        {list}
      </main>
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
