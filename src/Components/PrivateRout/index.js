import { useContext } from "react";
import { Navigate, useLocation  } from "react-router-dom";
import { userContext } from "../../App";

function PrivateRoute({ children }) {
    const [loggedInUser] = useContext(userContext)
    let location=useLocation();
    return (
          loggedInUser.email ? (
            children
          ) : (
            <Navigate to="/login" state={{ from: location }} replace />
          )
    );
}

export default PrivateRoute;