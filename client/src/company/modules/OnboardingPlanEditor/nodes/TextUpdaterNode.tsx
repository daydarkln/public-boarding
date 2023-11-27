import React from "react";
import { Handle, Position } from "reactflow";
import { Card, theme } from "antd";

interface TextUpdaterNodeProps {
  data: {
    handleId: string;
  };
}

export const TextUpdaterNode: React.FC<TextUpdaterNodeProps> = ({ data }) => {
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
      />
      <Card title='Card title' bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
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
