import { useEffect, useState } from "react";
import { fetchRoles, getForms, verifyJWTtoken } from "../apiManager/services/appService";
import { initKeycloak } from "../services/UserServices";
import RenderForms from "./RenderForms";

const App = ({ src }) => {
  const [configFile,setConfigFile] = useState(null);
  const [jwt,setJwt] = useState(null);

  useEffect(()=>{
    setConfigFile(JSON.parse(document.querySelector("formsflow-wc").getAttribute("configFile")));
    setJwt(document.querySelector("formsflow-wc").getAttribute("token"));
  },[]);
  useEffect(()=>{
   if(configFile && configFile.authenticationType === 'external'){
    verifyJWTtoken("http://localhost:5000/application/external/verify",jwt)
   }
   if(configFile && configFile.authenticationType ==='internal' && !configFile.multitenancy){
    
   }
  },[configFile]);

  return (
    <div className="container">
     <RenderForms /> 
    </div>
  );
};
export default App;
