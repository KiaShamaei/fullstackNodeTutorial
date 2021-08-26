
import './App.scss';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Post from './pages/Post';
import { Navbar } from './components/Navbar';

const App = () => {

	return (



		<Router>
			<Navbar />
			<div className="App">
				<Switch>
					<Route exact path="/createpost" component={CreatePost} />
					<Route exact path="/posts/:id" component={Post} />
					<Route exact path="/" component={Home} />
				</Switch>
			</div>
		</Router>


	);
}

export default App;
