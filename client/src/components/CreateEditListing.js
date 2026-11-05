import { useFormik } from 'formik'
import * as yup from 'yup'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const CreateEditListing = ({selectedListing, fetchListings, handleIsModal}) => {
  const {currentUser, showSnack} = useContext(UserContext)

  const fsCreateEdit = yup.object().shape({
    product: yup.string().max(28).required('Please enter a product name.'),
    quantity: yup.number().required('Please enter a quantity.').min(1),
    expiration_date: yup.string().required("Please enter an expiration date."),
    location: yup.string().required("Please enter a location."),
    notes: yup.string(),
    vegan_safe: yup.boolean(),
    non_dairy: yup.boolean(),
    gluten_free: yup.boolean(),
    nut_free: yup.boolean(),
    soy_free: yup.boolean()
  })

	const isEditing = !!selectedListing

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			product: selectedListing?.product ?? '',
			quantity: selectedListing?.quantity ?? 0,
			expiration_date: selectedListing?.expiration_date ?? '',
			location: selectedListing?.location ?? currentUser?.location ?? '',
			notes: selectedListing?.notes ?? '',
			vegan_safe: selectedListing?.vegan_safe ?? false,
			non_dairy: selectedListing?.non_dairy ?? false,
			gluten_free: selectedListing?.gluten_free ?? false,
			nut_free: selectedListing?.nut_free ?? false,
			soy_free: selectedListing?.soy_free ?? false
		},
		validationSchema: fsCreateEdit,
		onSubmit: async (values, { resetForm }) => {
			const url = isEditing ? `/listingbyid/${selectedListing.id}` : '/listings';
			const method = isEditing ? 'PATCH' : 'POST';

			try {
				const response = await fetch(url, {
					method,
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(values)
				});
				if (!response.ok) throw new Error('Request failed.');

				showSnack(isEditing ? 'Listing updated.' : 'Listing created.');
				fetchListings();

				if (!isEditing) resetForm();
			} catch (error) {
				showSnack(isEditing ? 'Unable to update listing.' : 'Unable to create listing.');
			}
		}
	});
	
	return (
		<>
			<div className='createEditListing'>
				<form className='createEditForm' onSubmit={formik.handleSubmit}>
					<h3 className='formTitle'>{isEditing ? 'Edit' : 'Create'} Listing</h3>
					<hr className='formHr'></hr>
					<h3 className='formTag'>Please enter your listing information.</h3>
					<div className='inputsWrapper'>
						<label htmlFor='product'>Product:</label>
						<input id='product' type='text' onChange={formik.handleChange} value={formik.values.product} placeholder="Enter Product"></input>
						<label htmlFor='quantity'>Quantity:</label>
						<input id='quantity' type='number' onChange={formik.handleChange} value={formik.values.quantity} placeholder="Enter Password"></input>
						<label htmlFor='expiration_date'>Expiration Date:</label>
						<input id='expiration_date' type='text' onChange={formik.handleChange} value={formik.values.expiration_date} placeholder="MM/DD/YY"></input>
						<label htmlFor='location'>Location:</label>
						<input id='location' type='text' onChange={formik.handleChange} value={formik.values.location} placeholder="Enter Location"></input>
						<label htmlFor='notes'>Enter Details:</label>
						<textarea id='notes' type='textarea' onChange={formik.handleChange} value={formik.values.notes} placeholder="Pickup Times, Contact Info, Additional Special Instructions."></textarea>
					</div>
					<div className='checkBoxes'>
							<div className='checkboxPair'>
								<label htmlFor='vegan_safe'>Vegan Safe:</label>
								<input id='vegan_safe' className='formCheckbox' type='checkbox' onChange={formik.handleChange} checked={formik.values.vegan_safe} value={formik.values.vegan_safe}></input>
							</div>
							<div className='checkboxPair'>
								<label htmlFor='non_dairy'>Non Dairy:</label>
								<input id='non_dairy' className='formCheckbox' type='checkbox' onChange={formik.handleChange} checked={formik.values.non_dairy} value={formik.values.non_dairy}></input>
							</div>
							<div className='checkboxPair'>
								<label htmlFor='gluten_free'>Gluten Free:</label>
							<input id='gluten_free' className='formCheckbox' type='checkbox' onChange={formik.handleChange} checked={formik.values.gluten_free} value={formik.values.gluten_free}></input>
							</div>
							<div className='checkboxPair'>
								<label htmlFor='nut_free'>Nut Free:</label>
							<input id='nut_free' className='formCheckbox' type='checkbox' onChange={formik.handleChange} checked={formik.values.nut_free} value={formik.values.nut_free}></input>
							</div>
							<div className='checkboxPair'>
								<label htmlFor='soy_free'>Soy Free:</label>
								<input id='soy_free' className='formCheckbox' type='checkbox' onChange={formik.handleChange} checked={formik.values.soy_free} value={formik.values.soy_free}></input>
							</div>
						</div>
					<div className='formBtnWrapper'>
						<button className='listingBtn' type='submit'>{isEditing ? 'EDIT' : 'CREATE'}</button>
						<button className='listingBtn' type='button' onClick={handleIsModal}>CANCEL</button>
					</div>
				</form>
				</div>
		</>
	)
  
}

export default CreateEditListing