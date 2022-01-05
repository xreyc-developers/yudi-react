import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const RequiredAuth = (props) => {
    const authUser = useSelector(state => state.auth.uid);
    const location = useLocation();

    if(!authUser) {
        return <Navigate to="/" state={{ from: location }} replace/>
    }

    return props.children;
}

export default RequiredAuth;