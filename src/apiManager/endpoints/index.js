import { WEB_BASE_URL } from "./config";

export const API = {
    PUBLIC_APPLICATION_CREATE : `${WEB_BASE_URL}/public/application/create`,
    PUBLIC_FORM_SUBMISSION_URL : `${WEB_BASE_URL}/form/<form_id>/submission/<submission_id>`,
    FORMIO_ROLES:`https://app2.aot-technologies.com/api/formio/roles`
}