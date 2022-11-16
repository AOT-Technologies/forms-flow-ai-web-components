import { httpGETRequest, httpPOSTRequest } from "../httpRequestHandler";
import { API } from "../endpoints";
import { getToken } from "../../services/UserServices";
const config = {
    headers: { Authorization: `Bearer ${getToken()}` }
};
export const publicApplicationCreate = (url,data,...rest)=>{
    return  httpPOSTRequest(url,data);
};

export const fetchRoles = (data,...rest)=>{
    console.log("here")
    const url = API.FORMIO_ROLES
    console.log("url",url)
    console.log("get token",getToken())
    return httpGETRequest(url, {headers: {"Authorization" : `Bearer ${getToken()}`}});
}