import { API } from "../endpoints";

export const getFormUrl = (formUrl,submissionUrl)=>{
  const url = API.PUBLIC_FORM_SUBMISSION_URL.replace('<form_id>',formUrl)
  .replace('<submission_id>',submissionUrl);
  return url;
}

