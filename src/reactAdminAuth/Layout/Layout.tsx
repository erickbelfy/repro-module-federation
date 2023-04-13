import React from 'react';
import { Layout, LayoutProps } from 'react-admin';
import { AppBar as OSRaAppBar } from './AppBar';
import OSRaSidebar from './Sidebar';

type PlatformLayoutProps = LayoutProps;
/*
 * Layout
 * @ Todo allow users to customize their own appbar and pass it as a prop
 * */
export const PlatformLayout = (props: PlatformLayoutProps) => {
  return (
    <Layout
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      appBar={OSRaAppBar}
      sidebar={OSRaSidebar}
      sx={{
        '& .RaLayout-appFrame': { marginTop: 0 },
        '& .RaLayout-content': {
          paddingTop: 2.5,
          paddingLeft: 2.5,
          paddingRight: 2.5,
          overflowY: 'auto',
        },
      }}
      {...props}
    />
  );
};
