import { httpGETRequest, httpPOSTRequest } from "../httpRequestHandler";

// API call for internal application create
export const internalApplicationCreate = (url, data, callback) => {
  return httpPOSTRequest(url, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
  }).then((res) => {
    if (res) {
      callback(res);
    }
  }).catch((err)=>{
    console.error("error",err);
  });
};

//API call for external application create
export const externalApplicationCreate = (url, authToken, data, callback) => {
  return httpPOSTRequest(url, data, {
    headers: { Authorization: `Bearer ${authToken}` },
  }).then((res) => {
    if (res) {
      callback(res);
    }
  }).catch((err)=>{
    console.error("error",err)
  });
};

// API call for public application create
export const publicApplicationCreate = (url, data) => {
  return httpPOSTRequest(url, data).catch((err)=>{
    console.error("error",err);
  });
};

// API call for getting external authentication form json
export const getExternalAuthourizedForm = (url, token, callback) => {
 return httpGETRequest(url, { headers: { Authorization: `Bearer ${token}` } })
};

// API call for getting internal authentication form json
export const getInternalAUthorizedForms = (url, token, callback) => {
  httpGETRequest(url, { headers: { Authorization: `Bearer ${token}` } }).then(
    (res) => {
      callback(res.data);
    }
  ).catch((err)=>{
    console.error("error",err)
  });
};
