import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from './Home';
import MyListings from './MyListings';
import FindListing from './FindListing';
import Account from './Account';
import Error from './Error';
import { UserContext } from "../context/UserContext";

function App() {
	const { currentUser } = useContext(UserContext);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/findlisting" element={<FindListing />} />
			<Route path="/login" element={<Login />} />
			
			{currentUser.login_type === "user" && (
				<>
					<Route path="/mylistings" element={<MyListings />} />
					<Route path="/account" element={<Account />} />
				</>
			)}

			{currentUser.login_type === "business" && (
				<>
					<Route path="/mylistings" element={<MyListings />} />
					<Route path="/account" element={<Account />} />
				</>
			)}

			<Route path="*" element={<Error />} />
		</Routes>
	);
}

export default App