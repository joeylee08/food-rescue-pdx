import { useState, useEffect, createContext } from 'react'

export const UserContext = createContext()

const UserProvider = ({children}) => {
	const dummyUser = {
		id: 1,
		username: "testuser",
		email: "test@example.com",
		login_type: "user",
		location: "Portland, OR"
	};
  const [currentUser, setCurrentUser] = useState(dummyUser)
	const [isAuthLoading, setIsAuthLoading] = useState(true)

  const [isSnack, setIsSnack] = useState(false)

  const showSnack = () => {
    setIsSnack(true)
    setTimeout(() => setIsSnack(false), 1100)
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
    <UserContext.Provider value={{currentUser, isAuthLoading, handleSetUser, isSnack, showSnack}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider