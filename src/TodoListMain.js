import React from 'react';

import TodoList from './TodoList.js'
import TodoListForm from './TodoListForm.js'
import './TodoListMain.css';

import firebase from 'firebase';
import {arrayMove} from 'react-sortable-hoc';


var config = {
  // apiKey: "some-api-key",
  authDomain: "solarforms-b9faa.firebaseio.com/",
  databaseURL: "https://solarforms-b9faa.firebaseio.com/",
  // storageBucket: "some-app.appspot.com",
};

firebase.initializeApp(config);



export default class TodoListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fbUpdate = this.fbUpdate.bind(this);

    this.state = {
      name: '',
      address: '',
      uid: '',
      items: [],
      username: this.props.username,
    };
    this.ref = firebase.database().ref(this.state.username);
  }

  componentWillMount() {

    this.items = [{}];
    this.ref.on("value", (dataSnapshot) => {
      this.items = dataSnapshot.val()
      console.log(this.items)
      // this.items = this.items.slice(1, 50)
      // this.items = this.items[0]
      this.items = Object.keys(this.items).map(key => this.items[key])
      // console.log(this.items)
      this.setState({
          items: this.items
      })
      console.log(this.state.items)
    })


  }

  componentWillUnmount() {
    this.ref.off();
  };

  handleChange (key) {
    return function (e) {
      var _newState = {};
      _newState[key] = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
      this.setState(_newState);
    }.bind(this);
  }

  handleSubmit(e) {
      e.preventDefault();
      this.ref.push({
        name: this.state.name,
        address: this.state.address,
        uid: this.getRandomColor()
      });
      this.setState({name: "", address: ""});
      console.log(this.state.items)
    }

  getRandomColor () {
    var hex = Math.floor(Math.random() * 0xFFFFFF);
    return "#" + ("000000" + hex.toString(16)).substr(-6);
  }

  handleRemove (id) {
      if(this.state.items.length !== 1){
        var _newData = this.state.items;
        _newData.splice(id, 1);
        // this.setState({
        //   items: _newData
        // })
        this.fbUpdate(_newData)
        // console.log('updating server...')
        // this.ref.set(_newData)
        // ref.on("child_removed", function(snapshot) {
        //   var deletedPost = snapshot.val();
        //   console.log("Item number '" + id + "' has been deleted");
        // });
      }
      else{
        console.log('branch running')
        _newData =  [{}]
        this.setState({
          items: _newData
        })
        this.fbUpdate(this._newData)
      }
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
    this.fbUpdate(this.state.items)
  };

  fbUpdate(_newData){
    console.log('updating server...')
    this.ref.set(_newData)
    // this.componentWillMount()
  }

  render() {
    return (
      <div>
      <ul className="container">

      </ul>
          <div className="titleBox">
            <h2 className="title">
              {this.props.username}'s To-Do List
            </h2>
            <button onClick={this.props.handleLogout} className="logoutButton">¡Adios!</button>
          </div>

            <TodoList items={this.state.items} onSortEnd={this.onSortEnd} handleRemove={this.handleRemove} />

            <TodoListForm
              name={this.state.name}
              address={this.state.address}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
      </div>
    )
  }
}


// <ul className="container">
//   {this.state.items.map((value, index) => (
//     <li key={`item-${index}`} index={index} > {value.name}</li>
//   ))}
// </ul>