import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useState, useContext, useEffect } from 'react'
import { UserContext } from '../context/UserContext'
import Snackbar from './Snackbar'

const Login = () => {
  const navigate = useNavigate()
  const {isSnack, snackText, handleCloseSnack, handleOpenSnack} = useContext(UserContext)
  const {handleSetUser, handleSetLogin} = useContext(UserContext)
  
  const [isLogin, setIsLogin] = useState(true)

  const handleToggleForm = () => {
    setIsLogin(isLogin => !isLogin)
  }

  const fsLogin = yup.object().shape({
    login_type: yup.string().required('Please select an account type.'),
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password.")
  })

  const fsSignup= yup.object().shape({
    login_type: yup.string().required('Please select an account type.'),
    email: yup.string().email('Please enter a valid email.').required('Please enter an email.'),
    username: yup.string().required("Please enter a username."),
    password: yup.string().required("Please enter a password."),
		confirm_password: yup.string().required("Please confirm your password.")
  })

  const formikLogin = useFormik({
    initialValues: {
      login_type: '',
      username: '',
      password: '' 
    },
    validationSchema: fsLogin,
    onSubmit: (values) => {
      fetch('/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2)
      })
      .then(res => {
        if (res.status === 200) return res.json()
        else throw Error

      })
      .then(data => {
        handleSetUser(data)
        formikLogin.resetForm();
        navigate('/')
      })
      .catch(() => {
        handleOpenSnack('Invalid user credentials.')
      })
    }
  })

  const formikSignup = useFormik({
    initialValues: {
      login_type: '',
      business_name: '',
      email: '',
      username: '',
      password: '',
			confirm_password: ''
    },
    validationSchema: fsSignup,
    onSubmit: (values) => {
      fetch('/signup', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2)
      })
      .then(res => {
        if (res.status === 201) return res.json()
      })
      .then(data => {
        handleSetUser(data)
        formikSignup.resetForm();
        navigate('/')
      })
      .catch(() => {
        handleOpenSnack('Username already exists.')
      })
    }
  })

  if (isLogin) {
    return (
      <div className='mainPage login'>
        <div className='form'>
          <form className='loginForm' onSubmit={formikLogin.handleSubmit}>
            <button className='listingBtn' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Signup' : 'to Login'}</button>
            <h1 className='formTitle'>Food Rescue PDX Login</h1>
            <hr className='loginBar' />
            <label htmlFor='login_type'>Account Type:</label>
            <select id='login_type' className='loginInput' onChange={formikLogin.handleChange} value={formikLogin.values.login_type}>
              <option value=''>Select an Account Type</option>
              <option value='user'>User</option>
              <option value='business'>Business</option>
            </select>
            <label htmlFor='username'>Username:</label>
            <input id='username' className='loginInput' type='text' onChange={formikLogin.handleChange} value={formikLogin.values.username} placeholder="Enter Username"></input>
            <label htmlFor='username'>Password:</label>
            <input id='password' className='loginInput' type='password' onChange={formikLogin.handleChange} value={formikLogin.values.password} placeholder="Enter Password"></input>
            <div id='loginButtons'>
              <button className='listingBtn' type='submit'>LOGIN</button>
            </div>
          </form>
        </div>
      {isSnack ? <Snackbar /> : null}
      </div>
    )
  } else {
    return (
      <div className='mainPage login'>

					<div className='form'>
						<form className='loginForm' onSubmit={formikSignup.handleSubmit}>
							<button className='listingBtn' type='button' onClick={() => handleToggleForm()}>{isLogin ? 'to Signup' : 'to Login'}</button>
							<h1 className='formTitle'>Food Rescue PDX Sign Up</h1>
							<hr className='loginBar' />
							<label htmlFor='login_type'>Account Type:</label>
							<select id='login_type' className='loginInput' onChange={formikSignup.handleChange} value={formikSignup.values.login_type}>
								<option value=''>Select an Account Type</option>
								<option value='user'>User</option>
								<option value='business'>Business</option>
							</select>
							{formikSignup.values.login_type == 'business' ? <label htmlFor='email'>Business Name:</label> : null}
							{formikSignup.values.login_type == 'business' ? <input id='business_name' className='loginInput' type='text' onChange={formikSignup.handleChange} value={formikSignup.values.business_name} placeholder="Enter Business Name"></input> : null}
							<label htmlFor='email'>Email:</label>
							<input id='email' className='loginInput' type='email' onChange={formikSignup.handleChange} value={formikSignup.values.email} placeholder="Enter Email"></input>
							<label htmlFor='username'>Username:</label>
							<input id='username' className='loginInput' type='text' onChange={formikSignup.handleChange} value={formikSignup.values.username} placeholder="Enter Username"></input>
							<label htmlFor='password'>Password:</label>
							<input id='password' className='loginInput' type='password' onChange={formikSignup.handleChange} value={formikSignup.values.password} placeholder="Enter Password"></input>
							<label htmlFor='password'>Confirm Password:</label>
							<input id='confirm_password' className='loginInput' type='password' onChange={formikSignup.handleChange} value={formikSignup.values.confirm_password} placeholder="Confirm Password"></input>
							<div id='loginButtons'>
								<button className='listingBtn' type='submit'>SIGNUP</button>
							</div>
						</form>
					</div>

				{isSnack ? <Snackbar message={snackText} handleCloseSnack={handleCloseSnack} /> : null}
      </div>
    )
  }
  
}

export default Login