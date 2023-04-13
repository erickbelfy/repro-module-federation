import React, { createContext, ReactNode, useMemo } from 'react';

export const LayoutContext = createContext<{
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AppLogo: any;
}>({
  name: 'Onespan',
  AppLogo: <p>test</p>,
});
export const LayoutProvider = ({
  children,
  name,
  AppLogo,
}: {
  children: ReactNode;
  name: string;
  AppLogo: JSX.Element;
}) => {
  return useMemo(
    () => <LayoutContext.Provider value={{ name, AppLogo }}>{children}</LayoutContext.Provider>,
    [AppLogo, children, name]
  );
};
