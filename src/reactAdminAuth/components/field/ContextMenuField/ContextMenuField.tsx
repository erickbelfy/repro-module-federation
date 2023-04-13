/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/require-default-props */
import React from 'react';
import { useRecordContext } from 'react-admin';
import { StyledMenu } from './ContextMenuField.styled';
import dataIds from './dataIds';
import type { ContextMenuFieldProps } from './types';

export const ContextMenuField = ({
  AnchorComponent,
  anchorOrigin = {
    vertical: 40,
    horizontal: 10,
  },
  transformOrigin = {
    vertical: 'top',
    horizontal: 'right',
  },
  render,
  source,
}: ContextMenuFieldProps) => {
  const record = useRecordContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {React.cloneElement(AnchorComponent, { onClick: handleClick })}
      <StyledMenu
        elevation={0}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        keepMounted
        onClose={handleClose}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        data-testid={dataIds.ContextMenu.id}
      >
        {render({ record, source, handleClose })}
      </StyledMenu>
    </>
  );
};
