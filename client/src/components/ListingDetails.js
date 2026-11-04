import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const ListingDetails = ({selectedListing, currentSaved}) => {
  const {currentUser, handleOpenSnack} = useContext(UserContext)
  
	return (
		<>
			<div className='listingDetails'>
				<div className="listingDetailsChild">
					<p className='productName'>{selectedListing.product}</p>
					<p>Quantity: {selectedListing.quantity}</p>
					<p>Expiration Date: {selectedListing.expiration_date}</p>
					<p>Posted By: {selectedListing.business_name}</p>
					<p>Location: {selectedListing.location}</p>
					<p>Additional Notes: {selectedListing.notes}</p>
					<img className='listingImg' src="/ragusauce.jpg" alt="Ragu Pasta Sauce" />
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