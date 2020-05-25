import React, { PureComponent } from 'react';

import Person from './Person/Person';

class People extends PureComponent { //pure component implements shouldComponentUpdate that checks all the props if they changed, line 13-15
    // static getDerivedStateFromProps(props, state) {
    //     console.log('[People.js] getDerivedStateFromProps');
    //     return state;
    // }

    // shouldComponentUpdate(nextProps, nextState) { //for class component only
    //     console.log('[People.js] shouldComponentUpdate');
    //     if (nextProps.people !== this.props.people
    //         || nextProps.clicked !== this.props.clicked
    //         || nextProps.changed !== this.props.changed
    //     ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
    // }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[People.js] getSnapshotBeforeUpdate');
        return { message: 'SnapShot!' };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('[People.js] componentDidUpdate');
        console.log(snapshot);
    }

    componentWillUnmount() {
        console.log('[People.js] componentWillUnmount');

    }

    render() {
        console.log('[People.js] rendering...');
        return this.props.people.map((person, index) => {
            return (<Person
                click={() => this.props.clicked(index)}
                name={person.name}
                age={person.age}
                key={person.id} //req for a list
                changed={(event) => this.props.changed(event, person.id)} />
            ); //IMPT when rendering a list of data
        });
    }
}

export default People;