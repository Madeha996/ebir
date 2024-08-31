import React from "react";
import {
  CompassOutlined,
  DashboardOutlined,
  FormOutlined,
  HomeOutlined,
  LayoutOutlined,
  LineChartOutlined,
  TableOutlined,
  UserOutlined,
  BlockOutlined,
} from "@ant-design/icons";
import { ReactComponent as NftIcon } from "@app/assets/icons/nft-icon.svg";

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  {
    title: "common.pages-managment",
    key: "pages-mangment",
    // TODO use path variable
    url: "/",
    icon: <NftIcon />,
  },
  {
    title: "common.authPages",
    key: "auth",
    icon: <UserOutlined />,
    children: [
      {
        title: "common.login",
        key: "login",
        url: "/auth/login",
      },
      {
        title: "common.signUp",
        key: "singUp",
        url: "/auth/sign-up",
      },
      {
        title: "common.forgotPass",
        key: "forgotPass",
        url: "/auth/forgot-password",
      },
      {
        title: "common.securityCode",
        key: "securityCode",
        url: "/auth/security-code",
      },
      {
        title: "common.newPassword",
        key: "newPass",
        url: "/auth/new-password",
      },
    ],
  },
];
