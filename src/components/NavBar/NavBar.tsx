import { getServerSession } from "next-auth";
import classes from "./NavBar.module.css";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import UserAccountNav from "../UserAccountNav/UserAccountNav";

export default async function NavBar() {
  const session = await getServerSession(authOptions);

  return (
    <div className={classes.wrapper}>
      <Link href='/'><h4>Notes App</h4></Link>
      <div className={classes.links}>
        <Link href="/notes"><h4>Notes</h4></Link>
        {session?.user ? (
          <UserAccountNav />
        ) : (
          <Link href="/login"><h4>Login</h4></Link>
        )}
      </div>
    </div>
  );
}
