import { useEffect, useState } from "react";
import { useReactFlow, Node } from "reactflow";

interface FlowProps {
  nodes: Node[];
}

const nodeDimensions = { width: 300, height: 200 };

/**
 * The Flow component is responsible for adjusting the view of the React Flow instance.
 * Whenever the number of nodes increases, it centers the view on the last added node.
 *
 * @param {FlowProps} props - Component properties.
 * @param {Node[]} props.nodes - The current list of nodes in the flow.
 */
export function Flow({ nodes }: FlowProps) {
  const reactFlowInstance = useReactFlow();
  const [prevNodesLength, setPrevNodesLength] = useState(nodes.length);

  useEffect(() => {
    if (nodes.length > prevNodesLength && nodes.length > 0) {
      const lastNode = nodes[nodes.length - 1];
      const zoom = reactFlowInstance.getZoom();
      const x = lastNode.position.x + nodeDimensions.width / 2;
      const y = lastNode.position.y + nodeDimensions.height / 2;

      reactFlowInstance.setCenter(x, y, { zoom, duration: 500 });
    }
    setPrevNodesLength(nodes.length);
  }, [nodes, prevNodesLength, reactFlowInstance]);

  return null;
}
