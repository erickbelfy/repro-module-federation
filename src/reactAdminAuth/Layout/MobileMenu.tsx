import React from 'react';
import { useStore } from 'react-admin';
import { Menu } from '@mui/icons-material';
import { StyledIconButton } from './MobileMenu.styled';
import { StyledLogoContainer } from './CompanyLogo.styled';

export const MobileMenu = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useStore('ui.sidebar');
  const handleLeftDrawerOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <StyledLogoContainer
      sx={{
        backgroundColor: { xs: 'transparent' },
      }}
    >
      <StyledIconButton aria-label="open drawer" onClick={handleLeftDrawerOpen}>
        <Menu />
      </StyledIconButton>
    </StyledLogoContainer>
  );
};
