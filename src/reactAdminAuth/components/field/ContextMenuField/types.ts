import type { PopoverOrigin } from '@mui/material';
import type { ReactElement, ElementType, ReactNode } from 'react';
import type { TypographyProps, MenuItemProps } from '@onespan/components';
import type { FunctionFieldProps, RaRecord } from 'react-admin';

export type ContextMenuFieldProps = FunctionFieldProps &
  Omit<TypographyProps, 'textAlign'> & {
    // TypographyProps do not expose the component props, see https://github.com/mui-org/material-ui/issues/19512
    component?: ElementType;
    anchorOrigin?: PopoverOrigin;
    transformOrigin?: PopoverOrigin;
    AnchorComponent: ReactElement;
    render: (params: {
      record?: RaRecord;
      source?: string;
      onCloseHandler?: () => void;
    }) => ReactNode;
  };

export type ContextMenuFieldItemProps = Omit<MenuItemProps, 'ref'> & {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ReactElement | any;
  title: string;
  tooltip?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  'data-testid'?: string;
  className?: string;
};
