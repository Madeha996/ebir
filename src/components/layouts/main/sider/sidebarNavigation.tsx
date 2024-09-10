import React from "react";
import {
  UserSwitchOutlined,
  ReadOutlined,
  PhoneOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: "common.admin-page",
    key: "admin-page",
    // TODO use path variable
    url: "/admin-page",
    icon: <UserSwitchOutlined />,
  },
  {
    title: "common.pages-managment",
    key: "pages-mangment",
    // TODO use path variable
    url: "/",
    icon: <FileTextOutlined />,
  },
  {
    title: "common.news-page",
    key: "news-page",
    url: "/news-page",
    icon: <ReadOutlined />,
  },
  {
    title: "common.contact-page",
    key: "contact-page",
    url: "/contact-page",
    icon: <PhoneOutlined />,
  },
];
