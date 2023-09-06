import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateMasterList(params) {
    return await formDataRequest('cr/master/create', params);
}
export async function serviceUpdateMasterList(params) {
    return await postRequest('cr/master/update', params);
}
export async function serviceDeleteMasterList(params) {
    return await postRequest('cr/master/delete', params);
}
export async function serviceGetMasterListDetails(params) {
    return await postRequest('master/claims/details', params);
}
export async function serviceGetMasterList(params) {
    return await postRequest('master/claims/reports/car', params);
}
export async function serviceDetailsMasterList(params) {
    return await postRequest('cr/master/details', params);
}
