import { useState , useEffect } from 'react';
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import { Navbar } from './components/Navbar';
import { Login } from './pages/Login';
import { Registeration } from './pages/Registeration';
import { AuthContext } from './helpers/AuthContext';
import axios from 'axios';
import Profile from './pages/profile/Profile';
import { ChangePasseord } from './pages/profile/ChangePasseord';


const App = () => {
	const [auth,setAuth] = useState({
	status:false,
	username:"",
	id:0
	}) ;

	useEffect(()=>{
		if(sessionStorage.getItem("accessToken")){
			axios.get("http://localhost:3003/auth/auth" , {
				headers : {
					accessToken :  sessionStorage.getItem("accessToken")
				}
			}).then(res=>{
				if(res.data.error){
					setAuth({...auth, status :false});
				}else{
					setAuth({ 
						status : true ,
						username : res.data.username , 
						id :res.data.id 
					})
				}
			})
		}
		
	}, [])
	return (
		<AuthContext.Provider value={{auth , setAuth}}>
		<Router>
			<Navbar />
			<div className="App">
				<Switch>
					<Route exact path="/createpost" component={CreatePost} />
					<Route exact path="/register" component={Registeration} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/posts/:id" component={Post} />
					<Route exact path="/profile/:id" component={Profile} />
					<Route exact path="/changepassword" component={ChangePasseord} />
					<Route exact path="/" component={Home} />
				</Switch>
			</div>
		</Router>
		</AuthContext.Provider>


	);
}

export default App;
