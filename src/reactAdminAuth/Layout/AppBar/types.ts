import type { MouseEvent, ReactNode } from 'react';
import type { ButtonProps, TextInputProps, TypographyProps } from '@onespan/components';
import type { MenuItemProps } from '@mui/material';

export type NavigationContentProps = NavigationProps;
export type ApplicationBarProps = ActionContentProps &
  NavigationContentProps & {
    children?: ReactNode;
  };

export enum BarMode {
  TransFormation = 0,
  Navigation = 1,
}

type ApplicationBarButtonProps = ButtonProps & {
  label: string;
};

type MenuItem = MenuItemProps & {
  label: string;
  icon?: ReactNode;
};

export interface ContextMenu {
  options: MenuItem[];
}

export interface NavigationProps {
  clearButtonProps?: NavigationClearButtonProps;
  clickIconHandler?: (e: MouseEvent<HTMLButtonElement>) => void;
  mode?: keyof typeof BarMode;
  title?: string | ReactNode;
  titleProps?: Omit<TypographyProps, 'children'>;
}

export type NavigationClearButtonProps = {
  label: string;
} & Omit<ButtonProps, 'children'>;

export interface ActionContentProps {
  inputProps?: TextInputProps;
  contextMenu?: ContextMenu;
  actionButtons?: ApplicationBarButtonProps[] | ReactNode;
}
