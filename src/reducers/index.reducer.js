import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import AuthReducer from "./Auth.reducer";
import User from "./User.reducer";
import DashboardReducer from "./Dashboard.reducer";
import AppSettingReducer from "./AppSettings.reducer";
import ProviderUser from "./ProviderUser.reducer";
import Services from "./Service.reducer";
import MasterListReducer from "./MasterList.reducer";
import AdminUserReducer from "./AdminUser.reducer";
import MemberListReducer from "./MemberList.reducer";

const rootReducer = combineReducers({
  state: (state = {}) => state,
  form: formReducer,
  app_setting: AppSettingReducer,
  dashboard: DashboardReducer,
  user: User,
  auth: AuthReducer,
  provider_user: ProviderUser,
  services: Services,
  master_list:MasterListReducer,
  adminUser:AdminUserReducer,
  member_list:MemberListReducer
});

export default rootReducer;
