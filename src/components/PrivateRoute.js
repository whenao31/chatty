import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    
    if (loading) return <h1>loading...</h1>

    if (!user) return <Navigate to="/login" />;

    return <>{ children }</>
}

export default PrivateRoute