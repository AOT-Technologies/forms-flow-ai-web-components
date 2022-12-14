import { httpGETRequest, httpPOSTRequest } from "../httpRequestHandler";

export const publicApplicationCreate = (url,data)=>{
    return  httpPOSTRequest(url,data,{headers: {"Authorization" : `Bearer ${localStorage.getItem('authToken')}`}});
};

export const fetchRoles = (url,callback)=>{
    console.log("roles ur;",url)
     httpGETRequest(url, {headers: {"Authorization" : `Bearer ${localStorage.getItem('authToken')}`}}).then((res)=>{
            localStorage.setItem('formioToken',res.headers["x-jwt-token"])
             callback(res)
        })
}

export const getForms = (url,token,callback)=>{
    console.log("ivde hit aayi")
        httpGETRequest(url,{headers: {"x-jwt-token" : localStorage.getItem('formioToken')}}).then((res)=>{
            callback(res)
        })
    
}

export const formSubmission = (url,data,callback)=>{
    httpPOSTRequest(url,data,{headers: {"x-jwt-token" : localStorage.getItem('formioToken')}}).then((res)=>{
        callback(res);
    });
}   

export const verifyJWTtoken = (url,callback)=>{
    httpPOSTRequest(url,{},{headers: {"Authorization" : `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZW1haWwiOiJhYmlAZ21haWwuY29tIn0.r77ujsoqvxuviB-0Yn6bkKJwBLj_RO7ElgwfY2FIcl8`}}).then((res)=>{
        callback(res);
    });
}