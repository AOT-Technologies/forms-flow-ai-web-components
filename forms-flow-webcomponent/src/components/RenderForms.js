import React, { useEffect, useState } from "react";
import { Form,Formio} from "@aot-technologies/formio-react";
import {
  publicApplicationCreate,
  externalApplicationCreate,
  internalApplicationCreate,
} from "../apiManager/services/appService";
import LoadError from "./LoadError";
import FormioCustomEx from "formsflow-formio-custom-elements/dist/customformio-ex";


function RenderForms(props) {
  Formio.use(FormioCustomEx);
  let { configFile, formData, anonymous } = props;
  const [isFormSubmitted, setIsFormsubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [anonymousUrl, setAnonymousUrl] = useState(null);
  const [AUTH_TOKEN, setAUTH_TOKEN] = useState(null);
  const [errorText, setErrorText] = useState(null);


  useEffect(() => {
    setMessage(document.querySelector("formsflow-webembed").getAttribute("message"));
    setAUTH_TOKEN(document.querySelector("formsflow-webembed").getAttribute("token"));
  }, []);

  useEffect(() => {
    setAnonymousUrl(
      document.querySelector("formsflow-webembed").getAttribute("anonymousUrl")
    );
  }, [anonymous]);

  // handle form submission
  const handleSubmit = (data) => {
    // Public application create url
    const publicApplicationCreateUrl = `${configFile.webApiUrl}/public/application/create`;
    // internal application create url
    const internalApplicationCreateUrl = `${configFile.webApiUrl}/embed/internal/application/create`;
    // external application create url
    const externalApplicationCreateUrl = `${configFile.webApiUrl}/embed/external/application/create`;
    // Application create api for not anonymous and authentication type internal
    if (!anonymous && configFile.authenticationType === "internal") {
      // API for creating application
      internalApplicationCreate(
        internalApplicationCreateUrl,
        { data: data.data, formId: formData._id })
        .then((res) => {
        if (res.data) {
          setIsFormsubmitted(true);
        }
      }).catch((err)=>{
        console.error("error",err);
        setErrorText(err.message);
      });
    }
    // Application create api for not anonymous and authentication type external
    if (!anonymous && configFile.authenticationType === "external") {
      externalApplicationCreate(
        externalApplicationCreateUrl,
        AUTH_TOKEN,
        { data: data.data, formId: formData._id })
        .then((res) => {
        if (res.data) {
          setIsFormsubmitted(true);
        }
      }).catch((err)=>{
        console.error("error",err.message);
        setErrorText(err.message);
      });
    }
    // Application create and submission for anonymous
    if (anonymous) {
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
      publicApplicationCreate(publicApplicationCreateUrl, formData).then((res)=>{
        if(res){
          setIsFormsubmitted(true);
        }
      }).catch((err)=>{
        console.error("error",err);
        setErrorText(err.message);
      });
    }
  };
  return (
    <>
      {
      errorText ? (
        <LoadError text={errorText} />
      ) :
      !isFormSubmitted ? (
        <Form
          src={anonymous && anonymousUrl}
          form={formData && formData}
          onSubmit={(data) => {
            handleSubmit(data);
          }}
          options={{ noAlerts: true }}
          onFormError={(error) => {
            console.log("error", error);
          }}
        />
      ) : (
        <div className="text-center pt-5">
          <h1>{message}</h1>
        </div>
      )}
    </>
  );
}

export default RenderForms;
