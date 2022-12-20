import { useEffect, useState } from "react";
import { fetchRoles,verifyJWTtoken } from "../apiManager/services/appService";
import { initKeycloak } from "../services/UserServices";
import RenderForms from "./RenderForms";

const App = ({ src }) => {
  const [configFile,setConfigFile] = useState(null);
  const [jwt,setJwt] = useState(null);
  const[formioToken,setFormioToken] = useState(null);
  const [anonymous,setAnonymous] = useState(false);


  useEffect(()=>{
    setConfigFile(JSON.parse(document.querySelector("formsflow-wc").getAttribute("configFile")));
    setJwt(document.querySelector("formsflow-wc").getAttribute("token"));
  },[]);
  useEffect(()=>{
    if(configFile && configFile.authenticationType === 'external'){
      verifyJWTtoken("http://localhost:5000/embed/token",jwt,(data)=>{
        setFormioToken(data.access_token);
      });
     };
     if(configFile && configFile.authenticationType ==='internal' && !configFile.multitenancy){
      let rolesUrl = `${configFile.webApiUrl}/api/formio/roles`
      initKeycloak(configFile.keycloakUrl,configFile.realm,configFile.clientId,() => {
        fetchRoles(rolesUrl,(data)=>{
          setFormioToken(data);
        });
      });
     };
     if(configFile && configFile.authenticationType ==='internal' && configFile.multitenancy){

      let rolesUrl = `${configFile.webApiUrl}/adminapi/api/v1/tenant`
      initKeycloak(configFile.keycloakUrl,configFile.realm,configFile.clientId,() => {
        fetchRoles(rolesUrl,(data)=>{
          setFormioToken(data);
        });
      });
     };
     if(configFile && configFile.authenticationType ==='anonymous'){
      setAnonymous(true);
     };
  },[configFile,jwt])

  return (
    <div className="container">
     <RenderForms configFile={configFile} formioToken={formioToken} anonymous={anonymous}/> 
    </div>
  );
};
export default App;
