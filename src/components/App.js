import { useEffect, useRef, useState } from "react";   
import {
  fetchRoles,
} from "../apiManager/services/appService";
import { initKeycloak } from "../services/UserServices";
import RenderForms from "./RenderForms";

const App = ({ src }) => {
  const [callForms, setCallForms] = useState(false);
//   useEffect(() => {
    // const newMessage = document
    //   .querySelector("formsflow-wc")
    //   .getAttribute("message");
    // const apiUrl = document
    //   .querySelector("formsflow-wc")
    //   .getAttribute("apiUrl");
    // const newUrl = document.querySelector("formsflow-wc").getAttribute("url");
    // setMessage(newMessage);
    // setWebApiUrl(apiUrl);
    // setUrl(newUrl);
//   }, [src]);


  useEffect(() => {
    const url = document.querySelector("formsflow-wc").getAttribute("keycloakUrl");
    const realm = document.querySelector("formsflow-wc").getAttribute("realm");
    const clientId = document.querySelector("formsflow-wc").getAttribute("clientId");
    initKeycloak({url,realm,clientId},() => {
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
