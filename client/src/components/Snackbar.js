import { UserContext } from '../context/UserContext'
import { useContext } from 'react'

const Snackbar = ({ message }) => {
  const {handleCloseSnack} = useContext(UserContext)
  
  return (
    <>
        <div className='snackbar' onClick={handleCloseSnack}>
          <h2>{message}</h2>
        </div>
    </>
  )
}

export default Snackbar