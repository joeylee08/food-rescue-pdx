import { useState, useEffect, createContext } from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loginType, setLoginType] = useState(null)
	const [isAuthLoading, setIsAuthLoading] = useState(true)

  const [isSnack, setIsSnack] = useState(false)
  const [snackText, setSnackText] = useState('')

  const handleCloseSnack = () => {
    setIsSnack(false)
    setSnackText('')
  }

  const handleOpenSnack = (message) => {
    setSnackText(message)
    setIsSnack(true)
    setTimeout(() => handleCloseSnack(), 1100)
  }

  // useEffect(() => {
  //   // check for currentUser
  //   fetch('/currentuser')
  //     .then(res => {
	// 			if (!res.ok) return null
	// 			return res.json()
	// 		})
  //     .then(user => {
  //       setCurrentUser(user)
  //       setLoginType(user?.login_type ?? null)
  //     })
	// 		.catch(error => {
	// 			console.error('Session check failed:', error)
	// 			setCurrentUser(null)
	// 			setLoginType(null)
	// 		})
	// 		.finally(() => {
	// 			setIsAuthLoading(false)
	// 		})
  // }, [])

  const handleSetUser = (userObj) => {
    setCurrentUser(userObj)
  }

  const handleSetLogin = (loginType) => {
    setLoginType(loginType)
  }

  return (
    <UserContext.Provider value={{currentUser, loginType, isAuthLoading, handleSetUser, handleSetLogin, isSnack, snackText, handleOpenSnack, handleCloseSnack}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider