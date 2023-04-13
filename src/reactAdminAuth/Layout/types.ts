/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ReactNode, ComponentType, ReactElement } from 'react';

import type { MenuItemProps, ButtonProps } from '@mui/material';

import type { ListProps as RAListProps } from 'react-admin';
import type { LinkProps } from 'react-router-dom';

export type TitleComponent = string | ReactElement<any>;
export type CoreLayoutProps = {
  children?: ReactNode;
  menu?: ComponentType<{
    hasDashboard?: boolean;
  }>;
  title?: TitleComponent;
};

export type MenuItem = MenuItemProps & {
  label: string;
  icon?: ReactNode;
};

export type ContextMenu = {
  options: MenuItem[];
};

export type ApplicationBarButtonProps = ButtonProps & {
  label: string;
};

export type ListProps = RAListProps & {
  children: JSX.Element;
  title?: ReactNode | string;
  actionButtons?: ApplicationBarButtonProps[];
  contextMenu?: ContextMenu;
};

export type MenuItemLinkProps = MenuItemProps<'li'> &
  Omit<LinkProps, 'to'> & {
    to?: unknown; // extracted from history package
    leftIcon?: ReactElement;
    primaryText?: ReactNode;
  };
