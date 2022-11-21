import Keycloak from "keycloak-js";
// let keycloakData ;

// // export const initApplication =(keycloakData)=>{
// //     keycloakData =keycloakData
// // }
// console.log("keycloak data",keycloakData)
// const keycloakConfig = {
    // url: "https://iam.aot-technologies.com/auth",
    // realm: "forms-flow-mahagony",
    // clientId: "forms-flow-web",
//   };



export const initKeycloak = (keycloakConfig,done) => {
const KeycloakData = new Keycloak(keycloakConfig);
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
            localStorage.setItem('authToken',KeycloakData?.token)
            done()
    }else{
        alert("not logged")
        console.log("not authenticated!");
        KeycloakData.login()
    }
  })
};



