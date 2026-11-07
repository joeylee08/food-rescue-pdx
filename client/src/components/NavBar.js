import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'
import { House, Scroll, CircleUserRound } from 'lucide-react'

const NavBar = () => {
  const {currentUser} = useContext(UserContext)
  
	if (currentUser === null) {
		return (
			<nav className='navbar'>
        <ul className='linksList'>
          <li><NavLink to='/'>Home</NavLink></li>
        </ul>
      </nav>
		)
	}
  else if (currentUser) {
    return (
      <nav className='navbar'>
        <ul className='linksList'>
          <li><NavLink to='/'><House size={29} className='navIcon' /></NavLink></li>
          <li><NavLink to='/mylistings'><Scroll size={29} className='navIcon' /></NavLink></li>
          <li><NavLink to='/account'><CircleUserRound size={29} className='navIcon' /></NavLink></li>
        </ul>
      </nav>
    )
  }
}

export default NavBar;