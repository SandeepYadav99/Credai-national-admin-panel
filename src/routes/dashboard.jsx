import { lazy } from "react";
import {
  DashboardOutlined,
  EventNote,
  LocalOffer,
  PeopleOutlined,
} from "@material-ui/icons";
import Constants from "../config/constants";
import RouteName from "./Route.name";
import MasterList from "../views/master/MasterList/MasterList.view";
import AdminUserList from "../views/AdminUser/AdminUserList/AdminUserList.container";
import MemberList from "../views/MemberList/MemberList.view";
import StateFedCreate from "../views/master/MasterList/StateFedCreate/StateFedCreate.view";
import NationalMemDetail from "../views/master/MasterList/NationalMemDetail/NationalMemDetail.view";

const NewDashboard = lazy(() => import("../views/dashboard/NewDashboard.view"));


const Roles = Constants.ROLES;

const dashboardRoutes = [
  {
    path: "/",
    sidebarName: "Dashboard",
    navbarName: "Admin Dashboard",
    icon: DashboardOutlined,
    component: NewDashboard,
    is_sidebar: true,
    // roles: [Roles.ADMIN, Roles.RECRUITER, Roles.CORPORATE_HR],
  },
  {
    path: `${RouteName.CHAPTERS_MASTER}`,
    sidebarName: "Chapters Master",
    navbarName: "Chapters Master",
    icon: PeopleOutlined,
    component: MasterList,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: `${RouteName.STATE_FEDERATION_CREATE}`,
    sidebarName: "Chapters Master",
    navbarName: "Chapters Master",
    icon: PeopleOutlined,
    component: StateFedCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.NATIONAL_MEMBER_DETAIL}`,
    sidebarName: "National Member",
    navbarName: "National Member",
    icon: PeopleOutlined,
    component: NationalMemDetail,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.ADMIN}`,
    sidebarName: "Admin Users",
    navbarName: "Admin Users",
    icon: PeopleOutlined,
    component: AdminUserList,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: `${RouteName.MEMBERS}`,
    sidebarName: "Members List",
    navbarName: "Members List",
    icon: PeopleOutlined,
    component: MemberList,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: `${RouteName.NEW_MEMBERS}`,
    sidebarName: "Members Users Request",
    navbarName: "Members Users Request",
    icon: PeopleOutlined,
    component: NewDashboard,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: `${RouteName.ALBUMS}`,
    sidebarName: "Gallery Album",
    navbarName: "Gallery Album",
    icon: PeopleOutlined,
    component: NewDashboard,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: `${RouteName.POLICIES}`,
    sidebarName: "Policies",
    navbarName: "Policies",
    icon: PeopleOutlined,
    component: NewDashboard,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENTS}`,
    sidebarName: "Events",
    navbarName: "Events",
    icon: PeopleOutlined,
    component: NewDashboard,
    is_sidebar: true,
    is_protect: true,
  },
];

export default dashboardRoutes;
