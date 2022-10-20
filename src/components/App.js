
import { useEffect, useState } from "react";
import { Form } from "react-formio";
import { publicApplicationCreate } from "../apiManager/services/appService";
import { getFormUrl } from "../apiManager/services/formatterServices";

const App =({src})=>{
    const [url ,setUrl] =useState('');
    useEffect(()=>{
        console.log("new url")

        const newUrl = document.querySelector('formsflow-wc').getAttribute('url');
        setUrl(newUrl);
    },[src])
   const handleSubmit = (data)=>{
    const formId = data.form;
    const submissionId = data._id;
    const formUrl = getFormUrl(formId,submissionId);
    const formData = {
        formId,formUrl,submissionId
    }
    publicApplicationCreate(formData);
   } 
    return(
        <div className="container">
            <Form 
             src={url}
             onSubmit={(data)=>{
                handleSubmit(data);
             }}
             options = {{noAlerts : true,submitMessage:""}}
            
             onFormError={(error)=>{
                 console.log("error",error)
             }}
            />
        </div>
    )
}
export default App;