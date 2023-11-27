import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { DataSourceType } from '../index';
import { ActionType, ProFormInstance } from '@ant-design/pro-components';
import React from 'react';

export const Actions =
  (
    actionRef: React.MutableRefObject<ActionType | undefined>,
    formRef: React.MutableRefObject<ProFormInstance<any> | undefined>,
  ) =>
  (_dom: React.ReactNode, row: DataSourceType) => [
    <a
      key='edit'
      onClick={() => {
        actionRef.current?.startEditable(row.id);
      }}
    >
      <EditOutlined />
    </a>,
    <a
      key='delete'
      onClick={() => {
        const tableDataSource = formRef.current?.getFieldValue(
          'table',
        ) as DataSourceType[];
        formRef.current?.setFieldsValue({
          table: tableDataSource.filter((item) => item.id !== row?.id),
        });
      }}
    >
      <DeleteOutlined />
    </a>,
  ];
