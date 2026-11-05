import { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import MyListings from './MyListings';
import Account from './Account';
import Error from './Error';
import { UserContext } from "../context/UserContext";

function App() {
	const { currentUser } = useContext(UserContext);

	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				{currentUser && (
					<>
						<Route path="/mylistings" element={currentUser ? <MyListings /> : <Navigate to="/" replace />} />
						<Route path="/account" element={currentUser ? <Account /> : <Navigate to="/" replace />} />
					</>
				)}
				<Route path="*" element={<Error />} />
			</Routes>
		</>
	);
}

export default App