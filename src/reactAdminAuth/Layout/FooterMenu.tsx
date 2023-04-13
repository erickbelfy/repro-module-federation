/* eslint-disable react/require-default-props,@typescript-eslint/no-use-before-define */
import React from 'react';
import { MenuList, MenuItem as MuiMenuItem, ListItemIcon } from '@mui/material';
import { Link } from 'react-router-dom';
import { UserMenu as RAUserMenu, useStore, useTranslate } from 'react-admin';
import type { MenuItemLinkProps } from './types';

type FooterMenuProps = {
  children: React.ReactNode;
};
const FooterMenu = ({ children }: FooterMenuProps) => {
  return <MenuList>{children}</MenuList>;
};

const MenuItem = ({ to = null, primaryText, leftIcon, ...rest }: MenuItemLinkProps) => {
  const translate = useTranslate();
  const [open] = useStore('ui.sidebar');
  const linkProps = to
    ? {
        to,
        component: Link,
      }
    : {};
  const renderItem =
    typeof primaryText === 'string' ? translate(primaryText, { _: primaryText }) : primaryText;
  return (
    <MuiMenuItem {...rest} {...linkProps}>
      {leftIcon && <ListItemIcon>{leftIcon}</ListItemIcon>}
      {open ? renderItem : null}
    </MuiMenuItem>
  );
};

FooterMenu.Item = MenuItem;

const DefaultFooterMenu = () => (
  <FooterMenu>
    {/* @todo translate me */}
    <FooterMenu.Item leftIcon={<RAUserMenu />} primaryText="Me" />
  </FooterMenu>
);

export { FooterMenu, DefaultFooterMenu };
