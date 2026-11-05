import { useFormik } from 'formik'
import * as yup from 'yup'
import { useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const CreateEditListing = ({selectedListing, fetchListings, handleIsModal, handleAdd, handleDelete, currentSaved}) => {
  const location = useLocation()
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

  const sl = selectedListing

  const formikEdit = useFormik({
    initialValues: {
      product: sl.product,
      quantity: sl.quantity,
      expiration_date: sl.expiration_date,
      location: sl.location,
      notes: sl.notes,
      vegan_safe: sl.vegan_safe,
      non_dairy: sl.non_dairy,
      gluten_free: sl.gluten_free,
      nut_free: sl.nut_free,
      soy_free: sl.soy_free
    },
    validationSchema: fsCreateEdit,
    onSubmit: (values) => {
      const submitted = {
        ...values,
        "business_id": currentUser.id,
        "posted_by": currentUser.business_name
      }
      fetch(`/listingbyid/${sl.id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submitted, null, 2)
      })
      .then(res => {
        if (res.status === 200) {
          showSnack('Listing updated.')
          fetchListings()
        }
      })
      .catch(() => showSnack('Unable to update listing.'))
    }
  })

	const formikCreate = useFormik({
		initialValues: {
			product: '',
			quantity: 0,
			expiration_date: '',
			location: currentUser.location,
			notes: '',
			vegan_safe: false,
			non_dairy: false,
			gluten_free: false,
			nut_free: false,
			soy_free: false
		},
		validationSchema: fsCreateEdit,
		onSubmit: (values) => {
			const submitted = {
				...values,
				"business_id": currentUser.id,
				"posted_by": currentUser.business_name
			}
			fetch('/listings', {
				method: 'POST',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(submitted, null, 2)
			})
			.then(res => {
				if (res.status === 201) {
					formikCreate.resetForm();
					showSnack('Listing created.')
				}
			})
			.catch(() => showSnack('Unable to remove listing.'))
		}
	})

	const formikSchema = selectedListing ? formikEdit : formikCreate

	return (
		<>
			<div className='createEditListing'>
				<form className='createEditForm' onSubmit={formikSchema.handleSubmit}>
					<h3 className='formTitle'>{selectedListing ? 'Edit' : 'Create'} Listing</h3>
					<hr className='formHr'></hr>
					<h3 className='formTag'>Please enter your listing information.</h3>
					<div className='inputsWrapper'>
						<label htmlFor='product'>Product:</label>
						<input id='product' type='text' onChange={formikSchema.handleChange} value={formikSchema.values.product} placeholder="Enter Product"></input>
						<label htmlFor='quantity'>Quantity:</label>
						<input id='quantity' type='number' onChange={formikSchema.handleChange} value={formikSchema.values.quantity} placeholder="Enter Password"></input>
						<label htmlFor='expiration_date'>Expiration Date:</label>
						<input id='expiration_date' type='text' onChange={formikSchema.handleChange} value={formikSchema.values.expiration_date} placeholder="MM/DD/YY"></input>
						<label htmlFor='location'>Location:</label>
						<input id='location' type='text' onChange={formikSchema.handleChange} value={formikSchema.values.location} placeholder="Enter Location"></input>
						<label htmlFor='notes'>Enter Details:</label>
						<textarea id='notes' type='textarea' onChange={formikSchema.handleChange} value={formikSchema.values.notes} placeholder="Pickup Times, Contact Info, Additional Special Instructions."></textarea>
					</div>
					<div className='checkBoxes'>
							<div className='checkboxPair'>
								<label htmlFor='vegan_safe'>Vegan Safe:</label>
								<input id='vegan_safe' className='formCheckbox' type='checkbox' onChange={formikSchema.handleChange} checked={formikSchema.values.vegan_safe} value={formikSchema.values.vegan_safe}></input>
							</div>
							<div className='checkboxPair'>
								<label htmlFor='non_dairy'>Non Dairy:</label>
								<input id='non_dairy' className='formCheckbox' type='checkbox' onChange={formikSchema.handleChange} checked={formikSchema.values.non_dairy} value={formikSchema.values.non_dairy}></input>
							</div>
							<div className='checkboxPair'>
								<label htmlFor='gluten_free'>Gluten Free:</label>
							<input id='gluten_free' className='formCheckbox' type='checkbox' onChange={formikSchema.handleChange} checked={formikSchema.values.gluten_free} value={formikSchema.values.gluten_free}></input>
							</div>
							<div className='checkboxPair'>
								<label htmlFor='nut_free'>Nut Free:</label>
							<input id='nut_free' className='formCheckbox' type='checkbox' onChange={formikSchema.handleChange} checked={formikSchema.values.nut_free} value={formikSchema.values.nut_free}></input>
							</div>
							<div className='checkboxPair'>
								<label htmlFor='soy_free'>Soy Free:</label>
								<input id='soy_free' className='formCheckbox' type='checkbox' onChange={formikSchema.handleChange} checked={formikSchema.values.soy_free} value={formikSchema.values.soy_free}></input>
							</div>
						</div>
					<div className='formBtnWrapper'>
						<button className='listingBtn' type='submit'>{selectedListing ? 'EDIT' : 'CREATE'}</button>
						<button className='listingBtn' onClick={handleIsModal}>CANCEL</button>
					</div>
				</form>
				</div>
		</>
	)
  
}

export default CreateEditListing