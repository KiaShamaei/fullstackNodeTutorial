import React from 'react'
import { Link } from 'react-router-dom'


export const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/createpost">Create A post</Link>
			<Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
			<Link to="/">Home</Link>   
        </div>
    )
}
