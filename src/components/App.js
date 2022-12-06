import { useEffect, useState } from "react";   
import {
  fetchRoles,
} from "../apiManager/services/appService";
import { initKeycloak } from "../services/UserServices";
import RenderForms from "./RenderForms";

const App = ({ src }) => {
  const [callForms, setCallForms] = useState(false);

  useEffect(() => {
    let keycloakConfig = document.querySelector("formsflow-wc").getAttribute("keycloakConfig");
    keycloakConfig = JSON.parse(keycloakConfig);
    initKeycloak(keycloakConfig.keycloakUrl,keycloakConfig.realm,keycloakConfig.clientId,() => {
      fetchRoles((res) => {
        setCallForms(true)
      });
    });
  }, []);




  return (
    <div className="container">
      {callForms ? <RenderForms /> : <>Loading ....</>}
    </div>
  );
};
export default App;
