import React from "react";
import { Col, Row } from "antd";
import { ProfileDropdown } from "../components/profileDropdown/ProfileDropdown/ProfileDropdown";
import { SettingsDropdown } from "../components/settingsDropdown/SettingsDropdown";
import * as S from "../Header.styles";

interface MobileHeaderProps {
  toggleSider: () => void;
  isSiderOpened: boolean;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({
  toggleSider,
  isSiderOpened,
}) => {
  return (
    <Row justify="space-between" align="middle">
      <Col>
        <ProfileDropdown />
      </Col>

      <Col>
        <Row align="middle">
          <Col>
            <SettingsDropdown />
          </Col>
        </Row>
      </Col>

      <S.BurgerCol>
        <S.MobileBurger onClick={toggleSider} isCross={isSiderOpened} />
      </S.BurgerCol>
    </Row>
  );
};
