import React from 'react';
// import LoginPanel from  './LoginPanel.js'
import TodoList from './TodoList.js'
import './TodoApp.css'

export default class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.state = {
      loggedIn: false,
      username: ""
    };
  }

  handleUsernameSubmit(e) {
    e.preventDefault();
    console.log(this.state.username)
    this.setState({ 
          username: this.state.username, 
          loggedIn: true 
        })
  }

  handleUsernameChange () {
    return function (e) {
      var state = {};
      state.username = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      this.setState(state);
    }.bind(this);
  }
  
  render() {

    return (
      <div>
        { !this.state.loggedIn ?
        <div>
          { !this.state.username ? <h1>Hi there! What's your name?</ h1> : null}
          { this.state.username ? <h1>Hi, {this.state.username}!</ h1> : null}
          <form>
            <input
              className = "addItemInput"
              onSubmit={this.handleUsernameSubmit}
              onChange={this.handleUsernameChange('username')} 
              value={this.state.username} 
            />
            <input 
              className = "submitButton"
              type="submit" 
              value="Go!" 
              onClick={this.handleUsernameSubmit} />
          </form>
        </div> 
          : null }

        { this.state.loggedIn ?  
          <TodoList username={this.state.username} /> 
          : null }
      </div>

    );
  }
}



