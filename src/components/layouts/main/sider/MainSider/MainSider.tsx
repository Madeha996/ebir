import React, { useMemo } from "react";
import Overlay from "../../../../common/Overlay";
import { useResponsive } from "hooks/useResponsive";
import * as S from "./MainSider.styles";
import SiderMenu from "../SiderMenu/SiderMenu";
import { Image, Row } from "antd";
import Logo from "@app/assets/images/logo.png";

interface MainSiderProps {
  isCollapsed: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
}

const MainSider: React.FC<MainSiderProps> = ({
  isCollapsed,
  setCollapsed,
  ...props
}) => {
  const { isDesktop, mobileOnly, tabletOnly } = useResponsive();

  const isCollapsible = useMemo(
    () => mobileOnly && tabletOnly,
    [mobileOnly, tabletOnly]
  );

  const toggleSider = () => setCollapsed(!isCollapsed);

  return (
    <>
      <S.Sider
        trigger={null}
        collapsed={!isDesktop && isCollapsed}
        collapsedWidth={tabletOnly ? 80 : 0}
        collapsible={isCollapsible}
        width={260}
        {...props}
      >
        <Row justify={"center"}>
          <Image
            src={Logo}
            alt="logo"
            width={150}
            preview={false}
            style={{ margin: "0 auto" }}
          />
        </Row>

        <S.SiderContent>
          <SiderMenu setCollapsed={setCollapsed} />
        </S.SiderContent>
      </S.Sider>
      {mobileOnly && <Overlay onClick={toggleSider} show={!isCollapsed} />}
    </>
  );
};

export default MainSider;
