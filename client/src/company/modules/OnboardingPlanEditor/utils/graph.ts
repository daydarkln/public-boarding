import { v4 as uuidv4 } from "uuid";
import { config } from "../config";
import { Node } from "reactflow";
import { NodeData } from "../index";

interface BaseNode {
  position: { x: number; y: number };
}

export function createNode(
  baseNode?: BaseNode,
  type?: string,
  data?: Omit<NodeData, "handleId">,
): Node {
  const id = uuidv4();
  const position = baseNode
    ? {
        x: baseNode.position.x + config.newNodeOffsetX,
        y: baseNode.position.y,
      }
    : { x: 0, y: 0 };

  return {
    id,
    type: type || "default",
    position,
    dragHandle: ".ant-card-head",
    data: { handleId: uuidv4(), ...data },
  };
}
