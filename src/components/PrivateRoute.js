import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const PrivateRoute = ({ component: Component}, props) => {
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
          setLoading(false);
          return;
        }
        navigate("/login");
      }, []);
    
      return <>{loading ? "Loading..." : <Component {...props} />} </>;
}

export default PrivateRoute