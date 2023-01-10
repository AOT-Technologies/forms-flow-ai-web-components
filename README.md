# forms-flow-ai-web-components
 **HYBRID FORM EMBEDDING** 

Hybrid form embedding is a feature where you can embed both authenticated and anonymous forms in your application. This feature allows user to submit forms from your application. 

We are providing our formsflow webcomponent (```<formsflow-wc></formsflow-wc>```) that you can add in your frontend framework. The component will accept some parameters that will be different for different scenarios.

 As of now there are three scenarios :
 
 1. Anonymous Forms
 
 2. Authenticated Forms (Internal)
 
 3. Authenticated Forms (External)
 
 **1. Anonymous Forms**
 
 **step 1**
 
 Add the below mentioned webcomponent to your html file :
    
       
       <formsflow-wc
	       configFile
	       anonymousUrl = ''
           message = ''
       >
       </formsflow-wc>
       
Here, the webcomponent will accept three parameters :

First,

        configFile = {
	        authenticationType : 'anonymous',
		formioUrl: ''
            webApiUrl : ''
        }
      
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- | 
| ```authenticationType``` | String |The preferred type of authentication | anonymous |
| ```formioUrl``` | String | formio url | eg : 'https://sample.com/formio/form' | 
| ```webApiUrl``` | String | Api url | eg : 'https://sample.com/api' |

Second,

	anonymousUrl
	
	
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- | 
| ```anonymousUrl``` | String |The anonymous url from formio | eg : 'https://sample.com/formio/formname' |

Third,
	
	message
	
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- | 
| ```message``` | String |The message after successful submission of form | eg : Thank you for your response |	

eg :

![image](https://user-images.githubusercontent.com/98075058/211549037-50823a3e-e158-4b29-807b-eb70b5570bb5.png)

	
**step 2**

Replace and add the config file according to your environment. Convert the config file to string using stringify or other methods in javascript.

eg:

![image](https://user-images.githubusercontent.com/98075058/211545613-83438c29-a119-4952-822a-99c3d4501094.png)


**2. Authenticated Forms (Internal)**

**step 1**
 
 Add the below mentioned webcomponent to your html file :
 
 	<formsflow-wc
	       configFile
           formName = ''
	       message = ''
        >
        </formsflow-wc>

Here, the webcomponent will accept three parameters :

First,

        configFile = {
            keycloakUrl : '',
	        realm : '',
	        clientId : '',
	        authenticationType : 'Anonymous',
            webApiUrl : ''
        }
	
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- |
| ```keycloakUrl``` | String | keycloak  url | eg : 'https://sample.com/auth' |
| ```realm``` | String | keycloak realm | eg : sample |
| ```clientId``` | String | keycloak client id | eg : tenant-clientId |
| ```authenticationType``` | String | The preferred type of authentication | internal <br/> (AuthenticationType ‘internal’ means the parent application (the application where the webcomponent is implemented) will be using keycloak for authentication) |
| ```webApiUrl``` | String | Api url | eg : 'https://sample.com/api' |

second,
	
	formName
	
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- |
| ```formName``` | String | pathname of form | eg : testform |

In case of multitenancy, path name should contain tenant key (tenantkey-pathname)

Third,
	
	message
	
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- | 
| ```message``` | String |The message after successful submission of form | eg : Thank you for your response |	

eg :

![image](https://user-images.githubusercontent.com/98075058/211549289-2cb89bd9-6b07-4707-bc28-52ceb03050c8.png)

**step 2**

Replace and add the config file according to your environment. Convert the config file to string using stringify or other methods in javascript.

eg:

![image](https://user-images.githubusercontent.com/98075058/211549668-886c447e-292f-480a-90ce-cbd8ae24c387.png)
  

**Authenticated Forms (External)**

**step 1**

Add the below mentioned webcomponent to your html file :
 
 	<formsflow-wc
	       configFile
           formName = ''
           token = ''  
	       message = ''
        >
        </formsflow-wc>

Here, the webcomponent will accept four parameters :

First,

	configFile = {
	        authenticationType : 'external',
            webApiUrl : ''
        }

|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- | 
| ```authenticationType``` | String |The preferred type of authentication | external <br/> (AuthenticationType ‘external’ means the parent application(the application where the webcomponent is used) is not using keycloak for authentication) |
| ```webApiUrl``` | String | Api url | eg : 'https://sample.com/api' |

second,
	
	formName
	
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- |
| ```formName``` | String | pathname of form | eg : testform |

In case of multitenancy, path name should contain tenant key (tenantkey-pathname)

Third,

	token

|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- |
| ```token``` | String | jwt token which created by the shared secret of formsflow |eg : "eikjndsf2ediuhiugyugyugg" |

Note : 
*  For normal case, the token should be created by encoding the preferred_username and email. 
   * eg: { preferred_username : 'sample' , email : 'sample@gmail.com'}
*  For multitenancy, tenant key shoul be added along with preferred_username and email
   * eg : { preferred_username : 'sample' , email : 'sample@gmail.com' , tenantKey : 'tenant1'}
 
Fourth,
	
	message
	
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- | 
| ```message``` | String |The message after successful submission of form | eg : Thank you for your response |	

eg :

![image](https://user-images.githubusercontent.com/98075058/211554624-0812c4a5-79d8-437c-b2c2-323fa676b5f6.png)

**step 2**

Replace and add the config file according to your environment. Convert the config file to string using stringify or other methods in javascript.

eg:

![image](https://user-images.githubusercontent.com/98075058/211555279-11d7cbd1-fe8e-4201-8df1-a5e52ecf6c90.png)


You can use our webcomponent in your application by either installing our npm package or using our cdn. We will provide two more links along with our component: <br/>&nbsp;&nbsp;(i) for bootstrap (you can avoid that if you are already using the bootstrap in your application). <br/>&nbsp;&nbsp;(ii) for formio css.
        
        
        
