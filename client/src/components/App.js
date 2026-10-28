import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Home from './Home';
import MyListings from './MyListings';
import FindListing from './FindListing';
import CreateListing from './CreateListing';
import Account from './Account';
import Error from './Error';
import { UserContext } from "../context/UserContext";

function App() {
	const { loginType } = useContext(UserContext);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/findlisting" element={<FindListing />} />
			<Route path="/login" element={<Login />} />
			
			{loginType === "user" && (
				<>
					<Route path="/mylistings" element={<MyListings />} />
					<Route path="/account" element={<Account />} />
				</>
			)}

			{loginType === "business" && (
				<>
					<Route path="/mylistings" element={<MyListings />} />
					<Route path="/createlisting" element={<CreateListing />} />
					<Route path="/account" element={<Account />} />
				</>
			)}

			<Route path="*" element={<Error />} />
		</Routes>
	);
}

export default App