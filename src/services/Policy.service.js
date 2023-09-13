import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceGetPolicyList(params) {
    return await postRequest("policies", params);
}

export async function serviceCreatePolicyList(params) {
    return await formDataRequest("policies/create", params);
}

export async function serviceUpdatePolicyList(params) {
    return await postRequest("policies/update", params);
}

export async function serviceGetPolicyDetails(params) {
    return await postRequest("policies/detail", params);
}