import { Icon as MuiIcon, Typography } from '@mui/material';
import React from 'react';
import { StyledIcon, StyledMenuItem } from './ContextMenuField.styled';
import type { ContextMenuFieldItemProps } from './types';

export const ContextMenuItemField = ({
  icon,
  title,
  onClick,
  ...rest
}: ContextMenuFieldItemProps) => {
  return (
    <StyledMenuItem
      onClick={() => {
        onClick();
      }}
      key={title}
      {...rest}
    >
      {icon && <MuiIcon component={icon} sx={{ ...StyledIcon, marginRight: 2 }} />}
      <Typography nonce={undefined}>{title}</Typography>
    </StyledMenuItem>
  );
};
