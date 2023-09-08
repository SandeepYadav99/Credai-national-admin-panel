import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventList(params) {
  return await formDataRequest("event/create", params);
}
export async function serviceUpdateEventList(params) {
  return await postRequest("event/update", params);
}
export async function serviceDeleteEventList(params) {
  return await postRequest("event/delete", params);
}
export async function serviceGetEventListDetails(params) {
  return await postRequest("event/detail", params);
}
export async function serviceGetEventList(params) {
  return await postRequest("chapters", params);
}
export async function serviceDetailsEventList(params) {
  return await postRequest("event/details", params);
}
export async function serviceCheckEventList(params) {
  return await postRequest("event/exists", params);
}
