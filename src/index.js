import React from "react";
import ReactDOM from "react-dom";
import reactToWebComponent from "react-to-webcomponent";
import PropTypes from 'prop-types';
import App from "./components/App";


const index = ({url})=>{
  
  return (
    <div >
    <App src={url}/>
  </div>
  )
}
index.propTypes = {
  url: PropTypes.string.isRequired,
};

customElements.define("formsflow-wc", reactToWebComponent(index, React, ReactDOM));
// ReactDOM.render(
//   <React.StrictMode>
//       <App />
//   </React.StrictMode>,
//   document.getElementById("root")
// );