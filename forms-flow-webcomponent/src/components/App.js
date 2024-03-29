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
  const [errorText, setErrorText] = useState(null);


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
    const authenticationType = ['internal','external','anonymous'];
    if(configFile && !authenticationType.includes(configFile.authenticationType) ){
      setErrorText("invalid authentication type");
    }
    // For authentication type external
    if (configFile && configFile.authenticationType === "external") {
      getExternalAuthourizedForm(
        `${configFile.webApiUrl}/embed/external/form/${formName}`,
        jwt
      )
        .then((res) => {
          if (res) {
            setFormData(res.data);
          }
        })
        .catch((err) => {
          console.error("error", err);
          setErrorText(err.message);
        });
        return true;
    }
    // For authentication type internal but not multitenancy
    if (configFile && configFile.authenticationType === "internal") {
      initKeycloak(
        configFile.keycloakUrl,
        configFile.realm,
        configFile.clientId,
        (token) => {
          if (token) {
            getInternalAUthorizedForms(
              `${configFile.webApiUrl}/embed/internal/form/${formName}`,
              token
            )
              .then((res) => {
                setFormData(res.data);
              })
              .catch((err) => {
                console.error("error", err);
                setErrorText(err.message);
              });
          } else {
            setErrorText(
              "Authentication failed!"
            );
          }
        }
      )
      return true;
    }

    // For anonymous
    if (configFile && configFile.authenticationType === "anonymous") {
      setAnonymous(true);
      return true;
    }
  }, [configFile, jwt, formName]);

  return (
    <div className="container">
      {errorText ? (
        <LoadError text={errorText} />
      ) : formData || anonymous ? (
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