import React,{ useEffect,useState} from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Home = () => {
	const [data,setData] = useState([])
	const history =useHistory()
	useEffect(() => {
		axios.get("http://localhost:3003/posts/")
			.then((res) => {
				console.log(res)
				setData(res.data)

			})
	},[])
	return (
		<>
			
			{data.map((value,index) => {
				return (
				<div 
				className="post" 
				key={index}
				onClick={()=>history.push(`/posts/${value.id}`)} 
				
				>
					<div className="title" >{value.title}</div>
					<div className="body" >{value.postText}</div>
					<div className="username" >{value.username}</div>
				</div>
				)

			})}
			
		</>
	)
}

export default Home
