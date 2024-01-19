import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import UserContext from '../../config/UserContext'
function PrivateRoute() {
    const { userData } = useContext(UserContext)
    // const userData = false;
    return userData.loggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute