import React, { Component } from 'react';
// import styled from 'styled-components';
import classes from './App.css';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';
import Person from './Person/Person';

// const StyledButton = styled.button`
// background-color: ${props => props.alt ? 'red' : 'green'};
// color: white;
// font: inherit;
// border: 1px solid blue;
// padding: 8px;
// cursor: pointer;

// &:hover {
//   background-color: ${props => props.alt ? 'salmon' : 'lightgreen'};
//   color: black;
//   }`;

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
    // const style = {
    //   backgroundColor: 'green',
    //   color: 'white',
    //   font: 'inherit',
    //   border: '1px solid blue',
    //   padding: '8px',
    //   cursor: 'pointer',
    //   ":hover": {
    //     backgroundColor: 'lightgreen',
    //     color: 'black'
    //   }
    // };

    let people = null;
    let buttonClass = '';

    if (this.state.showPeople) {
      people = (
        <div>
          {this.state.people.map((person, index) => {
            return <ErrorBoundary key={person.id}><Person
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              changed={(event) => this.nameChangedHandler(event, person.id)} /></ ErrorBoundary> //IMPT when rendering a list of data
          })}
        </div>
      );
      buttonClass = classes.Red;
    }

    const assignedclasses = [];
    if (this.state.people.length <= 2) {
      assignedclasses.push(classes.red);
    }
    if (this.state.people.length <= 1) {
      assignedclasses.push(classes.bold)
    }

    return (
      <div className={classes.App}>
        <h1>Hi, I'm a React App</h1>
        <p className={assignedclasses.join(' ')}>HEHE!</p>
        <button className={buttonClass} onClick={this.togglePeopleHandler}>Toggle Names</button>
        {people}
      </div>
    );
    //return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Hi, I\'m a React App!"));
  };
}

export default App;