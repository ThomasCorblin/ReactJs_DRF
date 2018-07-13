import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';


const navigationItems = (props) => {
    
    
    return (
        <ul className={classes.NavigationItems}>
            {!props.isAuthenticated 
                ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>               
            }
            {props.isAuthenticated ? <NavigationItem link="/">first</NavigationItem>: null}
            {props.isAuthenticated ? <NavigationItem link="/home">second</NavigationItem>: null}
        </ul>
    );
};


export default navigationItems;