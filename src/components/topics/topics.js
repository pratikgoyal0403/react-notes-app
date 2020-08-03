import React from "react";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import classes from "./topics.module.css";

const Topics = (props) => {
  const containerClass = [classes.topicContainer, classes.selected];
  let isActive = false;
  if (props.activeNote && props.activeNote?.id === props.id) {
    isActive = true;
  }
  return (
    <div
      className={isActive ? containerClass.join(" ") : containerClass[0]}
      onClick={props.select}
    >
      <p className={classes.topicText}>{props.heading}</p>
      <div className={classes.icons}>
        {isActive ? (
            <SaveIcon className={classes.large} onClick={props.save} />
        ) : null}
        {isActive ? (
            <DeleteIcon className={[classes.large, classes.red].join(" ")} onClick={props.delete}/>
        ) : null}
        </div>
    </div>
  );
};

export default Topics;
