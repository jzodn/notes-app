"use client"
import React, { FormEvent, useState } from 'react';
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./LoginForm.module.css";
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type FormData = {
  username: string,
  password: string,
};

export default function LoginForm() {
  const router = useRouter();

  const schema: ZodType<FormData> = z.object({
    username: z.string().min(3, 'Username must be at least 3 characters').max(32),
    password: z.string().min(8, 'Password must have more than 8 characters').max(20),
  });

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({resolver: zodResolver(schema) })

  const submitData = async (data: FormData, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    const res = await signIn('credentials', {
      username: data.username,
      password: data.password,
      redirect: false,
    })

    if (res?.error) {
      console.log(res);
    } else {
      router.refresh();
      router.push("/notes");
    }
  }

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(submitData)}>
        <label>Username: </label>
        <input type="text" {...register("username")} />
        {errors.username && <span className={classes.error}>{errors.username.message}</span>}

        <label>Password: </label>
        <input type="password" {...register("password")} />
        {errors.password && <span className={classes.error}>{errors.password.message}</span>}

        <input type="submit" />
      </form>

      <p>Don't have an account?</p>
      <Link href="/signup">Sign up here</Link>
    </>
  );
};
