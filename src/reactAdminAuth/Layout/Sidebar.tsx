/* eslint-disable @typescript-eslint/no-use-before-define */
import { Divider, Theme, useMediaQuery, Box, Typography } from '@mui/material';
import { ArrowForwardIos, Close } from '@mui/icons-material';
import React, { useMemo } from 'react';
import { Sidebar, useStore, SidebarProps } from 'react-admin';
import { DefaultFooterMenu } from './FooterMenu';
import {
  StyledMenuFooter,
  StyledMenuContainer,
  StyledSidebarSwitcher,
  DRAWER_WIDTH_COLLAPSED,
  DRAWER_WIDTH_EXPANDED,
} from './Sidebar.styled';
import { CompanyLogo } from './CompanyLogo';

type OSRaSidebarProps = SidebarProps & {
  // eslint-disable-next-line react/require-default-props
  FooterMenu?: React.FC;
  children: React.ReactNode;
};
const OSRaSidebar = ({ children, FooterMenu = DefaultFooterMenu, ...rest }: OSRaSidebarProps) => {
  const [open] = useStore('ui.sidebar');
  const drawerWidth = !open ? DRAWER_WIDTH_COLLAPSED : DRAWER_WIDTH_EXPANDED;
  return (
    <Sidebar
      sx={{
        height: 'auto',
        '& .RaSidebar-paper': {
          backgroundColor: 'background.paper',
          borderRight: 1,
          borderRightColor: 'grey.A200',
          width: drawerWidth,
        },
        '& .RaSidebar-fixed': {
          height: 'calc(100vh - 4.5em)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: drawerWidth,
        },
        '& .RaMenuItemLink-icon': {
          display: 'flex',
          justifyContent: 'center',
          marginRight: 1.5,
        },
        '& .MuiList-root.RaMenu-closed': {
          width: drawerWidth,
        },
        '& .MuiList-root.RaMenu-open': {
          width: '100%',
        },
        '& .MuiMenuItem-root': {
          '&:hover': {
            '& .MuiSvgIcon-root': {
              color: 'primary.main',
            },
            backgroundColor: 'transparent',
            boxShadow: 'inset 5px 0px 0px #0c7788',
          },
          backgroundColor: 'transparent',
          minHeight: 44,
          paddingLeft: 1.5,
        },
      }}
      open={open}
      {...rest}
    >
      <SidebarContainer FooterMenu={FooterMenu}>{children}</SidebarContainer>
    </Sidebar>
  );
};

type SidebarContainerProps = {
  children: React.ReactNode;
  FooterMenu: React.FC;
};
const SidebarContainer = ({ children, FooterMenu }: SidebarContainerProps) => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  return (
    <>
      {isSmall && <CompanyLogo />}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: { xs: '91%', sm: '100%' },
        }}
      >
        <StyledMenuContainer>{children}</StyledMenuContainer>
        <Box>
          <FooterMenu />
          <StyledMenuFooter>
            <Divider />
            <SidebarToggle />
          </StyledMenuFooter>
        </Box>
      </Box>
    </>
  );
};

const SidebarToggle = () => {
  const [open, setOpen] = useStore('ui.sidebar', false);
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const toggleSidebar = () => setOpen(!open);
  const Icon = useMemo(() => (open ? <Close /> : <ArrowForwardIos />), [open]);
  return (
    <StyledSidebarSwitcher aria-label="open drawer" onClick={toggleSidebar}>
      {isSmall ? <Close /> : Icon}
      {open && <Typography>close</Typography>}
    </StyledSidebarSwitcher>
  );
};

export default OSRaSidebar;
