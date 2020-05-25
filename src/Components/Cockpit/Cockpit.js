import React, { useEffect } from 'react';

import classes from './Cockpit.css';

const cockpit = (props) => {
    useEffect(() => {
        console.log('[Cockpit.js] useEffect');
        setTimeout(() => {
            alert('Saved data to cloud');
        }, 1000);
        return () => {
            console.log('[Cockpit.js] cleanup work in useEffect');
        };
    }, []); //alert runs for the first time only

    const assignedclasses = [];
    let buttonClass = '';
    if (props.showPeople) {
        buttonClass = classes.Red;
    }
    if (props.personLength <= 2) {
      assignedclasses.push(classes.red);
    }
    if (props.personLength <= 1) {
      assignedclasses.push(classes.bold)
    }

    return (
        <div className={classes.Cockpit}><h1>{props.title}</h1>
            <p className={assignedclasses.join(' ')}>HEHE!</p>
            <button className={buttonClass} onClick={props.clicked}>Toggle Names</button></div>
    );
}

export default React.memo(cockpit); //only for functional components