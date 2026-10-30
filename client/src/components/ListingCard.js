const ListingCard = ({ listing }) => {
	return (
		<div className="listingCard">
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