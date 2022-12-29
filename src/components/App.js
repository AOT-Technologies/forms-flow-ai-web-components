import { useEffect, useState } from "react";
import {
  getExternalAuthourizedForm,
  getInternalAUthorizedForms,
} from "../apiManager/services/appService";
import { initKeycloak } from "../services/UserServices";
import LoadError from "./LoadError";
import RenderForms from "./RenderForms";

const App = () => {
  const [configFile, setConfigFile] = useState(null);
  const [jwt, setJwt] = useState(null);
  const [formName, setFormName] = useState(null);
  const [formData, setFormData] = useState(null);
  const [anonymous, setAnonymous] = useState(false);
  const [errorText,setErrorText] = useState(null);

  // To set config file data and other parameters to state at initial time
  useEffect(() => {
    setConfigFile(
      JSON.parse(
        document.querySelector("formsflow-wc").getAttribute("configFile")
      )
    );
    setJwt(document.querySelector("formsflow-wc").getAttribute("token"));
    setFormName(
      document.querySelector("formsflow-wc").getAttribute("formName")
    );
  }, []);

  // To Verify token and get form json data form backend
  useEffect(() => {
    // For authentication type external
    if (configFile && configFile.authenticationType === "external") {
      getExternalAuthourizedForm(
        `http://localhost:5000/embed/external/form/${formName}`,
        jwt,
      ).then((res)=>{
        if(res){
          setFormData(res.data);
        }
      }).catch((err)=>{
        console.error("error",err)
        setErrorText("Authentication failed! Please check if the token is valid or not");
      })
    }
    // For authentication type internal but not multitenancy
    if (configFile && configFile.authenticationType === "internal") {
      initKeycloak(
        configFile.keycloakUrl,
        configFile.realm,
        configFile.clientId,
        (token,err) => {
          if(token){
            getInternalAUthorizedForms(
              `http://localhost:5000/embed/internal/form/${formName}`,
              token,
              (data) => {
                  setFormData(data);
              }
            );
          }else{
            setErrorText("Authentication failed! Please check if the application is logged in or not");
          }
          
        }
      );
    }
    // For anonymous
    if (configFile && configFile.authenticationType === "anonymous") {
      setAnonymous(true);
    }
  }, [configFile, jwt, formName]);
  


  return (
    <div className="container">
      
      {
      errorText ? <LoadError text={errorText}/> :
      formData || anonymous ? (
        <RenderForms
          configFile={configFile}
          formData={formData}
          anonymous={anonymous}
        />
      ) : (
        <>
          <h4
            style={{
              display: "flex",
              height: "80vh",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </h4>
        </>
      )}
    </div>
  );
};
export default App;
