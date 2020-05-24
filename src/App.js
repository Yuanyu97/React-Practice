import React, { Component } from 'react';
import styled from 'styled-components';
import './App.css';

import Person from './Person/Person';

const StyledButton = styled.button`
  background-color: ${props => props.alt ? 'red' : 'green'};
  color: white;
  font: inherit;
  border: 1px solid blue;
  padding: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
    color: black;
  }`;

class App extends Component {
  state = {
    people: [
      { id: '123', name: 'Huat', age: 23 },
      { id: '456', name: 'Fred', age: 23 }
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

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.people.findIndex(p => {
      return p.id === id;
    });
    // const person = Object.assign({}, this.state.people[personIndex])
    const person = {
      ...this.state.people[personIndex]
    };
    person.name = event.target.value;
    const people = [...this.state.people];
    people[personIndex] = person;

    this.setState({
      people: people
    })
  }

  deletePersonHandler = (personIndex) => {
    // const people = this.state.people; bad practice, mutates original 
    //const people = this.state.people.slice; clones original data
    const people = [...this.state.people]; //same as slice
    people.splice(personIndex, 1);
    this.setState({ people: people })
  }

  togglePeopleHandler = () => {
    const doesShow = this.state.showPeople;
    this.setState({ showPeople: !doesShow }); //gets merged with the other state
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ":hover": {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    };

    let people = null;

    if (this.state.showPeople) {
      people = (
        <div>
          {this.state.people.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} /> //IMPT when rendering a list of data
          })}
        </div>
      );

    }

    const classes = [];
    if (this.state.people.length <= 2) {
      classes.push('red');
    }
    if (this.state.people.length <= 1) {
      classes.push('bold')
    }

    return (
      <div className='App'>
        <h1>Hi, I'm a React App</h1>
        <p className={classes.join(' ')}>HEHE!</p>
        <StyledButton alt={this.state.showPeople} onClick={this.togglePeopleHandler}>Toggle Names</StyledButton>
        {people}
      </div>
    );
    //return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Hi, I\'m a React App!"));
  };
}

export default App;