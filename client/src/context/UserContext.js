import { useState, useEffect, createContext } from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) => {
	const dummyUser = {
		id: 1,
		username: "testuser",
		business_name: 'The Poo Store',
		email: "test@example.com",
		login_type: "business",
		location: "Portland, OR"
	};
  const [currentUser, setCurrentUser] = useState(dummyUser)
	const [isAuthLoading, setIsAuthLoading] = useState(true)

  const [isSnack, setIsSnack] = useState(false)
	const [snackMsg, setSnackMsg] = useState('')

  const showSnack = (message) => {
		setSnackMsg(message)
    setIsSnack(true)
    setTimeout(() => {
			setIsSnack(false)
			setSnackMsg('')
		}, 1100)
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
  //     })
	// 		.catch(error => {
	// 			console.error('Session check failed:', error)
	// 			setCurrentUser(null)
	// 		})
	// 		.finally(() => {
	// 			setIsAuthLoading(false)
	// 		})
  // }, [])

  const handleSetUser = (userObj) => {
    setCurrentUser(userObj)
  }

  return (
    <UserContext.Provider value={{currentUser, isAuthLoading, handleSetUser, isSnack, snackMsg, showSnack}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider