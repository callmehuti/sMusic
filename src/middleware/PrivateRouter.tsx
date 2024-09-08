import { getLocalStorage } from '../utils/localStorage'
import { token } from '@constant/index'
import Layout from '@components/Layouts/Layout'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRouter() {
  const auth = getLocalStorage(token.ACT)
  return auth ? <Layout></Layout> : <Navigate to='/login' />
}

export default PrivateRouter
