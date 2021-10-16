import React,{ useEffect,useState, useContext } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { AuthContext } from './../helpers/AuthContext';



const Home = () => {
	const {auth} = useContext(AuthContext)
	const [data,setData] = useState([])
	const [likedPost , setLikedPost ] = useState([])
	const history = useHistory();

	const handleLikes = (id)=>{
		axios.post("http://localhost:3003/likes",{PostId : id},{headers :{
			"accessToken" :  sessionStorage.getItem("accessToken")
		}}).then(res=>{
			setData(data.map(m=>{
				if(m.id === id){
					if(res.data.like){
					return{...m , Likes:[...m.Likes , "0"]}
					}else{
						let likeArr  = m.Likes
						likeArr.pop() ;
						return{...m , Likes:likeArr}

					}
					

				}else{
					return m 
				}
			}))
			if(likedPost.includes(id)){
				setLikedPost(likedPost.filter(m=>m != id))

			}else{
				setLikedPost([...likedPost , id])
			}
		})
	}
	useEffect(() => {
		if(!auth.status){
			history.push("/login")
		}else{
			axios.get("http://localhost:3003/posts/", {headers :{
			"accessToken" :  sessionStorage.getItem("accessToken")
		}})
			.then((res) => {
				setData(res.data.listOfPosts)
				setLikedPost(res.data.postLikes.map(m=>m.PostId))
			})
		}
	},[])

	return (
		<>

			{data.map((value,index) => {
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
						onClick={()=>{history.push(`/profile/${value.id}`)}}
						
						>{`write by :  ${value.username}`}</div>
						<div className="footer">
							<button
							className={likedPost.includes(value.id)? "likebtn red" :"likebtn"}
							onClick={()=>handleLikes(value.id)}
							>Like</button>
							<span>{value.Likes.length}</span>
						</div>
					</div>
				)

			})}

		</>
	)
}

export default Home
