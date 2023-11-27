import React from "react";
import { Handle, Position } from "reactflow";
import { Card, Descriptions, InputNumber, theme } from "antd";
import { NodeData } from "../index";
import { ProFormDigit } from "@ant-design/pro-components";

interface TextSelectNodeProps {
  data: NodeData;
}

export const QuizNode: React.FC<TextSelectNodeProps> = ({ data }) => {
  const { token } = theme.useToken();
  return (
    <div
      className='text-updater-node'
      style={{
        background: token.colorPrimaryBg,
        borderColor: token.colorBorderBg,
      }}
    >
      <Handle
        style={{ background: token.colorText }}
        type='target'
        position={Position.Left}
        isConnectable
        id='g'
      />
      <Card title={data.title} bordered={false} style={{ width: 350 }}>
        <Descriptions
          layout={"horizontal"}
          items={[
            {
              key: "type",
              label: "Тип",
              span: 3,
              children: <>{data.type}</>,
            },
            {
              key: "duration",
              span: 6,
              label: "Продолжительность, дней",
              children: <InputNumber defaultValue={data.duration} />,
            },
          ]}
        />
      </Card>
      <Handle
        style={{ background: token.colorText }}
        type='source'
        position={Position.Right}
        id={data.handleId}
        isConnectable={true}
      />
    </div>
  );
};
