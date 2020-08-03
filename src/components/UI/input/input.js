import React from 'react';
import classes from './input.module.css';

const input = (props)=>{
    return <input {...props} className={classes.inputBox}/>
}

export default input;