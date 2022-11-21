import { httpGETRequest, httpPOSTRequest } from "../httpRequestHandler";
import { API } from "../endpoints";

export const publicApplicationCreate = (url,data,...rest)=>{
    return  httpPOSTRequest(url,data);
};

export const fetchRoles = (callback)=>{
    const url = API.FORMIO_ROLES
     httpGETRequest(url, {headers: {"Authorization" : `Bearer ${localStorage.getItem('authToken')}`}}).then((res)=>{
            localStorage.setItem('formioToken',res.headers["x-jwt-token"])
             callback(res)
        })
}

export const getForms = (url,callback)=>{
    httpGETRequest(url,{headers: {"x-jwt-token" : localStorage.getItem('formioToken')}}).then((res)=>{
        callback(res)
    })
}