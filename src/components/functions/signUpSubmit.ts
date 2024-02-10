import axios from "../../config/axiosinstance";
import { formDataProps,setStateType } from "../../interfaces";
import { notify, errorToast } from "../../utils";

export type SubmitProps = {
    formData: formDataProps;
    setFormData: setStateType<formDataProps>;
    error: string | null;
  };

const handleSignUpSubmit = async ({formData,setFormData,error}:SubmitProps) => {
    try {
      if (
        formData.username &&
        formData.password &&
        formData.conformPassword &&
        !error
      ) { 
        if (formData.password === formData.conformPassword){
          await axios.post("/addSignUpData/add", formData);
          notify("Successfully Completed");
          setFormData({ username: "", password: "", conformPassword: "" });
        } else {
          throw new Error("Passwords not match");
        }
      } else {
        throw new Error("Please fill completely");
      }
    } catch (error: any) {
      errorToast(error.message);
    }
  };


export  {handleSignUpSubmit}