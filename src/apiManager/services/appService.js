import { httpGETRequest, httpPOSTRequest } from "../httpRequestHandler";

export const applicationCreate = (url,data)=>{
    return  httpPOSTRequest(url,data,{headers: {"Authorization" : `Bearer ${localStorage.getItem('authToken')}`}});
};

export const externalApplicationCreate = (url,authToken,data)=>{
    return  httpPOSTRequest(url,data,{headers: {"Authorization" : `Bearer ${authToken}`}});
};

export const publicApplicationCreate = (url,data)=>{
    return  httpPOSTRequest(url,data);
}

export const fetchRoles = (url,callback)=>{
     httpGETRequest(url, {headers: {"Authorization" : `Bearer ${localStorage.getItem('authToken')}`}}).then((res)=>{
            localStorage.setItem('formioToken',res.headers["x-jwt-token"])
             callback(res.headers["x-jwt-token"])
        })
}

export const getForms = (url,token,callback)=>{
    if(token){
        httpGETRequest(url,{headers: {"x-jwt-token" : token}}).then((res)=>{
            callback(res);
        });
    }
}

export const formSubmission = (url,data,anonymous,callback)=>{
    if(anonymous){
        httpPOSTRequest(url,data).then((res)=>{
            callback(res);
        });
    }
    if(!anonymous){
        httpPOSTRequest(url,data,{headers: {"x-jwt-token" : localStorage.getItem('formioToken')}}).then((res)=>{
            callback(res);
        });
    }
   
}   

export const verifyJWTtoken = (url,token,callback)=>{
    httpPOSTRequest(url,{},{headers: {"Authorization" : `Bearer ${token}`}}).then((res)=>{
        localStorage.setItem('formioToken',res.data.access_token);
        callback(res.data);
    });
}

