import React, { useEffect, useState } from "react";
import { Form } from "react-formio";
import {
  formSubmission,
  getForms,
  applicationCreate,
  publicApplicationCreate,
  externalApplicationCreate,
} from "../apiManager/services/appService";

function RenderForms(props) {
  let {configFile,formioToken,anonymous} = props
  const [formId, setFormId] = useState("");
  const [formData, setFormData] = useState([]);
  const [isFormSubmitted, setIsFormsubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [formioUrl, setFormioUrl] = useState(null);
  const [anonymousUrl,setAnonymousUrl] = useState(null);
  const [authToken,setAuthToken] = useState(null);
  // // const [webApiUrl, setWebApiUrl] = useState("");
  useEffect(() => {
    setMessage(document.querySelector("formsflow-wc").getAttribute("message"));
    setFormId(document.querySelector("formsflow-wc").getAttribute("formId"));
    setAuthToken(document.querySelector("formsflow-wc").getAttribute("token"));
  },[]);

  useEffect(() => {
    setFormioUrl(`${configFile?.formioUrl}/${formId}`);
    configFile &&
      getForms(`${configFile?.formioUrl}/${formId}`,formioToken, (res) => {
        setFormData(res.data);
      });
  }, [configFile, formId,formioToken]);
  useEffect(()=>{
    setAnonymousUrl(document.querySelector("formsflow-wc").getAttribute("anonymousUrl"));
  },[anonymous])

  const handleSubmit = (data) => {
    // For form submission
    const submissionUrl = `${configFile.formioUrl}/${formId}/submission`;
     // Public application create url
     const webUrl = `${configFile.webApiUrl}/public/application/create`;
     // application create url
     const applicationCreateUrl = `${configFile.webApiUrl}/api/application/create`;
    // external application create url
     const externalApplicationCreateUrl = `http://localhost:5000/embed/application/create`
    // For submission api
    if(!anonymous && configFile.authenticationType === 'internal'){
      formSubmission(submissionUrl, {data:data.data,metadata:data.metadata},anonymous, (res) => {
        const formId = res.data.form;
        const submissionId = res.data._id;
        // Form submission url for application create api
        const formUrl = `${configFile.formioUrl}/${formId}/submission/${submissionId}`;
        const webFormUrl = `${configFile.webBaseUrl}/submission/${submissionId}`;
        const formData = {
          formId,
          formUrl,
          submissionId,
          webFormUrl,
        };
        setIsFormsubmitted(true);
        // API for creating application
        
        if(!anonymous){
          applicationCreate(applicationCreateUrl, formData);
        }
        
      });
    }
    if(!anonymous && configFile.authenticationType === 'external'){
      console.log("submission data",data)
     
      externalApplicationCreate(externalApplicationCreateUrl,authToken, {data:data.data,formId});
      setIsFormsubmitted(true);
    }
    if(anonymous){
      const formId = data.form;
        const submissionId = data._id;
        // Form submission url for application create api
        const formUrl = `${configFile.formioUrl}/${formId}/submission/${submissionId}`;
        const webFormUrl = `${configFile.webBaseUrl}/submission/${submissionId}`;
        const formData = {
          formId,
          formUrl,
          submissionId,
          webFormUrl,
        };
        setIsFormsubmitted(true);
      publicApplicationCreate(webUrl,formData);
    };
  };
  return (
    <>
      {!isFormSubmitted ? (
        <Form
          src={anonymous && anonymousUrl}
          form={formData}
          url={formioUrl}
          onSubmit={(data) => {
            handleSubmit(data);
          }}
          options={{ noAlerts: true }}
          onFormError={(error) => {
            console.log("error", error);
          }}
        />
      )
    :  (
        <div className="text-center pt-5">
          <h1>{message}</h1>
        </div>
      )}
    </>
  );

}

export default RenderForms;
