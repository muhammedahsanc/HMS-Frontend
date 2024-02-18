import { Route, Routes } from "react-router-dom";
import {PageNotFound} from "../pageNotFound";
// import { Signup } from "../auths";
import { AdminLogin } from "../admin";
import AdministraterDashboard from "../administrater/AdministraterDashboard";
import  Login  from "../administrater/Login";

function Auth() {
  return (
    <div>
      <Routes> 
        <Route path="/Adminlogin" element={<AdminLogin />} />
        <Route path="/administrater-login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}


export default Auth;
