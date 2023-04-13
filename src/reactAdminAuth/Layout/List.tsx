import React from 'react';
import { ListBase, useGetResourceLabel, ListView, RaRecord, useResourceContext } from 'react-admin';
import { Title } from './Title';
import { ListToolbar } from './ListToolbar';
import type { ListProps } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const List = <RecordType extends RaRecord = any>({
  title,
  actionButtons,
  contextMenu,
  debounce,
  disableAuthentication,
  disableSyncWithLocation,
  exporter,
  filter,
  filterDefaultValues,
  perPage,
  queryOptions,
  sort,
  storeKey,
  ...rest
}: ListProps) => {
  const resource = useResourceContext();
  const getResourceLabel = useGetResourceLabel();
  const defaultTitle = title ?? getResourceLabel(resource, 2);
  return (
    <ListBase<RecordType>
      debounce={debounce}
      disableAuthentication={disableAuthentication}
      disableSyncWithLocation={disableSyncWithLocation}
      exporter={exporter}
      filter={filter}
      filterDefaultValues={filterDefaultValues}
      perPage={perPage}
      queryOptions={queryOptions}
      resource={resource}
      sort={sort}
      storeKey={storeKey}
    >
      <Title title={defaultTitle} />
      <ListToolbar actionButtons={actionButtons} contextMenu={contextMenu} />
      <ListView {...rest} />
    </ListBase>
  );
};
