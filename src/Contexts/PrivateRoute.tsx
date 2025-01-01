import { useAuth } from './AuthContext';
import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  client?: React.ReactNode;
  staff?: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ client, staff }) => {
  const {checkStaff, checkToken} = useAuth();

  if (!checkToken()) {
    return <Navigate to="/login" />;
  }

  if (checkStaff()) {
    return <>{staff}</>;
  } else if (!checkStaff()) {
    return <>{client}</>;
  } else {
    return <Navigate to="/login" />;
  }
  
};

export default PrivateRoute;