import axios from "axios";
export const httpPOSTRequest = (url,data,header)=>{
   return axios.post(url,data,header)
}

export const httpGETRequest = (url,data,header)=>{
   return axios.get(url,data,header)
}