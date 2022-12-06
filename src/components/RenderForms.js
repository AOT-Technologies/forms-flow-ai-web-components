import React, { useEffect, useState } from "react";
import { Form } from "react-formio";
import {
  formSubmission,
  getForms,
  publicApplicationCreate,
} from "../apiManager/services/appService";

function RenderForms() {
  const [formId, setFormId] = useState("");
  const [formData, setFormData] = useState([]);
  const [isFormSubmitted, setIsFormsubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [formioUrl, setFormioUrl] = useState(null);
  // const [webApiUrl, setWebApiUrl] = useState("");
  const [keyCloakData, setKeyCloakData] = useState(null);

  useEffect(() => {
    setMessage(document.querySelector("formsflow-wc").getAttribute("message"));
    setKeyCloakData(
      JSON.parse(
        document.querySelector("formsflow-wc").getAttribute("keycloakConfig")
      )
    );
    setFormId(document.querySelector("formsflow-wc").getAttribute("formId"));
  }, []);

  useEffect(() => {
    setFormioUrl(`${keyCloakData?.formioUrl}/${formId}`);
    keyCloakData &&
      getForms(`${keyCloakData?.formioUrl}/${formId}`, (res) => {
        setFormData(res.data);
      });
  }, [keyCloakData, formId]);

  const handleSubmit = (data) => {
    // For form submission
    const submissionUrl = `${keyCloakData.formioUrl}/${formId}/submission`;
    // For submission api
    formSubmission(submissionUrl, data, (res) => {
      const formId = res.data.form;
      const submissionId = res.data._id;
      // Public application create url
      // const webUrl = `${keyCloakData.webBaseUrl}/public/application/create`;
      // Form submission url for application create api
      const formUrl = `${keyCloakData.formioUrl}/${formId}/submission/${submissionId}`;
      const webFormUrl = `${keyCloakData.webBaseUrl}/submission/${submissionId}`;
      const formData = {
        formId,
        formUrl,
        submissionId,
        webFormUrl,
      };
      setIsFormsubmitted(true);
      // API for creating application
      const applicationCreateUrl = `${keyCloakData.webBaseUrl}/api/application/create`;
      publicApplicationCreate(applicationCreateUrl, formData);
    });
  };
  return (
    <>
      {!isFormSubmitted ? (
        <Form
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
      ) : (
        <div className="text-center pt-5">
          <h1>{message}</h1>
        </div>
      )}
    </>
  );
}

export default RenderForms;
