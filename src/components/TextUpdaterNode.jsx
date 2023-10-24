import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import { Card } from "antd";

export function TextUpdaterNode({ data }) {
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={true} />

      <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
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
