import Keycloak from "keycloak-js";

export const initKeycloak = (keycloakConfig,done) => {
const KeycloakData = new Keycloak(keycloakConfig);
  KeycloakData.init({
    onLoad: "check-sso",
    promiseType: "native",
    silentCheckSsoRedirectUri:
    window.location.origin + "/silent-check-sso.html",
    pkceMethod: "S256",
    checkLoginIframe: false,
    
  }).then((authenticated)=>{
    if(authenticated){
            localStorage.setItem('authToken',KeycloakData?.token)
            done()
    }else{
        alert("not logged")
        KeycloakData.login()
    }
  })
};



