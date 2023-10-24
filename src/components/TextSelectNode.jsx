import { useCallback } from "react";
import { Handle, Position } from "reactflow";

import { Card, Select } from "antd";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

export function TextSelectNode({ data }) {
  return (
    <div className="text-updater-node">
      <Handle type="target" position={Position.Left} isConnectable={true} />
      <Card title="Card title" bordered={false} style={{ width: 300 }}>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "jack", label: "Jack" },
            { value: "lucy", label: "Lucy" },
            { value: "Yiminghe", label: "yiminghe" },
            { value: "disabled", label: "Disabled", disabled: true },
          ]}
        />
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
