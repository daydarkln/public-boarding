import { Handle, Position } from "reactflow";

import { Card, Space, Input, Button } from "antd";

export function TextInputNode({ data }) {
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <Space.Compact style={{ width: "100%" }}>
          <Input defaultValue="Combine input and button" />
          <Button type="primary">Submit</Button>
        </Space.Compact>
      </Card>
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        isConnectable={true}
      />
    </div>
  );
}
