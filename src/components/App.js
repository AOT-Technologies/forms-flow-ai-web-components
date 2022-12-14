import { useEffect, useState } from "react";
import { fetchRoles, getForms, verifyJWTtoken } from "../apiManager/services/appService";
import { initKeycloak } from "../services/UserServices";
import RenderForms from "./RenderForms";

const App = ({ src }) => {
  const [callForms, setCallForms] = useState(false);

  useEffect(() => {
    let keycloakConfig = document
      .querySelector("formsflow-wc")
      .getAttribute("keycloakConfig");
    keycloakConfig = JSON.parse(keycloakConfig);

    console.log("keycloak config", keycloakConfig);
    if (keycloakConfig.authenticationType === "external") {
      console.log("ivde keri");
      let formioToken = `http://localhost:5000/application/external/verify`;
      verifyJWTtoken(formioToken, (res) => {
        if(res){
          localStorage.setItem('formioToken',res.data)
        }
      });
    }
    // if (keycloakConfig.multitenancy) {
    //   console.log("ivde thanne keriye");
    //   let rolesUrl = `${keycloakConfig.webBaseUrl}/adminapi/api/v1/tenant`;
    //   initKeycloak(
    //     keycloakConfig.keycloakUrl,
    //     keycloakConfig.realm,
    //     keycloakConfig.clientId,
    //     () => {
    //       fetchRoles(rolesUrl, (res) => {
    //         setCallForms(true);
    //       });
    //     }
    //   );
    // }
    // if (!keycloakConfig.multitenancy) {
    //   console.log("ivde aanu kerye");
    //   let rolesUrl = `${keycloakConfig.webBaseUrl}/api/formio/roles`;
    //   initKeycloak(
    //     keycloakConfig.keycloakUrl,
    //     keycloakConfig.realm,
    //     keycloakConfig.clientId,
    //     () => {
    //       fetchRoles(rolesUrl, (res) => {
    //         setCallForms(true);
    //       });
    //     }
    //   );
    // }
  }, []);

  return (
    <div className="container">
      {callForms ? <RenderForms /> : <>Loading ....</>}
    </div>
  );
};
export default App;
