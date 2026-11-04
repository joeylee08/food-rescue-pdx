const ListingCard = ({ listing, onSelect }) => {
	return (
		<div className="listingCard" onClick={() => onSelect(listing)}>
			<div className='itemAndQty'>
				<p className='productName'>{listing.product}</p>
				<p>Quantity: {listing.quantity}</p>
			</div>
			<div className='nameAndLocation'>
				<p>{listing.business_name}</p>
			</div>
			
			
		</div>
	)
}

export default ListingCard