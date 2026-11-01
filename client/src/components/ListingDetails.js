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
					<h1>{selectedListing.product}</h1>
					<hr/>
					<h3>Quantity: {selectedListing.quantity}</h3>
					<h3>Expiration Date: {selectedListing.expiration_date}</h3>
					<h3>Posted By: {selectedListing.posted_by}</h3>
					<h3>Location: {selectedListing.location}</h3>
					<h3>Additional Notes: {selectedListing.notes}</h3>
					<Map center={selectedListing.location} items={[]} mapClass={'modalMap'}/>
					<p className='dietTag'>Vegan {selectedListing.vegan_safe ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
					<p className='dietTag'>Non Dairy {selectedListing.non_dairy ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
					<p className='dietTag'>Gluten Free {selectedListing.gluten_free ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
					<p className='dietTag'>Nut Free {selectedListing.nut_free ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
					<p className='dietTag'>Soy Free {selectedListing.soy_free ? <span className='greenCheck'>✔</span> : <span className='redX'>✗</span>}</p>
					<div className='formBtnWrapper'>
						<button className='modalBtn' onClick={alert('closed listing')}>CLOSE</button>
						<button className='modalBtn' id={selectedListing.id} onClick={alert('saved listing')}>{currentSaved.includes(selectedListing.id) ? 'UNSAVE' : 'SAVE'}</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default ListingDetails