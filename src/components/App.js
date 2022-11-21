import { useEffect, useRef, useState } from "react";   
import {
  fetchRoles,
} from "../apiManager/services/appService";
import { initKeycloak } from "../services/UserServices";
import RenderForms from "./RenderForms";

const App = ({ src }) => {
  const [callForms, setCallForms] = useState(false);
//   useEffect(() => {
    // const newMessage = document
    //   .querySelector("formsflow-wc")
    //   .getAttribute("message");
    // const apiUrl = document
    //   .querySelector("formsflow-wc")
    //   .getAttribute("apiUrl");
    // const newUrl = document.querySelector("formsflow-wc").getAttribute("url");
    // setMessage(newMessage);
    // setWebApiUrl(apiUrl);
    // setUrl(newUrl);
//   }, [src]);


  useEffect(() => {
    const url = document.querySelector("formsflow-wc").getAttribute("keycloakUrl");
    const realm = document.querySelector("formsflow-wc").getAttribute("realm");
    const clientId = document.querySelector("formsflow-wc").getAttribute("clientId");
    initKeycloak({url,realm,clientId},() => {
      fetchRoles((res) => {
        setCallForms(true)
      });
    });
  }, []);



//   console.log("call forms",callForms)

//   const handleSubmit = (data) => {
//     setIsFormsubmitted(true);
//     const formId = data.form;
//     const submissionId = data._id;
//     const webUrl = `${webApiUrl}/public/application/create`;
//     const formUrl = `https://forms3.aot-technologies.com/form/${formId}/submission/${submissionId}`;
//     const webFormUrl = `https://app3.aot-technologies.com/form/${formId}/submission/${submissionId}`;
//     const formData = {
//       formId,
//       formUrl,
//       submissionId,
//       webFormUrl,
//     };
//     publicApplicationCreate(webUrl, formData);
//   };
  return (
    <div className="container">
      {callForms ? <RenderForms /> : <>Loading ....</>}
      {/* {!isFormSubmitted ? (<Form 
             src={url}
             onSubmit={(data)=>{
                handleSubmit(data);
             }}
             options = {{noAlerts : true}}
            
             onFormError={(error)=>{
                 console.log("error",error)
             }}
            /> ): <div className="text-center pt-5">
            <h1>{message}</h1>
          </div>} */}
    </div>
  );
};
export default App;
