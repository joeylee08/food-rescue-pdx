import NavBar from './NavBar'
import Header from './Header'
import Footer from './Footer'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import UserInfo from './UserInfo'
import ListingCard from './ListingCard'
import { Search, Van, Utensils } from "lucide-react";
import ListingDetails from './ListingDetails.js'

const Home = () => {
	const dummyListing = {
		id: 999,
		product: "22oz Ragu Pasta Sauce",
		quantity: 25,
		business_id: 1,
		business_name: "Sureway PDX",
		location: "1030 SW Jefferson St, Portland OR",
		expiration_date: "11/20/26",
		notes: "Please pick up between 3 and 6 PM. Ask for manager Luis.",
		vegan_safe: true,
		non_dairy: true,
		gluten_free: false,
		nut_free: true,
		soy_free: true,
		created_at: "2026-11-04T09:00:00"
	}
  const { loginType, currentUser } = useContext(UserContext)
	const [listings, setListings] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
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
			<div className='mainPage home'>
				<div className='child child0'>
					<div className='instructions'>
						<Search className='instructionIcon' size={45}/>
						<br/>
						<p>1. Find the food you need.</p>
					</div>
					<div className='instructions'>
						<Van className='instructionIcon' size={45}/>
						<br/>
						<p>2. Arrange a local pickup.</p>
					</div>
					<div className='instructions'>
						<Utensils className='instructionIcon' size={45}/>
						<br/>
						<p>3. Enjoy your food!</p>
					</div>
				</div>
				<div className='child child1'>
					<div className='child child1a'>
						<div className={`searchBar ${selectedListing ? 'isHidden' : ''}`}>
							<Search className='searchIcon'/>
							<input className='searchQuery' placeholder='What are you looking for?'></input>
						</div>
						<div className={`openListing ${selectedListing ? '' : 'isHidden'}`}>
							{listings?.[0] && <ListingDetails currentSaved={listings.slice(4)} selectedListing={listings[0]}/>}
							<div className='listingBtnBox'>
								<button className='listingBtn'>SAVE</button>
							<button className='listingBtn'>BACK</button>
							</div>
						</div>
						<div className={`mapListings ${selectedListing ? 'isHidden' : ''}`}>
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