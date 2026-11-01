import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Map from './Map'

const ListingDetails = ({selectedListing, handleIsModal, currentSaved}) => {
  const location = useLocation()
  const path = location.pathname
  const {currentUser, handleOpenSnack} = useContext(UserContext)
  
	return (
		<>
			<div className='listingDetails'>
				<div className="listingDetailsChild">
					<div className='listingBtnWrapper'>
						<button className='listingBtn' onClick={() => alert('closed listing')}>CLOSE</button>
						<button className='listingBtn' id={selectedListing.id} onClick={() => alert('saved listing')}>{currentSaved.includes(selectedListing.id) ? 'UNSAVE' : 'SAVE'}</button>
					</div>
					<p className='productName'>{selectedListing.product}</p>
					<p>Quantity: {selectedListing.quantity}</p>
					<p>Expiration Date: {selectedListing.expiration_date}</p>
					<p>Posted By: {selectedListing.business_name}</p>
					<p>Location: {selectedListing.location}</p>
					<p>Additional Notes: {selectedListing.notes}</p>
					<img className='listingImg' src="/ragusauce.jpg" alt="Ragu Pasta Sauce" />
					{/* <Map center={selectedListing.location} items={[]} mapClass={'modalMap'}/> */}
					<div className='listingDietTags'>
						<p className='dietTag'>Vegan {selectedListing.vegan_safe ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
						<p className='dietTag'>Non Dairy {selectedListing.non_dairy ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
						<p className='dietTag'>Gluten Free {selectedListing.gluten_free ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
						<p className='dietTag'>Nut Free {selectedListing.nut_free ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
						<p className='dietTag'>Soy Free {selectedListing.soy_free ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default ListingDetails