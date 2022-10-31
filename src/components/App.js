
import { useEffect, useState } from "react";
import { Form } from "react-formio";
import { publicApplicationCreate } from "../apiManager/services/appService";

const App =({src})=>{
    const [isFormSubmitted,setIsFormsubmitted] = useState(false);
    const [message,setMessage] = useState('');
    const [webApiUrl ,setWebApiUrl] =useState('');
    const [url ,setUrl] =useState('');
    useEffect(()=>{
        const newMessage = document.querySelector('formsflow-wc').getAttribute('message');
        const apiUrl = document.querySelector('formsflow-wc').getAttribute('apiUrl');
        const newUrl = document.querySelector('formsflow-wc').getAttribute('url');
        setMessage(newMessage);
        setWebApiUrl(apiUrl);
        setUrl(newUrl);
    },[src])
   const handleSubmit = (data)=>{
    setIsFormsubmitted(true)
    const formId = data.form;
    const submissionId = data._id;
    const webUrl = `${webApiUrl}/public/application/create`
    const formUrl = `https://forms3.aot-technologies.com/form/${formId}/submission/${submissionId}`
    const webFormUrl = `https://app3.aot-technologies.com/form/${formId}/submission/${submissionId}`
    const formData = {
        formId,formUrl,submissionId,webFormUrl
    };
    publicApplicationCreate(webUrl,formData);
   } 
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