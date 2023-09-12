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
import CityAssocList from "../views/master/CityAssocList/CityAssocList.view";
import CityAssCreate from "../views/master/CityAssCreate/CityAssCreate.view";
import EventList from "../views/Events/EventList/EventList.view";
import EventCreate from "../views/Events/EventCreate/EventCreate.view";
import PendingEventList from "../views/PendingEvents/PendingEventList/PendingEventList.view";
import PendingEventDetail from "../views/PendingEvents/PendingEventDetail/PendingEventDetail.view";
import LeadMemberList from "../views/LeadMemberList/LeadMemberList.view";
import MemberCreate from "../views/MemberList/MemberCreate/MemberCreate.view";
import MemberDetail from "../views/MemberList/MemberDetail/MemberDetail.view";

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
    path: `${RouteName.CITY_ASSOCIATION_LIST}:id`,
    sidebarName: "National Member",
    navbarName: "National Member",
    icon: PeopleOutlined,
    component: CityAssocList,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.CITY_ASSOCIATION_CREATE}`,
    sidebarName: "Chapters Master",
    navbarName: "Chapters Master",
    icon: PeopleOutlined,
    component: CityAssCreate,
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
    path: `${RouteName.MEMBERS_CREATE}`,
    sidebarName: "Members List",
    navbarName: "Members List",
    icon: PeopleOutlined,
    component: MemberCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.MEMBERS_DETAILS}:id`,
    sidebarName: "Members List",
    navbarName: "Members List",
    icon: PeopleOutlined,
    component: MemberDetail,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.NEW_MEMBERS}`,
    sidebarName: "Members Users Request",
    navbarName: "Members Users Request",
    icon: PeopleOutlined,
    component: LeadMemberList,
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
    component: EventList,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: `${RouteName.EVENTS_CREATE}`,
    sidebarName: "Events",
    navbarName: "Events",
    icon: PeopleOutlined,
    component: EventCreate,
    is_sidebar: false,
    is_protect: true,
  },
  {
    path: `${RouteName.PENDING_EVENTS}`,
    sidebarName: "Pending Events Approval",
    navbarName: "Pending Events Approval",
    icon: PeopleOutlined,
    component: PendingEventList,
    is_sidebar: true,
    is_protect: true,
  },
  {
    path: `${RouteName.PENDING_EVENTS_DETAILS}:id`,
    sidebarName: "Pending Events Approval",
    navbarName: "Pending Events Approval",
    icon: PeopleOutlined,
    component: PendingEventDetail,
    is_sidebar: false,
    is_protect: true,
  },

];

export default dashboardRoutes;
