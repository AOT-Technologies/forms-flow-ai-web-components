import axios from "axios";
export const httpPOSTRequest = (url,data)=>{
    axios.post(url,data)
}