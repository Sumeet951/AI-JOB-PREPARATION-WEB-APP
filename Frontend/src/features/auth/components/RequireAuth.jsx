import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth({ allowedRoles }) {
    const { isLoggedIn, role } = useSelector((state) => state.auth);
    console.log("RequireAuth", { isLoggedIn, role });

    return isLoggedIn && allowedRoles.find((myRole) => myRole == role) ? (
        <Outlet/>
    ) :  (<Navigate to="login" />)
}

export default RequireAuth;