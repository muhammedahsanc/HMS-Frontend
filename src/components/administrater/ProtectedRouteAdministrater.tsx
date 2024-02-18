import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { Navigate, Outlet} from "react-router-dom";

function ProtectedRouteAdministrater() {
  const {userList} = useSelector((state:any)=>state.userData)
  const token = Cookies.get('token');
  if(token && userList.role){
    return (
     <> 
        <Outlet/>
      </>
      ) 
}else if(!token && !userList.role){
    return (
        <>
        <Navigate to="/administrater-login" />   
      </>
      )  
}
}
export default ProtectedRouteAdministrater   