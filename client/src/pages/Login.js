import axios from 'axios';
import React , {useState} from 'react'

export const Login = () => {
	const [username , setUserName] = useState("") ;
	const [password , setPassword] = useState("") ;
	const login =()=>{
		const data = {username : username , password : password} ; 
		axios.post("http://localhost:3003/auth/login", data).then(res=>{
			console.log(res.data)
		})
	}
	return (
		<div>
			<input 
			type="text" 
			onChange={(e)=>setUserName(e.target.value)}
			/>
			<input
			type="password"
			onChange={(e)=>{
				setPassword(e.target.value)
			}}
			/>
			<button
			onClick={login}
			>Login</button>
			
			
		</div>
	)
}
