import React, { Children } from 'react';
import { Theme, useMediaQuery } from '@mui/material';
import {
  StyledAppBar,
  StyledContentBox,
  StyledPortalAdminTitle,
  StyledToolbar,
  StyledLogoAndTitleSection,
} from './AppBar.styled';
import { CompanyLogo } from '../CompanyLogo';
import { MobileMenu } from '../MobileMenu';
import type { ApplicationBarProps } from './types';

/**
 * The AppBar component renders a custom MuiAppBar.
 *
 * @param {ReactNode} children React node/s to be rendered as children of the AppBar
 *
 * @example
 *
 * const MyAppBar = props => {
 *   return (
 *       <AppBar {...props}>
 *           <CustomBaseTitle
 *               variant="h6"
 *               color="inherit"
 *               className={classes.title}
 *           />
 *       </AppBar>
 *   );
 *};
 *
 * @example Template AppBar
 *
 * const MyAppBar = props => {
 *   return (
 *       <AppBar {...props} />
 *   );
 *};
 *
 * @todo add css classes customizations for toolbar and main container
 */

export const AppBar = ({ children }: ApplicationBarProps) => {
  const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <StyledContentBox>
          {Children.count(children) === 0 ? (
            <>
              <StyledLogoAndTitleSection>
                {isSmall ? <MobileMenu /> : <CompanyLogo />}
                <StyledPortalAdminTitle id="portal-admin-title" />
              </StyledLogoAndTitleSection>
              <div id="portal-admin-actions" />
            </>
          ) : (
            children
          )}
        </StyledContentBox>
      </StyledToolbar>
    </StyledAppBar>
  );
};
