import { BrowserRouter, Routes, Route } from "react-router-dom";
import {PageNotFound} from "../components/pageNotFound";
import {AdminAuth, ProtectedRoute} from "../components/admin";
// import {ProtectedRouteUser} from "../components/user";
import {Authpage} from "../components/protected-route";
import {Auth} from "../components/protected-route";
import ProtectedRouteAdministrater from "../components/administrater/ProtectedRouteAdministrater";
import AdministraterDashboard from "../components/administrater/AdministraterDashboard";

function Page() {

  return (
    <BrowserRouter>
      <Routes>
      <Route element={<Authpage />}>
          <Route path="/*" element={<Auth />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminAuth/>} />
        </Route>
      
        <Route element={<ProtectedRouteAdministrater />}>
          <Route path="/doctor-administrater" element={<AdministraterDashboard/>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Page;
