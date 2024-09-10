import React from "react";
import { Col, Row } from "antd";
import { ProfileDropdown } from "../components/profileDropdown/ProfileDropdown/ProfileDropdown";
import { SettingsDropdown } from "../components/settingsDropdown/SettingsDropdown";
import { HeaderFullscreen } from "../components/HeaderFullscreen/HeaderFullscreen";

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  isTwoColumnsLayout,
}) => {
  return (
    <Row justify="space-between" align="middle">
      {/* <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}> */}
      <Row
        align="middle"
        justify="end"
        style={{
          width: "98%",
          marginTop: "1.5rem",
        }}
        gutter={[10, 10]}
      >
        <Col>
          <Row gutter={[{ xxl: 10 }, { xxl: 10 }]}>
            <Col>
              <HeaderFullscreen />
            </Col>

            <Col>
              <SettingsDropdown />
            </Col>
          </Row>
        </Col>

        <Col>
          <ProfileDropdown />
        </Col>
      </Row>
      {/* </S.ProfileColumn> */}
    </Row>
  );
};
