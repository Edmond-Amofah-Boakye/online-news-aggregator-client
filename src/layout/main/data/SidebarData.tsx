// SidebarData.js
import { MdDashboard, MdAnalytics, MdPeople, MdArticle, MdSettings } from "react-icons/md";

interface SidebarProps{
  label: string;
  icon: JSX.Element;
  route: string;
}

export const sidebarItems: SidebarProps[] = [
  { label: "Dashboard", icon: <MdDashboard size={18} color="#FE9500"/>, route: "" },
  { label: "Analytics", icon: <MdAnalytics size={18} color="#1C817C"/>, route: "analytics" },
  { label: "Users", icon: <MdPeople size={18} color="#C12861"/>, route: "users" },
  { label: "Articles", icon: <MdArticle size={18}color="#BB7F27" />, route: "articles" },
  { label: "Settings", icon: <MdSettings size={18} color="#FE9500"/>, route: "profile-settings" },
];
