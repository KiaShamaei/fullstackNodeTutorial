import React ,{ useEffect, useState }from 'react'
import { useParams } from 'react-router-dom';
import  axios  from 'axios';


const Profile = () => {
	const {id} = useParams();
	const [username , setUsername] = useState("");
	const [posts , setPost] = useState("");
	useEffect(()=>{
		axios.get(`http://localhost:3003/auth/basicInfo/${id}`).then(e=>e.data).then(e=>
			setUsername(e.username))
	axios.get(`http://localhost:3003/posts/byUserId/${id}`).then(e=>{
		console.log(e)
	})

	}, [])
	return (
		<div className="profileContainer">
			<div className="profileInfo">Username : {username}</div>
			<div className="listOfPosts"></div>	
		</div>
	)
}


export default Profile
