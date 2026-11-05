import { NavLink } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

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
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/mylistings'>My Listings</NavLink></li>
          <li><NavLink to='/account'>Account</NavLink></li>
        </ul>
      </nav>
    )
  }
}

export default NavBar;