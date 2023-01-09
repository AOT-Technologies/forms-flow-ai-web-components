# forms-flow-ai-web-components
HYBRID FORM EMBEDDING

Hybrid form embedding is a feature where you can embed both authenticated and anonymous forms in your own application. So the user can submit forms from your own application. 

For this we are providing our formsflow webcomponent (<formsflow-wc></formsflow-wc>) that you can add in your frontend framework. Here the component will accept some parameters that will be different for different scenarios.

 As of now here you have three scenarios :

1.Anonymous Forms
2.Authenticated Forms (Internal)
3.Authenticated Forms (External)
Anonymous Forms

For anonymous forms the webcomponents will accept following parameters

<formsflow-wc
	configFile
	anonymousUrl = ''
	message = ''
>
</formsflow-wc>

Where configFile is a property of a web component which  is in a json format.
configFile =	 {
	authenticationType : ‘Anonymous’,
	formioUrl : ''
    webApiUrl : ‘ ’
}


            authenticationType   formioUrl    webApiUrl
Type        String               String       String
 
Hence the webcomponent will call the form using the anonymousUrl and the application will be created based on the webApiUrl. Also the submission will be handled by the backend. And you can give a message after the successful submission which can be passed to the message attribute.

Authenticated Forms (Internal)

AuthenticationType ‘internal’ means the parent application (parent applications means the application where the webcomponent is used) will be using keycloak for authentication.The webcomponent will accept the following parameters. 

	<formsflow-wc
	configFile
	formName = ‘ ’
	message = ‘ ‘
>
</formsflow-wc>

Where configFile is a property of a web component which  is in a json format.
configFile =	 {
	keycloakUrl :  ‘ ’,
	realm : ‘ ‘,
	clientId : ‘ ’
	authenticationType : ‘internal’,
	webApiUrl : ‘ ’
}

           keycloakUrl   realm   clientId   authenticationType  webApiUrl
Type       String        String  String     String              String
 
Here the keycloakUrl, realm, clientId should be the url of formsflow application. And formName means the pathname which is unique for every form. Hence the webcomponent will check whether the parent application is logged in or not if it is logged in then it will fetch the keycloak token and send a request to get the form. webApi url means the backend url so the submission and application creation will be handled by the backend. And you can give a message after the successful submission which can be passed to the message attribute. If the parent application is not logged in that means in the case of authentication failure the webcomponent will display an error message instead of forms.

Authenticated Forms (External)

AuthenticationType ‘external’ means the parent application(parent applications means the application where the webcomponent is used) is not using keycloak for authentication. Here the formsflow application will provide a secret to create a jwt token. This token should contain preffered_username and email encoded within it. The webcomponent will accept the following parameters. 

	<formsflow-wc
	configFile
	formName = ‘ ’
	token = ‘ ‘
	message = ‘ ‘
>
</formsflow-wc>
Where configFile is a property of a web component which  is in a json format.
configFile =	 {
	authenticationType : ‘external’,
	webApiUrl : ‘ ’
}



         authenticationType   webApiUrl 
Type :   String               String



Here the token should be created with the shared secret by the formsflow application. And the webcomponent will check if the token is valid or not. If the token is valid then the webcomponent will call the forms and embed it in the parent application. The submission and application creation will be done by the backend. If the token is invalid then the webcomponent will display an error message instead of the form.

You can use our webcomponent in your application by either installing our npm package or using our cdn. We will provide two more links along with our component: (i) for bootstrap, you can avoid that if you are already using the bootstrap in your application. (ii) for formio css.







