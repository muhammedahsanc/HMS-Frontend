
import Cookies from 'js-cookie';
// import { useNavigate } from 'react-router-dom';
// const navigate = useNavigate();

const Logout = () =>{
    Cookies.remove('token');
    window.location.href = '/administrater-login';
  
   }
   export default Logout