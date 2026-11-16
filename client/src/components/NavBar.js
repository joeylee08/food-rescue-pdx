import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { House, Scroll, CircleUserRound } from 'lucide-react'

const NavBar = () => {
	const { currentUser } = useContext(UserContext);

	return (
		<nav className="navbar">
			<ul className="linksList">
				{currentUser && (
					<>
						<li><NavLink to="/"><House size={34} className="navIcon" /></NavLink></li>
						<li><NavLink to="/mylistings"><Scroll size={34} className="navIcon" /></NavLink></li>
					</>
				)}
				<li>
					<NavLink to={currentUser ? '/account' : '/login'}>
						<CircleUserRound size={34} className="navIcon" />
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default NavBar;