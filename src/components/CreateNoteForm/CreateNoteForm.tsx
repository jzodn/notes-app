"use client";
import React, { FormEvent, useState } from "react";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./CreateNoteForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormData = {
  content: string;
};

export default function CreateNoteForm() {
  const router = useRouter();

  const schema: ZodType<FormData> = z.object({
    content: z
      .string()
      .min(1, "Note must be at least 1 character")
      .max(255, "Note must be less than 255 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData) => {
    const res = await fetch("/api/notes/createnote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: data.content,
      }),
    });

    if (res.ok) {
      console.log("Note created");
    } else {
      console.log("Could not create note");
    }
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(submitData)}>
        <label>Note: </label>
        <textarea cols={16} rows={5}  {...register("content")} />
        {errors.content && (
          <span className={classes.error}>{errors.content.message}</span>
        )}

        <input type="submit" value="Create Note" />
      </form>
    </>
  );
}
