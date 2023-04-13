import React, { useContext } from 'react';
import { useStore } from 'react-admin';
import { LayoutContext } from './LayoutContextProvider';
import {
  StyledLogoWrapper,
  StyledApplicationName,
  StyledLogoContainer,
} from './CompanyLogo.styled';

import { DRAWER_WIDTH_COLLAPSED, DRAWER_WIDTH_EXPANDED } from './Sidebar.styled';

export const CompanyLogo = () => {
  const [isSidebarOpen] = useStore('ui.sidebar');
  const { name, AppLogo } = useContext(LayoutContext);

  return (
    <StyledLogoContainer
      sx={{
        width: isSidebarOpen ? DRAWER_WIDTH_EXPANDED - 1 : DRAWER_WIDTH_COLLAPSED,
        marginRight: { xs: 0, sm: 2.5 },
      }}
    >
      <StyledLogoWrapper>
        <AppLogo />
      </StyledLogoWrapper>
      {isSidebarOpen && <StyledApplicationName>{name}</StyledApplicationName>}
    </StyledLogoContainer>
  );
};
