import React from "react";
import classes from "./Note.module.css";

const Note = ({ content }: {
    content: String,
} ) => {
    return (
        <div className={classes.wrapper}>
            <p className={classes.content}>{content}</p>
        </div>
    );
};

export default Note;