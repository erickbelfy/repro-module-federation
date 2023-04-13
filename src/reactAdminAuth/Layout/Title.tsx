import React, { useEffect, useState, forwardRef } from 'react';
import { ArrowBack, Close } from '@mui/icons-material';
import { Button, IconButton, Typography } from '@mui/material';
import { createPortal } from 'react-dom';
import type { NavigationContentProps } from './AppBar';
import { StyledTitleContainer } from './Title.styled';

/**
 * The Title component allows users to configure the Appbar options.
 *
 * @param {NavigationClearButtonProps} props.clearButtonProps Add clear button after the title
 * @param {Function} props.clickIconHandler in case you have an icon you can assign an action
 * @param {Boolean} props.mode To de defined if we need this or not
 * @param {String | ReactNode} props.title title of the page
 * @param {TypographyProps} props.titleProps props of the title, accessible when title is a string
 *
 * @example
 *
 * const MyPage = props => {
 *   return (
      <Title
        clearAllButtonProps={{
          label: 'Clear all',
          onClick: () => { console.log('clear something'),
        }}
        clickIconHandler={() => { console.log('close something')} }
        mode="Navigation"
        title={<Typography variant="body2">Custom title</Typography>}
      />
 *   );
 *};
 *
 */
export const Title = forwardRef(
  (
    { clearButtonProps, clickIconHandler, mode, title, titleProps }: NavigationContentProps,
    ref
  ) => {
    const Icon = mode === 'Navigation' ? ArrowBack : Close;
    const [container, setContainer] = useState<HTMLElement | null>(null);

    useEffect(() => {
      const portal = document.getElementById('portal-admin-actions');
      if (portal) {
        setContainer(portal);
      }
    }, []);

    if (!container) return null;

    return createPortal(
      <>
        {clickIconHandler && (
          <IconButton
            data-testid={mode}
            onClick={clickIconHandler}
            nonce={undefined}
            touchRippleRef={undefined}
          >
            <Icon />
          </IconButton>
        )}
        {typeof title === 'string' ? (
          <StyledTitleContainer ref={ref}>
            <Typography id="platform-admin-title" variant="h5" nonce={undefined} {...titleProps}>
              {title}
            </Typography>
            {clearButtonProps && (
              <Button color="primary" {...clearButtonProps}>
                {clearButtonProps.label}
              </Button>
            )}
          </StyledTitleContainer>
        ) : (
          title
        )}
      </>,
      container
    );
  }
);
