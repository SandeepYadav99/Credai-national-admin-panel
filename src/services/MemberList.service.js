import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateMemberList(params) {
    return await formDataRequest('cr/member/create', params);
}
export async function serviceUpdateMemberList(params) {
    return await postRequest('cr/member/update', params);
}
export async function serviceDeleteMemberList(params) {
    return await postRequest('cr/member/delete', params);
}
export async function serviceGetMemberListDetails(params) {
    return await postRequest('member/claims/details', params);
}
export async function serviceGetMemberList(params) {
    return await postRequest('member/claims/reports/car', params);
}
export async function serviceDetailsMemberList(params) {
    return await postRequest('cr/member/details', params);
}
