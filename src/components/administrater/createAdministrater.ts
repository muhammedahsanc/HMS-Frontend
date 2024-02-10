
import { errorToast } from '../../utils';
import axios from "../../config/axiosinstance";
import { toast } from 'react-toastify';
const createAdministrater = async(administraterData:any) =>{

    try {
        if(administraterData.name &&
          administraterData.password &&
          administraterData.role&&
          administraterData.username
          ){
            const data =  await axios.post("/admin/createAdministrater", administraterData);
            toast("Added")
          if (data instanceof Error) throw new Error("Something went wrong");
      
          }else{
            errorToast("Fill Completely")
            throw new Error("Please fill completely");
      
          }
       } catch (error:any) {
        errorToast(error.message)
        console.error(error.message)
       } 

}
export default createAdministrater