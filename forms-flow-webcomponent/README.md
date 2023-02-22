# forms-flow-ai-web-components
 **HYBRID FORM EMBEDDING** 

Hybrid form embedding is a feature where you can embed both authenticated and anonymous forms in your application. This feature allows user to submit forms from your application. 

We are providing our formsflow webcomponent (```<formsflow-wc></formsflow-wc>```) that you can add in your frontend framework. The component will accept some parameters that will be different for different scenarios.

You can use our webcomponent in your application by either installing our npm package or using our cdn. 
 * cdn : https://d212bc5dnplrd1.cloudfront.net/
 * npm : ```npm i formsflow-wc```
   
 *  note : if you are using npm package use ```import 'formsflow-wc'``` in your component
      
We will provide two more links along with our component for styling purpose:
<br/>&nbsp;&nbsp;(i) for bootstrap (you can avoid that if you are already using the bootstrap in your application).
 * bootstrap : https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css

&nbsp;&nbsp;(ii) for formio css.
 * formio css : https://cdn.jsdelivr.net/npm/formiojs@4.13.1/dist/formio.full.min.css

 As of now there are three scenarios :
 
 1. Anonymous Forms
 
 2. Authenticated Forms (Internal)
 
 3. Authenticated Forms (External)
 
 **1. Anonymous Forms**
 
 **Step 1**
 
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
		formioUrl: '',
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

      <formsflow-wc
      configFile
      anonymousUrl="https://sample.com/form/formio/test-form"
      message ="Thank you for your Response"
      >
      </formsflow-wc> 
      

Replace and add the config file according to your environment. Convert the config file to string using stringify or other methods in javascript.

eg:

    const configFile = {
    authenticationType : "anonymous",
    formioUrl: 'https://sample/form/formio',
    webApiUrl: 'https://sample.com/api',
    }
    document.querySelector('formsflow-wc').setAttribute('configFile',JSON.stringify(configFile))


**2. Authenticated Forms (Internal)**

AuthenticationType ‘internal’ means the parent application (the application where the webcomponent is implemented) will be using keycloak for authentication.

**Step 1**
 
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
	        authenticationType : 'internal',
            webApiUrl : ''
        }
	
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- |
| ```keycloakUrl``` | String | keycloak  url | eg : 'https://sample.com/auth' |
| ```realm``` | String | keycloak realm | eg : sample |
| ```clientId``` | String | keycloak client id | eg : tenant-clientId |
| ```authenticationType``` | String | The preferred type of authentication | internal |
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

    <formsflow-wc
       configFile
       formName = 'test-form'
       message = 'Thank you for your response'
    >
    </formsflow-wc> 

Replace and add the config file according to your environment. Convert the config file to string using stringify or other methods in javascript.

eg:

      const configFile = {
      keycloakUrl : 'https://sample.com/auth',
      realm : 'test',
      clientId : 'testId',
      authenticationType : 'internal',
      webApiUrl : 'https://sample.com/api'
  }
  
  document.querySelector('formsflow-wc').setAttribute('configFile',JSON.stringify(configFile));
  

**Authenticated Forms (External)**

AuthenticationType ‘external’ means the parent application(the application where the webcomponent is used) is not using keycloak for authentication.

**Step 1**

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
| ```authenticationType``` | String |The preferred type of authentication | external  |
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
*  For multitenancy, tenant key should be added along with preferred_username and email
   * eg : { preferred_username : 'sample' , email : 'sample@gmail.com' , tenantKey : 'tenant1'}
 
Fourth,
	
	message
	
|  Variable Name       | Type  | Description  | Possible Values  |
| -------------------- | ----- | -----------  |---------------- | 
| ```message``` | String |The message after successful submission of form | eg : Thank you for your response |	

eg :

     <formsflow-wc
       configFile
       formName = 'test-form'
       token = 'e11jsijuihsiuhsuhiushuisjsoijiosjos88skmsiuhsuihsiuhyusguysguyshyusgyusgyusg'  
       message = 'Thank you for your response'
    >
    </formsflow-wc>

Replace and add the config file according to your environment. Convert the config file to string using stringify or other methods in javascript.

eg:

          configFile = {
           authenticationType : 'external',
           webApiUrl : 'https://sample.com/api'
          }
	  
	  document.querySelector('formsflow-wc').setAttribute('configFile',JSON.stringify(configFile));




***To add custom components in form embedding*** 

 **Step 1**
 
* Clone the repo forms-flow-ai-web-components
 
       git clone https://github.com/AOT-Technologies/forms-flow-ai-web-components.git
       
 **Step 2**
  
* install node modules

      npm install
      
 note : if you dont need our formsflow custom component you can remove it from the package
 
 eg : 
  
     npm uninstall formsflow-formio-custom-elements
     
 **Step 3** 
 
* install npm package for custom component

 eg : 
  
       npm i forms-flow-custom-component
 
 **Step 4**
 
* import custom component from the package

 eg : 
 
 	import formsFlowCustomComponent from 'forms-flow-custom-component'

 **Step 5**
 
 * use the imported custom component in formio
 
 eg :  
  
        Formio.use(formsFlowCustomComponent)
	
note : 
 * you can create a build by running the command 
 
 	   npm run build
	
* And you can host this build file as cdn and you can use that cdn for form embedding.	
	
	
you can reffer https://github.com/AOT-Technologies/forms-flow-ai-web-components	
	
	
	
        
        
        
