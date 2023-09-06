import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateAdminUser(params) {
  return await postRequest("admin/user/create", params);
}
export async function serviceGetAdminUserDetails(params) {
  return await postRequest("admin/user/detail", params);
}

export async function serviceUpdateAdminUser(params) {
  return await postRequest("admin/user/update", params);
}

export async function serviceDeleteAdminUser(params) {
  return await postRequest("admin/user/delete", params);
}

export async function serviceGetAdminUser(params) {
  return await postRequest("admin/user", params);
}

export async function serviceAdminUserCheck(params) {
  return await postRequest("admin/user/check", params);
}

export async function serviceAdminUserUpdateHead(params) {
  return await postRequest("admin/user/update/head", params);
}

export async function serviceAdminUserUpdate(params) {
  return await postRequest("admin/user/update/admin/users", params);
}

export async function serviceAdminUsers(params) {
  return await postRequest("admin/user/admin/users", params);
}
export async function serviceClaimAdminUsers(params) {
  return await postRequest("admin/user/claim/panelists", params);
}
export async function serviceAdminUserClaimUpdate(params) {
  return await postRequest("admin/user/update/claim/panelists", params);
}
