"use client"
import React, { useEffect } from "react";

function UserComponent () {
    const fetchAllUsers = async () => {
        const response = await fetch("http://localhost:3000/students");
        console.log(response);
    }

    useEffect(() => {
        fetchAllUsers();
    })

    return (
        <h1>Users</h1>
    )
}

export default Users;