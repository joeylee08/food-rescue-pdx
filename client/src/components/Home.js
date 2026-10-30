import NavBar from './NavBar'
import Header from './Header'
import Footer from './Footer'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import UserInfo from './UserInfo'
import ListingCard from './ListingCard'
import { Search } from "lucide-react";
import Modal from './Modal.js'

const Home = () => {
  const { loginType, currentUser } = useContext(UserContext)
	const [listings, setListings] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [modal, setModal] = useState(false)
	const [selectedListing, setSelectedListing] = useState(null)

  useEffect(() => {
		console.log('LISTINGS FETCH ATTEMPTED')
    fetch('/listings')
			.then(res => {
				if (!res.ok) throw new Error('Unable to fetch listings.')
				return res.json()
			})
			.then(data => setListings(data))
			.catch(error => setError(error.message))
			.finally(() => setLoading(false))
  }, [])

	const renderedListings = listings.map(item => (
		<ListingCard key={item.id} listing={item} />
	))

  return (
    <>
      <Header title={'Food Rescue PDX'}/>
      {/* <NavBar/> */}
      {currentUser && <UserInfo />}
			{modal && listings?.[0] && <Modal selectedListing={listings[0]}/>}
			<div className='mainPage home'>
				<div className='child child1'>
					<div className='child child1a'>
						<div className='searchBar'>
							<Search className='searchIcon'/>
							<input className='searchQuery' placeholder='What are you looking for?'></input>
						</div>
						<div className='mapListings'>
							{renderedListings}
						</div>
					</div>
					<div className='child child1b'>
						<img className='googleMap' src="/map_placeholder.png" alt="Map of Portland" />
					</div>
				</div>
				<div className='child child2'>
					<h3 className='sectionHeading'>Our Community Impact</h3>
					<div className='child2a'>
						<div className='statCard'>
							<p className='count'>1,230</p>
							<p>Active Listings</p>
						</div>
						<div className='statCard'>
							<p className='count'>38</p>
							<p>Participating Businesses</p>
						</div>
						<div className='statCard'>
							<p className='count'>6,230</p>
							<p>Meals Rescued</p>
						</div>
					</div>
				</div>
				<div className='child child3'>
					<h3 className='sectionHeading'>About Food Rescue PDX</h3>
					<p>Every day, businesses have surplus food that could nourish someone in their community. Too often, that food goes to waste while individuals and families struggle with food insecurity.</p>
					<br/>
					<p>Food Rescue PDX connects local businesses with people who can put that food to good use. By making surplus food easier to discover and collect, we're building a more resourceful, connected, and sustainable Portland.</p>
				</div>
			</div>
			<Footer/>
    </>
  )
}

export default Home