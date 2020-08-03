import React from 'react';
import Input from '../UI/input/input';
import Button from '../UI/button/button';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import classes from './controls.module.css';

const Controls = (props)=>{
    return (
        <>
        <div className={classes.fakebox}>
            <SearchIcon />
            <Input type="text" placeholder="search for notes" onChange={props.change}/>
        </div>
            <Button clicked={props.submit}><AddIcon className={classes.largeIcon}/></Button>
        </>
    );
}

export default Controls