"use client"
import { signOut } from "next-auth/react";
import React from "react";
import classes from "./UserAccountNav.module.css";

const UserAccountNav = () => {
    return (
        <button className={classes.button} onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
        })}>Sign Out</button>
    )
};

export default UserAccountNav;