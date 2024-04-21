"use client";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import classes from "./SignupForm.module.css";
import { useRouter } from "next/navigation";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function SignupForm() {
  const router = useRouter();

  const schema: ZodType<FormData> = z
    .object({
      username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(32),
      email: z.string().email(),
      password: z
        .string()
        .min(8, "Password must have more than 8 characters")
        .max(20),
      confirmPassword: z
        .string()
        .min(8, "Password must have more than 8 characters")
        .max(20),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const submitData = async (data: FormData, e?: React.BaseSyntheticEvent) => {
    e?.preventDefault();

    const res = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password,
      }),
    });

    if (res.ok) {
      router.push("/login");
    } else {
      console.log("Registration failed");
    }
  };

  return (
    <>
      <form className={classes.form} onSubmit={handleSubmit(submitData)}>
        <label>Username: </label>
        <input type="text" {...register("username")} />
        {errors.username && (
          <span className={classes.error}>{errors.username.message}</span>
        )}

        <label>Email: </label>
        <input type="email" {...register("email")} />
        {errors.email && (
          <span className={classes.error}>{errors.email.message}</span>
        )}

        <label>Password: </label>
        <input type="password" {...register("password")} />
        {errors.password && (
          <span className={classes.error}>{errors.password.message}</span>
        )}

        <label>Confirm Password: </label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <span className={classes.error}>
            {errors.confirmPassword.message}
          </span>
        )}

        <input type="submit" />
      </form>
    </>
  );
}
