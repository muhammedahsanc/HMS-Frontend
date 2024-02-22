import { Dispatch, SetStateAction, ChangeEvent } from "react";
export type setStateType<T> = Dispatch<SetStateAction<T>>;

export type formDataProps = {
  username: string;
  password: string;
  conformPassword: string;
};
export type loginDataProps = {
  username: string;
  password: string;
};
export type AdministraterDataProps = {
  username: string;
  password: string;
  name:string;
  role:string;
};
export type StaffDataProps = {
  staff_id: string;
  username: string;
  password: string;
  name:string;
  category_name:string;
  qualification:string;

};
export type MainProps = {
  formData: formDataProps;
  setFormData: setStateType<formDataProps>;
};


export type InputChange = ChangeEvent<HTMLInputElement>;

export type ShowPasswordProps ={
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}
export type DecodedToken= {
  email:string;
  
}




