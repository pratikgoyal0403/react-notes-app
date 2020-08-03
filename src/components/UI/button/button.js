import React from "react";
import classes from "./button.module.css";

const button = (props) => {
  return (
    <button onClick={props.clicked} className={classes.button}>
      {props.children}
    </button>
  );
};

export default button;
