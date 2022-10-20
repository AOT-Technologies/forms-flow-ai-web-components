
import { useEffect, useState } from "react";
import { Form } from "react-formio";
import { publicApplicationCreate } from "../apiManager/services/appService";
import { getFormUrl } from "../apiManager/services/formatterServices";

const App =({src})=>{
    const [isFormSubmitted,setIsFormsubmitted] = useState(false);
    const [message,setMessage] = useState('');
    const [url ,setUrl] =useState('');
    useEffect(()=>{
        const newMessage = document.querySelector('formsflow-wc').getAttribute('message');
        console.log("message",newMessage)
        const newUrl = document.querySelector('formsflow-wc').getAttribute('url');
        setMessage(newMessage);
        setUrl(newUrl);
    },[src])
   const handleSubmit = (data)=>{
    setIsFormsubmitted(true)
    const formId = data.form;
    const submissionId = data._id;
    const formUrl = getFormUrl(formId,submissionId);
    const formData = {
        formId,formUrl,submissionId
    };
    publicApplicationCreate(formData);
   } 
   console.log("form submitted",isFormSubmitted)
    return(
        <div className="container">
            {!isFormSubmitted ? (<Form 
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
          </div>}
        </div>
    );
};
export default App;