import { httpPOSTRequest } from "../httpRequestHandler";
import { API } from "../endpoints";
export const publicApplicationCreate = (url,data,...rest)=>{
    console.log("url",url);
    return  httpPOSTRequest(url,data);
};