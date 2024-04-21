import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function Note() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    return (
      <div>
        <h1>Welcome {session?.user.username}</h1>
        <h2>Here are your notes</h2>
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
