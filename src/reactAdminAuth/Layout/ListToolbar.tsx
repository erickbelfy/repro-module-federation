/* eslint-disable react/no-array-index-key */
import { Search } from '@mui/icons-material';
import React, { useEffect, useState, forwardRef } from 'react';

import { Button } from '@mui/material';
import { createPortal } from 'react-dom';
import { isArray } from 'lodash';
import { StyledBox, StyledTextInput, ApplicationBarContextMenu } from './AppBar';
import type { ActionContentProps } from './AppBar';

/**
 * The Title component allows users to configure the Appbar options.
 *
 * @param {Object} props
 * @param {ReactNode} props.children React node/s to be rendered as children of the AppBar
 * @param {Object} props.inputProps Input props for searching criteria
 * @param {Object} props.contextMenu Context menu options
 * @param {String | ReactNode} props.title title of the page
 * @param {Function} props.clickIconHandler in case you have an icon you can assign an action
 * @param {Boolean} props.mode To de defined if we need this or not.
 * @param {Array[MUIButton]} props.actionButtons List of MUI Buttons.
 *
 * @example
 *
 * const MyPage = props => {
 *   return (
      <ListToolbar
        actionButtons={[
          { label: 'action1', onClick: someHandler, color: 'primary', variant: 'contained' },
          { label: 'action2', onClick: someHandler, color: 'primary', variant: 'outlined' },
        ]}
        contextMenu={{
          options: [
            { label: 'menu1', icon: <AbcSharp />, onClick: () => console.log('Action 1') },
            {
              label: 'menu2',
              icon: <Delete />,
              onClick: () => console.log('Action 2'),
              divider: true,
            },
            { label: 'menu3', icon: <LockSharp />, onClick: () => console.log('Action 3') },
          ],
        }}
      />
 *   );
 *};
 *
 */

export const ListToolbar = forwardRef(
  ({ inputProps, actionButtons, contextMenu }: ActionContentProps, ref) => {
    const { className: inputClass } = inputProps || {};
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
      const portal = document.getElementById('portal-admin-actions');
      if (portal) {
        setContainer(portal);
      }
    }, []);

    if (!container) return null;

    return createPortal(
      <StyledBox ref={ref} display="flex" alignItems="center" id="platform-admin-appbar-actions">
        {inputProps && (
          <StyledTextInput
            slotProps={undefined}
            slots={undefined}
            className={inputClass}
            inputProps={{
              'data-testid': 'search-input',
              ...inputProps.inputProps,
            }}
            startAdornment={<Search />}
            {...inputProps}
          />
        )}
        {isArray(actionButtons) &&
          actionButtons.map(({ label, ...buttonProps }, idx) => (
            <Button key={`${label}-${idx}`} {...buttonProps}>
              {label}
            </Button>
          ))}
        {React.isValidElement(actionButtons) && actionButtons}
        {contextMenu && <ApplicationBarContextMenu {...contextMenu} />}
      </StyledBox>,
      container
    );
  }
);
