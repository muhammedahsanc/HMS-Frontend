import axios from "axios";
// import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "http://localhost:4000/",
});
// instance.defaults.headers.common["Authorization"]=Cookies.get("token");

export default instance;
