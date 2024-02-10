import { Route, Routes } from "react-router-dom";
import {PageNotFound} from "../pageNotFound";
// import { Signup } from "../auths";
import { AdminLogin } from "../admin";

function Auth() {
  return (
    <div>
      <Routes> 
        <Route path="/Adminlogin" element={<AdminLogin />} />
        {/* <Route path="signup" element={<Signup />} /> */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}


export default Auth;
