import store from "../store";
import Constants from "../config/constants";
import {
  serviceCreateAppUser,
  serviceDeleteAppUser,
  serviceGetAppUser,
  serviceUpdateAppUser,
} from "../services/AppUser.service";

export const FETCH_INIT = "FETCH_INIT_APP_USER";
export const FETCHED = "FETCHED_APP_USER";
export const FETCHED_FAIL = "FETCHED_FAIL_APP_USER";
export const FETCHED_FILTER = "FETCHED_FILTER_APP_USER";
export const FETCH_NEXT = "FETCH_NEXT_APP_USER";
export const FILTER = "FILTER_APP_USER";
export const RESET_FILTER = "RESET_FILTER_APP_USER";
export const SET_SORTING = "SET_SORTING_APP_USER";
export const SET_FILTER = "SET_FILTER_APP_USER";
export const SET_PAGE = "SET_PAGE_APP_USER";
export const CHANGE_PAGE = "CHANGE_PAGE_APP_USER";
export const CHANGE_STATUS = "CHANGE_STATE_APP_USER";
export const SET_SERVER_PAGE = "SET_SERVER_PAGE_APP_USER";
export const CREATE_DATA = "CREATE_APP_USER";
export const UPDATE_DATA = "UPDATE_APP_USER";
export const DELETE_ITEM = "DELETE_APP_USER";

export function actionFetchAppUser(
  index = 1,
  sorting = {},
  filter = {},
  shouldReset = false
) {
  const request = serviceGetAppUser({
    index,
    row: sorting.row,
    order: sorting.order,
    ...filter,
  }); // GetAppUser
  return (dispatch) => {
    if (shouldReset) {
      dispatch({
        type: CHANGE_PAGE,
        payload: 1,
      });
    }
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: SET_FILTER, payload: filter });
      dispatch({ type: SET_SORTING, payload: sorting });
      if (!data.error) {
        dispatch({ type: FETCHED, payload: { data: data?.data, page: index } });
        dispatch({ type: SET_SERVER_PAGE, payload: index });
        if (index == 1) {
          dispatch({ type: CHANGE_PAGE, payload: index - 1 });
        }
      } else {
        dispatch({ type: FETCHED_FAIL, payload: null });
      }
    });
  };
}

export function actionCreateAppUser(data) {
  const request = serviceCreateAppUser(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: CREATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionUpdateAppUser(data) {
  const request = serviceUpdateAppUser(data);
  return (dispatch) => {
    request.then((data) => {
      if (!data.error) {
        dispatch({ type: UPDATE_DATA, payload: data.data });
      }
    });
  };
}

export function actionDeleteAppUser(id) {
  const request = serviceDeleteAppUser({ id: id });
  return (dispatch) => {
    dispatch({ type: DELETE_ITEM, payload: id });
  };
}

export function actionChangePageAppUser(page) {
  return (dispatch) => {
    dispatch({ type: CHANGE_PAGE, payload: page });
  };
}

export function actionFilterAppUser(value) {
  const request = null; ////serviceFetchProviderRequests(value);
  return (dispatch) => {
    dispatch({ type: FETCH_INIT, payload: null });
    request.then((data) => {
      dispatch({ type: FILTER, payload: data });
      dispatch({ type: FETCHED, payload: null });
    });
  };
}

export function actionChangeStatusAppUser(id, status) {
  //const request = serviceUpdateAppUser({ id: params.id, status: params.type});
  return (dispatch) => {
    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
  };
}

export function actionResetFilterAppUser() {
  return {
    type: RESET_FILTER,
    payload: null,
  };
}

export function actionSetPageAppUser(page) {
  const stateData = store.getState().App_User;
  const currentPage = stateData.currentPage;
  const totalLength = stateData.all.length;
  const sortingData = stateData.sorting_data;
  const query = stateData.query;
  const queryData = stateData.query_data;
  const serverPage = stateData.serverPage;

  if (totalLength <= (page + 1) * Constants.DEFAULT_PAGE_VALUE) {
    store.dispatch(
      actionFetchAppUser(serverPage + 1, sortingData, {
        query,
        query_data: queryData,
      })
    );
  }

  console.log(currentPage, totalLength);
  return {
    type: CHANGE_PAGE,
    payload: page,
  };
}
