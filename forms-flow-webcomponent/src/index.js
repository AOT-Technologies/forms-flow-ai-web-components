import React from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import PropTypes from "prop-types";
import App from "./components/App";

const FormsflowWebComponent = ({ url }) => {
  return (
    <div>
      <App src={url} />
    </div>
  );
};

FormsflowWebComponent.propTypes = {
  url: PropTypes.string.isRequired,
};

// Define the custom element for direct browser usage
const WebComponentClass = reactToWebComponent(FormsflowWebComponent, React, ReactDOM);

// Auto-register if in browser environment and not already defined
if (typeof window !== 'undefined' && !customElements.get('formsflow-webembed')) {
  customElements.define("formsflow-webembed", WebComponentClass);
}

// Export for npm usage
export default FormsflowWebComponent;
export { WebComponentClass, FormsflowWebComponent };
