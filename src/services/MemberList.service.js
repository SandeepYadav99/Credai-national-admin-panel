import {formDataRequest, getRequest, postRequest} from '../libs/AxiosService.util';

export async function serviceCreateMemberList(params) {
    return await formDataRequest('members/create', params);
}
export async function serviceUpdateMemberList(params) {
    return await postRequest('members/update', params);
}
export async function serviceDeleteMemberList(params) {
    return await postRequest('members/delete', params);
}
export async function serviceGetMemberListDetails(params) {
    return await postRequest('member/claims/details', params);
}
export async function serviceGetMemberList(params) {
    return await postRequest('members', params);
}
export async function serviceDetailsMemberList(params) {
    return await postRequest('members/details', params);
}
