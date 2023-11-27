import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { Card, Input, theme, Typography } from "antd";

interface TextInputNodeProps {
  data: {
    handleId: string;
  };
}

const { Paragraph } = Typography;

export const TextAreaNode: React.FC<TextInputNodeProps> = ({ data }) => {
  const [editableStr, setEditableStr] = useState<string>("Модуль");
  const { token } = theme.useToken();
  const renderTypographyTitle = () => {
    return (
      <Paragraph
        style={{ margin: "10px 20px" }}
        editable={{ onChange: setEditableStr }}
      >
        {editableStr}
      </Paragraph>
    );
  };
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
        id='h'
      />
      <Card
        title={renderTypographyTitle()}
        bordered={false}
        style={{ width: 300 }}
      >
        <Input.TextArea
          placeholder='Введите ваш текст'
          className={"min-w-full"}
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
