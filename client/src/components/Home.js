import NavBar from './NavBar'
import Header from './Header'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserContext'
import UserInfo from './UserInfo'
import ListingCard from './ListingCard'
import { Search } from "lucide-react";

const Home = () => {
  const { loginType, currentUser } = useContext(UserContext)
	const [listings, setListings] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

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
					
				</div>
			</div>
    </>
  )
}

export default Home