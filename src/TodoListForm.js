import React from 'react';


export default class TodoListForm extends React.Component {

  render() {

    return (
            <form style={{marginTop: "50" }} className="divHover">
                <input 
                  autoFocus
                  type="text"
                  className="addItemInput"
                  placeholder="Item"
                  onChange={this.props.handleChange('name')} 
                  value={this.props.name}
                /> &nbsp;
                <input 
                  className="addItemInput"
                  placeholder="Comment"
                  onChange={this.props.handleChange('address')} 
                  value={this.props.address}
                />
                <button 
                  style={{color: "skyblue"}}
                  className = "addItemButton"
                  type="submit" 
                  onClick={this.props.handleSubmit}>
                  Add
                </button>
            </form>
    );
  }

}



