import Keycloak from "keycloak-js";

const keycloakConfig = {
  url: "https://iam.aot-technologies.com/auth",
  realm: "forms-flow-mahagony",
  clientId: "forms-flow-web",
};

const KeycloakData = new Keycloak(keycloakConfig);

export const initKeycloak = (done) => {
  console.log("here")
  KeycloakData.init({
    onLoad: "check-sso",
    promiseType: "native",
    silentCheckSsoRedirectUri:
    window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
    checkLoginIframe: false,
    
  }).then((authenticated)=>{
    if(authenticated){
            console.log("autnenticated");
            console.log("authenticated aanu",authenticated);
            console.log("token",KeycloakData.token)
    }else{
        alert("not logged")
        console.log("not authenticated!");
        KeycloakData.login()
    }
  })
};

export const getToken = () => KeycloakData?.token;


