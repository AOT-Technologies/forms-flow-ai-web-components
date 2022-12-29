import React, { useEffect, useState } from "react";
import { Form } from "react-formio";
import {
  publicApplicationCreate,
  externalApplicationCreate,
  internalApplicationCreate,
} from "../apiManager/services/appService";

function RenderForms(props) {
  let { configFile, formData, anonymous } = props;
  const [isFormSubmitted, setIsFormsubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [anonymousUrl, setAnonymousUrl] = useState(null);
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    setMessage(document.querySelector("formsflow-wc").getAttribute("message"));
    setAuthToken(document.querySelector("formsflow-wc").getAttribute("token"));
  }, []);

  useEffect(() => {
    setAnonymousUrl(
      document.querySelector("formsflow-wc").getAttribute("anonymousUrl")
    );
  }, [anonymous]);

  // handle form submission
  const handleSubmit = (data) => {
    // Public application create url
    const publicApplicationCreateUrl = `http://localhost:5000/public/application/create`;
    // internal application create url
    const internalApplicationCreateUrl = `http://localhost:5000/embed/internal/application/create`;
    // external application create url
    const externalApplicationCreateUrl = `http://localhost:5000/embed/external/application/create`;
    // Application create api for not anonymous and authentication type internal
    if (!anonymous && configFile.authenticationType === "internal") {
      // API for creating application
      internalApplicationCreate(
        internalApplicationCreateUrl,
        { data: data.data, formId: formData._id },
        (data) => {
          if (data) {
            setIsFormsubmitted(true);
          }
        }
      );
    }
    // Application create api for not anonymous and authentication type external
    if (!anonymous && configFile.authenticationType === "external") {
      externalApplicationCreate(
        externalApplicationCreateUrl,
        authToken,
        { data: data.data, formId: formData._id },
        (data) => {
          if (data) {
            setIsFormsubmitted(true);
          }
        }
      );
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
      setIsFormsubmitted(true);
      publicApplicationCreate(publicApplicationCreateUrl, formData);
    }
  };
  return (
    <>
      {!isFormSubmitted ? (
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
