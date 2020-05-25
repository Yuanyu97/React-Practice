import React, { Component } from 'react';
// import styled from 'styled-components';
import classes from './App.css';
import People from '../Components/People/People';
import Cockpit from '../Components/Cockpit/Cockpit';

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
  constructor(props) {
    super(props);
    console.log('[App.js] constuctor');
  }
  
  state = {
    people: [
      { id: '123', name: 'Huat', age: 23 },
      { id: '456', name: 'Fred', age: 23 }
    ],
    otherState: 'some other value',
    showPeople: false //array of persons
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props)
    return state
  }

  switchNameHandler = (newName) => {
    this.setState({
      people: [
        { name: newName, age: 100 },
        { name: 'Fred', age: 100 }
      ]
    })
  };

  shouldComponentUpdate(nexProps, nextState) {
    console.log('[App.js] shouldComponentUpdate')
    return true;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate')
  }

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
    console.log('[App.js] render');
    let people = null;

    if (this.state.showPeople) {
      people = (
        <People
          people={this.state.people}
          clicked={this.deletePersonHandler}
          changed={this.nameChangedHandler} />
      );
    }



    return (
      <div className={classes.App}>
        <Cockpit
        title={this.props.appTitle}
          showPeople={this.state.showPeople}
          people={this.state.people} 
          personLength={this.state.people.length}
          clicked={this.togglePeopleHandler}/>
        {people}
      </div>
    );
    //return React.createElement("div", {className: "App"}, React.createElement("h1", null, "Hi, I\'m a React App!"));
  };
}

export default App;