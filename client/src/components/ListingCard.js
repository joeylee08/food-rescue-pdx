const ListingCard = ({ listing }) => {
	return (
		<div className="listingCard">
			<h3>{listing.product}</h3>
			<p>{listing.business_name}</p>
			<p>Quantity: {listing.quantity}</p>
			<p>{listing.location}</p>
		</div>
	)
}

export default ListingCard