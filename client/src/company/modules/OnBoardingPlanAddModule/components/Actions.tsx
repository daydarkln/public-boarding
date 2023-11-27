import * as React from "react";
import { FormListActionType, ProFormText } from "@ant-design/pro-components";
import { useRef } from "react";
import { Button, Space } from "antd";

export const Actions = (props) => {
  const { actions } = props;

  return (
    <>
      <Space>
        <Button
          type='primary'
          onClick={() => {
            const list = actions?.getList();
            actions?.add({
              name: "New" + list?.length,
            });
          }}
        >
          add a line
        </Button>
        <Button
          danger
          onClick={() => {
            actions?.remove(1);
          }}
        >
          delete a line
        </Button>
        <Button
          onClick={() => {
            actions?.move(1, 0);
          }}
        >
          move to the first line
        </Button>
        <Button
          type='dashed'
          onClick={() => {
            const row = actions?.get(1);
          }}
        >
          Get a row of data
        </Button>
        <Button
          type='dashed'
          onClick={() => {
            const row = actions?.getList();
          }}
        >
          get all data
        </Button>
      </Space>
    </>
  );
};
