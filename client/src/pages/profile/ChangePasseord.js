import React , {useState} from 'react'

import  axios  from 'axios';

export const ChangePasseord = () => {
	const [oldpassword , setOldpasssword] = useState("");
	const [newpassword , setNewPassword] = useState("");
	const handleSubmit =()=>{
		axios.put("http://localhost:3003/auth/changepassword",{newpassword,oldpassword},{headers:{
			accessToken : sessionStorage.getItem("accessToken") 
		  }}).then (e=>console.log(e))
		
	}
	return (
		<div>
			<h1>Change password Page:</h1>
	
			<input type="text" placeholder="old password ..."
			onChange={(e)=>setOldpasssword(e.target.value)}
			 />
			<input type="text" placeholder="New password ..."
			onChange={(e)=>setNewPassword(e.target.value)}
			 />
			<button onClick={handleSubmit} >save</button>
		
		</div>
	)
}
