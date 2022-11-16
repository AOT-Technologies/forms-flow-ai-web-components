import axios from "axios";
export const httpPOSTRequest = (url,data)=>{
    axios.post(url,data)
}

export const httpGETRequest = (url,data)=>{
    axios.get(url,data)
}