import { authSelector } from "features/auth/auth.slice";
import { useAppSelector } from "hooks/redux";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRout({children , role = "user"} : { children : ReactElement , role ?: string}) {
    const authSelect = useAppSelector(authSelector);

    if(!authSelect.token){
      return <Navigate to="/login" ></Navigate>
    }
    return children; 
}

export default ProtectedRout;