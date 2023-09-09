import {
  formDataRequest,
  getRequest,
  postRequest,
} from "../libs/AxiosService.util";

export async function serviceCreateEventList(params) {
  return await formDataRequest("events/create", params);
}
export async function serviceUpdateEventList(params) {
  return await postRequest("events/update", params);
}
export async function serviceDeleteEventList(params) {
  return await postRequest("events/delete", params);
}
export async function serviceGetEventListDetails(params) {
  return await postRequest("events/detail", params);
}
export async function serviceGetEventList(params) {
  return await postRequest("events", params);
}
export async function serviceDetailsEventList(params) {
  return await postRequest("events/details", params);
}
export async function serviceCheckEventList(params) {
  return await postRequest("events/exists", params);
}
