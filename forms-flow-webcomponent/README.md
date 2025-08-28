# Forms Flow AI Web Components

> **Hybrid Form Embedding** - Seamlessly embed both authenticated and anonymous forms in your application.

## 📋 Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Required CSS Dependencies](#required-css-dependencies)
- [Usage Scenarios](#usage-scenarios)
  - [1. Anonymous Forms](#1-anonymous-forms)
  - [2. Authenticated Forms (Internal)](#2-authenticated-forms-internal)
  - [3. Authenticated Forms (External)](#3-authenticated-forms-external)
- [Custom Components](#custom-components)
- [API Reference](#api-reference)
- [Additional Resources](#additional-resources)

## 🎯 Overview

Forms Flow AI Web Components provides a powerful hybrid form embedding solution that allows you to integrate both authenticated and anonymous forms seamlessly into your application. Users can submit forms directly from your application without being redirected to external pages.

The main component `<formsflow-webembed></formsflow-webembed>` is a flexible web component that adapts to different authentication scenarios and can be easily integrated into any frontend framework.

## 📦 Installation

You can integrate the web component using either CDN or NPM:

### CDN Installation
```html
<script src="https://dm3cs41qneo90.cloudfront.net/forms-flow-webcomponent.js"></script>
```

### NPM Installation
```bash
npm i formsflow-webembed
```

```javascript
// Import in your component
import 'formsflow-webembed'
```

## 🎨 Required CSS Dependencies

Include these stylesheets for proper component styling:

### Bootstrap CSS
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css">
```
> **Note:** Skip this if your application already uses Bootstrap.

### Form.io CSS (Required)
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/formiojs@4.13.1/dist/formio.full.min.css">
```

## 🚀 Usage Scenarios

The component supports three main scenarios based on your authentication requirements:

---

## 1. Anonymous Forms

Use this scenario when you want to embed forms that don't require user authentication.

### Implementation

```html
<formsflow-webembed
    configFile
    anonymousUrl="https://sample.com/form/formio/test-form"
    message="Thank you for your response"
>
</formsflow-webembed>
```

### Configuration

The component accepts three parameters:

#### 1. configFile (Object)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `authenticationType` | String | Authentication type | `"anonymous"` |
| `formioUrl` | String | Form.io URL (must end with `/form`) | `"https://sample.com/formio/form"` |
| `webApiUrl` | String | API URL | `"https://sample.com/api"` |

#### 2. anonymousUrl (String)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `anonymousUrl` | String | The anonymous form URL from Form.io | `"https://sample.com/formio/formname"` |

#### 3. message (String)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `message` | String | Success message after form submission | `"Thank you for your response"` |

### JavaScript Configuration

```javascript
const configFile = {
    authenticationType: "anonymous",
    formioUrl: 'https://sample.com/formio/form',
    webApiUrl: 'https://sample.com/api'
}

document.querySelector('formsflow-webembed')
    .setAttribute('configFile', JSON.stringify(configFile));
```

---

## 2. Authenticated Forms (Internal)

Use this scenario when your parent application uses Keycloak for authentication.

### Implementation

```html
<formsflow-webembed
    configFile
    formName="test-form"
    message="Thank you for your response"
>
</formsflow-webembed>
```

### Configuration

#### 1. configFile (Object)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `keycloakUrl` | String | Keycloak server URL | `"https://sample.com/auth"` |
| `realm` | String | Keycloak realm name | `"sample"` |
| `clientId` | String | Keycloak client ID | `"tenant-clientId"` |
| `authenticationType` | String | Authentication type | `"internal"` |
| `webApiUrl` | String | API URL | `"https://sample.com/api"` |

#### 2. formName (String)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `formName` | String | Form pathname | `"testform"` |

> **Note:** For multitenancy, use format: `"tenantkey-pathname"`

#### 3. message (String)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `message` | String | Success message after form submission | `"Thank you for your response"` |

### JavaScript Configuration

```javascript
const configFile = {
    keycloakUrl: 'https://sample.com/auth',
    realm: 'test',
    clientId: 'testId',
    authenticationType: 'internal',
    webApiUrl: 'https://sample.com/api'
};

document.querySelector('formsflow-webembed')
    .setAttribute('configFile', JSON.stringify(configFile));
```

---

## 3. Authenticated Forms (External)

Use this scenario when your parent application does NOT use Keycloak for authentication.

### Implementation

```html
<formsflow-webembed
    configFile
    formName="test-form"
    token="your-jwt-token-here"
    message="Thank you for your response"
>
</formsflow-webembed>
```

### Configuration

#### 1. configFile (Object)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `authenticationType` | String | Authentication type | `"external"` |
| `webApiUrl` | String | API URL | `"https://sample.com/api"` |

#### 2. formName (String)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `formName` | String | Form pathname | `"testform"` |

> **Note:** For multitenancy, use format: `"tenantkey-pathname"`

#### 3. token (String)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `token` | String | JWT token created using Forms Flow shared secret | `"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."` |

#### Token Payload Requirements

**Standard Case:**
```json
{
    "preferred_username": "sample",
    "email": "sample@gmail.com"
}
```

**Multitenancy Case:**
```json
{
    "preferred_username": "sample",
    "email": "sample@gmail.com",
    "tenantKey": "tenant1"
}
```

#### 4. message (String)

| Property | Type | Description | Example |
|----------|------|-------------|---------|
| `message` | String | Success message after form submission | `"Thank you for your response"` |

### JavaScript Configuration

```javascript
const configFile = {
    authenticationType: 'external',
    webApiUrl: 'https://sample.com/api'
};

document.querySelector('formsflow-webembed')
    .setAttribute('configFile', JSON.stringify(configFile));
```

---

## 🔧 Custom Components

To add custom components to your form embedding solution:

### Step 1: Clone the Repository

```bash
git clone https://github.com/AOT-Technologies/forms-flow-ai-web-components.git
cd forms-flow-ai-web-components
```

### Step 2: Install Dependencies

```bash
npm install
```

> **Optional:** Remove default Forms Flow custom components if not needed:
> ```bash
> npm uninstall formsflow-formio-custom-elements
> ```

### Step 3: Install Your Custom Component Package

```bash
npm install your-custom-component-package
```

### Step 4: Import Custom Component

```javascript
import yourCustomComponent from 'your-custom-component-package';
```

### Step 5: Register with Form.io

```javascript
import { Formio } from 'formiojs';

Formio.use(yourCustomComponent);
```

### Step 6: Build and Deploy

```bash
# Create production build
npm run build

# The build files will be in the /build directory
# Host these files as a CDN for form embedding
```

---

## 📚 API Reference

### Component Properties

| Property | Required | Type | Scenarios | Description |
|----------|----------|------|-----------|-------------|
| `configFile` | ✅ | Object | All | Configuration object (as JSON string) |
| `anonymousUrl` | ✅ | String | Anonymous only | Form.io anonymous form URL |
| `formName` | ✅ | String | Internal, External | Form pathname |
| `token` | ✅ | String | External only | JWT authentication token |
| `message` | ✅ | String | All | Success message after submission |

### Authentication Types

| Type | Description | Use Case |
|------|-------------|----------|
| `anonymous` | No authentication required | Public forms |
| `internal` | Keycloak authentication | Applications using Keycloak |
| `external` | Custom JWT authentication | Applications with custom auth |

---

## 🔗 Additional Resources

- **GitHub Repository:** [forms-flow-ai-web-components](https://github.com/AOT-Technologies/forms-flow-ai-web-components)
- **CDN Distribution:** https://dm3cs41qneo90.cloudfront.net/
- **Form.io Documentation:** [formio.github.io](https://formio.github.io/)

---

## 📝 Notes

- Ensure all URLs are properly configured for your environment
- Convert configuration objects to JSON strings when setting attributes
- For multitenancy support, include tenant keys in form names and tokens
- Test authentication flows in development before deploying to production

---

**Need help?** Check out our [GitHub repository](https://github.com/AOT-Technologies/forms-flow-ai-web-components) for more examples and community support.