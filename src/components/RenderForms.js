import React, { useEffect, useState } from 'react'
import { Form } from "react-formio";
import { getForms } from '../apiManager/services/appService';

function RenderForms() {
  const [formData,setFormData] = useState([])
  useEffect(()=>{
    getForms("https://app2.aot-technologies.com/formio/form/63749ba09fe51130648f2cf9",(res)=>{
      setFormData(res.data)
    })
  },[])

  console.log("formData",formData)
  return (
    <>
    <Form
     form={formData}
     url="https://app2.aot-technologies.com/formio/form/63749ba09fe51130648f2cf9"
    />
    </>
  )
}

export default RenderForms