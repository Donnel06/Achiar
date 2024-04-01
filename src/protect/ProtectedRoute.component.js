import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ element, allowedRoles, ...rest }) => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.userReducer);

  useEffect(() => {
    if (!userData._id) {
      navigate('/sign-in', { replace: true });
    }  
    if (!allowedRoles.includes(userData.role)) {
      navigate('/unauthorized', { replace: true });
    } 
    if(userData._id && !allowedRoles.includes(userData.role)){
      navigate('/', { replace: true });
    }
  }, [userData._id, userData.role, allowedRoles, navigate]);

  return userData._id && allowedRoles.includes(userData.role) ? element : null;
};

export default ProtectedRoute;
