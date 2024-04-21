"use client"
import { signOut } from "next-auth/react";
import React from "react";

const UserAccountNav = () => {
    return (
        <button onClick={() => signOut({
            redirect: true,
            callbackUrl: `${window.location.origin}/login`,
        })}><h4>Sign Out</h4></button>
    )
};

export default UserAccountNav;