
import './App.scss';
import {BrowserRouter as Router , Route , Switch , Link} from "react-router-dom"
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';

const App = () => {

	return (
		<div className="App">
		

			<Router>
			<Link to="/createpost">Create A post</Link>
			<Link to="/">Home</Link>
				<Switch>
					<Route exact path="/createpost" component={CreatePost}/>
					<Route exact path="/posts/:id" component={Post} />
					<Route exact path="/" component={Home}/>
				</Switch>
			</Router>

		</div>
	);
}

export default App;
