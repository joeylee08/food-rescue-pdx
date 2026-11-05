import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const UserInfo = () => {
  const {currentUser} = useContext(UserContext)

  if (currentUser.login_type === 'user') {
    return (
      <div className='userDetails'>
        <h1>{currentUser.username}</h1>
        <p>Member Since: {currentUser.created_at}</p>
      </div>
    )
  } else {
    return (
      <div className='userDetails'>
        <h1>{currentUser.business_name}</h1>
        <p>Member Since: {currentUser.created_at}</p>
      </div>
    )
  }
}

export default UserInfo