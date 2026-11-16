import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from './Header'
import Footer from './Footer'
import Home from './Home';
import MyListings from './MyListings';
import Account from './Account';
import Login from './Login'
import Error from './Error';
import { UserContext } from "../context/UserContext";

function App() {
	const { currentUser } = useContext(UserContext);

	return (
		<div className='app'>
			<Header />
			<main>
				<Routes>
				<Route path="/" element={<Home />} />
				{currentUser ? (
					<>
						<Route path="/mylistings" element={<MyListings />} />
						<Route path="/account" element={<Account />} />
					</>
				) : (
					<>
						<Route path="/login" element={<Login />} />
					</>
				)}
				<Route path="*" element={<Error />} />
			</Routes>
			</main>
			<Footer />
		</div>
	);
}

export default App