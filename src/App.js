import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';


class App extends Component {
  state = {
    people: [
      { name: 'Huat', age: 23 },
      { name: 'Fred', age: 23 }
    ],
    otherState: 'some other value',
    showPeople: false //array of persons
  };

  switchNameHandler = (newName) => {
    this.setState({
      people: [
        { name: newName, age: 100 },
        { name: 'Fred', age: 100 }
      ]
    })
  };

  nameChangedHandler = (event) => {
    this.setState({
      people: [
        { name: event.target.value, age: 24 },
        { name: "Fred", age: 25 }
      ]
    })
  }

  deletePersonHandler = (personIndex) => {
    // const people = this.state.people; bad practice, mutates original 
    //const people = this.state.people.slice; clones original data
    const people = [...this.state.people]; //same as slice
    people.splice(personIndex, 1);
    this.setState({people: people})
  }

  togglePeopleHandler = () => {
    const doesShow = this.state.showPeople;
    this.setState({ showPeople: !doesShow }); //gets merged with the other state
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    let people = null;

    if (this.state.showPeople) {
      people = (
        <div>
          {this.state.people.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age} />
          })}
        </div>
      );
    }

    return (
      <div className='App'>
        <h1>Hi, I'm a React App</h1>
        <p>HEHE!</p>
        <button style={style} onClick={this.togglePeopleHandler}>Switch Name</button>
        {people}
      </div>
    )
    //return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Hi, I\'m a React App!"));
  };
}

export default App;

