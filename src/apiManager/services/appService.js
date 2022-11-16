import { httpGETRequest, httpPOSTRequest } from "../httpRequestHandler";
import { API } from "../endpoints";
import { getToken } from "../../services/UserServices";

export const publicApplicationCreate = (url,data,...rest)=>{
    return  httpPOSTRequest(url,data);
};

export const fetchRoles = (callback)=>{
    const url = API.FORMIO_ROLES
    console.log("url",url)
    console.log("get token",getToken())
     httpGETRequest(url, {headers: {"Authorization" : `Bearer ${getToken()}`}}).then((res)=>{
            console.log("response",res.headers["x-jwt-token"])
            localStorage.setItem('formioToken',res.headers["x-jwt-token"])
             callback(res)
        })
}

export const getForms = (url,callback)=>{
    console.log("called this")
    httpGETRequest(url,{headers: {"x-jwt-token" : localStorage.getItem('formioToken')}}).then((res)=>{
        console.log("response",res)
        callback(res)
    })
}