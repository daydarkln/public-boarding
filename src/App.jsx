import { useCallback, useMemo, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  useReactFlow,
} from "reactflow";

import { TextUpdaterNode } from "./components/TextUpdaterNode";
import { TextSelectNode } from "./components/TextSelectNode";
import { TextInputNode } from "./components/TextInputNode";
import "reactflow/dist/style.css";

const initialNodes = [
  // ваш начальный массив узлов
];
const initialEdges = [
  // ваш начальный массив ребер
];

const newNodeOffsetX = 400;

function createNewNode(baseNode, type, label) {
  return {
    id: (Number(baseNode.id) + 1).toString(),
    type,
    position: {
      x: baseNode.position.x + newNodeOffsetX,
      y: baseNode.position.y,
    },
    dragHandle: ".ant-card-head",
    data: { label },
  };
}

const nodeWidth = 300; // Замените на фактическую ширину узла
const nodeHeight = 300; // Замените на фактическую высоту узла

function Flow(props) {
  const reactFlowInstance = useReactFlow();
  const [prevNodesLength, setPrevNodesLength] = useState(props.nodes.length);

  useEffect(() => {
    if (props.nodes.length !== prevNodesLength && props.nodes.length > 0) {
      const zoom = reactFlowInstance.getZoom();
      const lastNode = props.nodes[props.nodes.length - 1];
      const x = lastNode.position.x + nodeWidth / 2;
      const y = lastNode.position.y + nodeHeight / 2;

      reactFlowInstance.setCenter(x, y, { zoom, duration: 500 });
    }
    setPrevNodesLength(props.nodes.length);
  }, [props.nodes, prevNodesLength, reactFlowInstance]);

  return null;
}

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNewNode = useCallback(
    (type) => {
      setNodes((nodes) => {
        let newNode;
        if (nodes.length === 0) {
          newNode = {
            id: "1",
            type,
            position: { x: 0, y: 0 },
            dragHandle: ".ant-card-head",
            data: { label: "1" },
          };
        } else {
          const rightmostNode = nodes.reduce((acc, node) =>
            node.position.x > acc.position.x ? node : acc
          );
          newNode = createNewNode(
            rightmostNode,
            type,
            (nodes.length + 1).toString()
          );
        }
        return [...nodes, newNode];
      });
      if (nodes.length > 0) {
        setEdges((eds) => [
          ...eds,
          {
            id: `e${nodes.length}-${nodes.length + 1}`,
            source: nodes.length.toString(),
            target: (nodes.length + 1).toString(),
            animated: true,
          },
        ]);
      }
    },
    [nodes]
  );

  const addNode = useCallback(() => addNewNode("textSelect"), [addNewNode]);
  const addSelectNode = useCallback(
    () => addNewNode("textUpdater"),
    [addNewNode]
  );
  const addInputNode = useCallback(() => addNewNode("textInput"), [addNewNode]);

  const nodeTypes = useMemo(
    () => ({
      textUpdater: TextUpdaterNode,
      textSelect: TextSelectNode,
      textInput: TextInputNode,
    }),
    []
  );

  return (
    <>
      <div style={{ width: "100vw", height: "100vh", display: "flex" }}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button onClick={addNode}>Select node</button>
          <button onClick={addInputNode}>Input node</button>
          <button onClick={addSelectNode}>Text node</button>
        </div>
        <div style={{ width: "100%" }}>
          <h2 style={{ margin: 20 }}>Менеджер проектов</h2>
          <div style={{ width: "100%", height: "calc(100vh - 76px)" }}>
            <ReactFlow
              nodeTypes={nodeTypes}
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              minZoom={0.1}
            >
              <Flow nodes={nodes} />
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </div>
      </div>
    </>
  );
}
