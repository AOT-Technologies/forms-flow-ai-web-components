import React, { useEffect, useState } from 'react'
import { Form } from "react-formio";
import { formSubmission, getForms, publicApplicationCreate } from '../apiManager/services/appService';

function RenderForms() {
  const [formUrl,setFormUrl] = useState('');
  const [formData,setFormData] = useState([]);
  const [isFormSubmitted, setIsFormsubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [webApiUrl, setWebApiUrl] = useState("");

  useEffect(()=>{
    setFormUrl(document.querySelector('formsflow-wc').getAttribute('url'));
    setMessage(document.querySelector('formsflow-wc').getAttribute('message'));
    getForms(document.querySelector('formsflow-wc').getAttribute('url'),(res)=>{
      setFormData(res.data);
    });
  },[]);

  const handleSubmit = (data) => {
    const url = `https://app2.aot-technologies.com/formio/form/${formData._id}/submission`
    formSubmission(url,data,(res)=>{
      const formId = res.data.form;
      const submissionId = res.data._id;
      const webUrl = `${webApiUrl}/public/application/create`;
      const formUrl = `https://app2.aot-technologies.com/formio/form/${formId}/submission/${submissionId}`;
      const webFormUrl = `https://app2.aot-technologies.com/form/${formId}/submission/${submissionId}`;
      const formData = {
        formId,
        formUrl,
        submissionId,
        webFormUrl,
      };
      setIsFormsubmitted(true);
      publicApplicationCreate(formData);
    })
   
  };
  return (
    <>
    {
      !isFormSubmitted ? <Form
      form={formData}
      url={formUrl}
      onSubmit={(data)=>{
       handleSubmit(data);
    }}
    options = {{noAlerts : true}}
    onFormError={(error)=>{
        console.log("error",error)
    }} 
    />
    : <div className="text-center pt-5">
    <h1>{message}</h1>
  </div>
    } 
    </>
  );
};

export default RenderForms;