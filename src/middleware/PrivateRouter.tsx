import React from 'react'
import { getLocalStorage } from '../utils/localStorage'
import { token } from '../constants'
import Layout from '../components/Layouts/Layout';
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRouter() {
  const auth = getLocalStorage(token.ACT);
  return auth ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  )
}

export default PrivateRouter
