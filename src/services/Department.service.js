import {formDataRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateDepartment(params) {
    return await postRequest('departments/create', params);
}
export async function serviceGetDepartmentDetails(params) {
    return await postRequest('departments/detail', params);
}

export async function serviceUpdateDepartment(params) {
    return await postRequest('departments/update', params);
}

export async function serviceDeleteDepartment(params) {
    return await postRequest('departments/delete', params);
}

export async function serviceGetDepartment(params) {
    return await postRequest('departments', params);
}

export async function serviceDepartmentCheck (params) {
    return await postRequest('departments/check', params);
}

export async function serviceDepartmentUpdateHead(params) {
    return await postRequest('departments/update/head', params);
}

export async function serviceDepartmentDepartmentUpdate(params) {
    return await postRequest('departments/update/departmentss', params);
}

export async function serviceDepartmentDepartments(params) {
    return await postRequest('departments/departmentss', params);
}
export async function serviceDepartmentClaimDepartments(params) {
    return await postRequest('departments/claim/panelists', params);
}
export async function serviceDepartmentClaimUpdate(params) {
    return await postRequest('departments/update/claim/panelists', params);
}