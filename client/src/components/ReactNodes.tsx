import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { ProFromListCommonProps } from "@ant-design/pro-form/es/components/List/ListItem";

export const actionRender: ProFromListCommonProps["actionRender"] = (
  field,
  actions,
) => [
  <Button
    key={field.key}
    danger
    type={"link"}
    onClick={() => {
      actions?.remove(field.key);
    }}
  >
    <DeleteOutlined />
  </Button>,
];
