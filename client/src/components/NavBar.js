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
          <li><NavLink to='/findlisting'>Find Listing</NavLink></li>
          <li><NavLink to='/login'>Login</NavLink></li>
        </ul>
      </nav>
		)
	}
  else if (currentUser.login_type === 'user') {
    return (
      <nav className='navbar'>
        <ul className='linksList'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/mylistings'>Saved Listings</NavLink></li>
          <li><NavLink to='/findlisting'>Find Listing</NavLink></li>
          <li><NavLink to='/account'>Account</NavLink></li>
        </ul>
      </nav>
    )
  } else if (currentUser.login_type === 'business') {
    return (
      <nav className='navbar'>
        <ul className='linksList'>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/mylistings'>Active Listings</NavLink></li>
          <li><NavLink to='/createlisting'>Create Listing</NavLink></li>
          <li><NavLink to='/account'>Account</NavLink></li>
        </ul>
      </nav>
    )
  } 
  
}

export default NavBar;