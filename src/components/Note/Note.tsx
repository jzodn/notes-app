"use client"
import React from "react";
import classes from "./Note.module.css";
import { AiOutlineClose, AiFillEye } from "react-icons/ai";
import { useRouter } from "next/navigation";

const Note = ({ id, content }: {
    id: number,
    content: String,
} ) => {
    const router = useRouter();

    const deleteNote = async (id: number) => {  
        await fetch("/api/notes/deletenote", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id,
            }),
        });
    
        router.refresh();
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.buttons}>
                <button className={classes.button} onClick={() => {deleteNote(id)}}><AiOutlineClose size="1.75em"/></button>
                <button className={classes.button}><AiFillEye size="1.75em"/></button>
            </div>
            <p className={classes.content}>{content}</p>
        </div>
    );
};

export default Note;