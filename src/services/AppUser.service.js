import { formDataRequest, postRequest } from "../libs/AxiosService.util";

export async function serviceCreateAppUser(params) {
  return await formDataRequest("users/create", params);
}
export async function serviceUpdateAppUser(params) {
  return await formDataRequest("users/update", params);
}
export async function serviceDeleteAppUser(params) {
  return await postRequest("users/delete", params);
}
export async function serviceGetAppUserDetails(params) {
  return await postRequest("users/detail", params);
}
export async function serviceGetAppUser(params) {
  return await postRequest("users", params);
}
export async function serviceDetailsAppUser(params) {
  return await postRequest("users/detail", params);
}
export async function serviceDetailsGetBannerList(params) {
  return await postRequest("users/detail", params);
}
