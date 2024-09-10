import React from "react";
import { Avatar, Col, Row } from "antd";
import { Dropdown } from "@app/components/common/Dropdown/Dropdown";
import { H6 } from "@app/components/common/typography/H6/H6";
import { ProfileOverlay } from "../ProfileOverlay/ProfileOverlay";
import { useAppSelector } from "@app/hooks/reduxHooks";
import { useResponsive } from "@app/hooks/useResponsive";
import * as S from "./ProfileDropdown.styles";
import { LogoutOutlined } from "@ant-design/icons";
import { readToken, readUser } from "@app/services/localStorage.service";

export const ProfileDropdown: React.FC = () => {
  const token = useAppSelector((state) => state.auth?.token || readToken());
  const user = useAppSelector((state) => state.auth?.user || readUser());

  console.log("sss", user);

  return token ? (
    <Dropdown overlay={<ProfileOverlay />} trigger={["click"]}>
      <S.ProfileDropdownHeader as={Row} gutter={[10, 10]} align="middle">
        <LogoutOutlined style={{ fontSize: "25px" }} />
      </S.ProfileDropdownHeader>
    </Dropdown>
  ) : null;
};
