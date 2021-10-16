import React ,{ useEffect, useState }from 'react'
import { useParams , useHistory} from 'react-router-dom';
import  axios  from 'axios';


const Profile = () => {
	const history = useHistory();
	const {id} = useParams();
	const [username , setUsername] = useState("");
	const [posts , setPost] = useState([]);
	useEffect(()=>{
		axios.get(`http://localhost:3003/auth/basicInfo/${id}`).then(e=>e.data).then(e=>
			setUsername(e.username))
	axios.get(`http://localhost:3003/posts/byUserId/${id}`).then(e=>{
		console.log(e.data)
	if(e.data){
		setPost(e.data)
	}
	})

	}, [])
	return (
		<div className="profileContainer">
			<div className="profileInfo">Username : {username}</div>
			<button onClick={()=>{
				history.push("/changepassword")

			}}>Edit Password</button>
			<div className="listOfPosts">

			{posts.map((value,index) => {
				return (
					<div
						className="post"
						key={index}
					>
						<div className="title" 
							onClick={() => {
								history.push(`/posts/${value.id}`)
							}} 
						>{value.title}</div>
						<div className="body"
						 >
							{value.postText}
						</div>
						<div className="username" 
						>{`write by :  ${value.username}`}</div>
						<div className="footer">
							<button
							>Like</button>
							<span>{value && value.Likes && value.Likes.length}</span>
						</div>
					</div>
				)

			})}
			</div>	
		</div>
	)
}


export default Profile
