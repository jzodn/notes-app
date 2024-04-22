import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";
import CreateNoteForm from "@/components/CreateNoteForm/CreateNoteForm";
import classes from "./page.module.css";
import Note from "@/components/Note/Note";
import { getNotes } from "../api/notes/getnotes/route";

export default async function Notes() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    const notes = await getNotes(session);

    return (
      <div className={classes.wrapper}>
        <h1 className={classes.header}>Welcome {session?.user.username}</h1>
        <div className={classes.notes}>
          <h2>Here are your notes</h2>
          <div className={classes.notesArea}>
            {notes?.map((note) => {
              return <Note key={note.id} id={note.id} content={note.content} />
            })}
          </div>
        </div>
        <div className={classes.createNote}>
          <h2>Create a note</h2>
          <CreateNoteForm />
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Please login to see your notes</h1>
      <Link href="/login">Login here</Link>
    </div>
  )
}
