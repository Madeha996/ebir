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
    title: "common.news-page",
    key: "news-page",
    url: "/news-page",
    icon: <NftIcon />,
  },
  {
    title: "common.contact-page",
    key: "contact-page",
    url: "/contact-page",
    icon: <NftIcon />,
  },
];
