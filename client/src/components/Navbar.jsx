import React,{ useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../helpers/AuthContext'

export const Navbar = () => {
	const { setAuth,auth } = useContext(AuthContext)
	const handleLogout = () => {
		setAuth({...auth , status : false})
		sessionStorage.removeItem("accessToken")
	}
	console.log(auth)
	return (
		<div className="navbar">
			<Link to="/">Home</Link>
			<Link to="/createpost">Create A post</Link>
			{
				!auth.status ? (
					<>
						<Link to="/register">Register</Link>
						<Link to="/login">Login</Link>
						
					</>
				) : (
					<>
					<button onClick={handleLogout}>Logout</button>
					<a>{auth.username}</a>
					</>
				)
			}
			

		</div>
	)
}
