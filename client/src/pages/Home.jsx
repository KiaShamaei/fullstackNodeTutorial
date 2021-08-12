import React,{ useEffect,useState } from 'react';
import axios from 'axios';



const Home = () => {
	const [data,setData] = useState([])
	useEffect(() => {
		axios.get("http://localhost:3001/posts/")
			.then((res) => {
				console.log(res)
				setData(res.data)

			})
	},[])
	return (
		<>
			
			{data.map((value,index) => {
				return (<div className="post" key={index}>
					<div className="title" >{value.title}</div>
					<div className="body" >{value.postText}</div>
					<div className="username" >{value.username}</div>
				</div>)

			})}
			
		</>
	)
}

export default Home
