import { CircleUserRound } from "lucide-react";
import { useState, useEffect, useRef } from 'react'
import NavBar from "./NavBar";

const Header = () => {
	const [menuOpen, setMenuOpen] = useState(false)
	const menuRef = useRef(null)

	const toggleMenu = () => {
		setMenuOpen(prev => !prev)
	}
	useEffect(() => {
		const handleOutsideClick = (e) => {
			if (menuRef.current && !menuRef.current.contains(e.target)) {
				setMenuOpen(false)
			}
		}
		document.addEventListener('pointerdown', handleOutsideClick)

		return () => {
			document.removeEventListener('pointerdown', handleOutsideClick)
		}
	}, [])

  return (
		<>
			<div className='header' ref={menuRef}>
				<div className='headerWrapper'>
					<h3 className='headerText'>Food Rescue <span>PDX</span></h3>
				</div>
				<NavBar />
				{menuOpen && <div className='loginDropdown'>
						<button className='listingBtn'>User</button>
						<button className='listingBtn'>Business</button>
				</div>}
			</div>
			
		</>
  )
}

export default Header