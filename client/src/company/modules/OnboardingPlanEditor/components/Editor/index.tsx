import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  KeyboardEvent,
} from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  addEdge,
  BackgroundVariant,
  updateEdge,
  Edge,
  Node,
  Connection,
  NodeChange,
  EdgeChange,
} from "reactflow";
import "reactflow/dist/style.css";

import { TextUpdaterNode } from "../../nodes/TextUpdaterNode";
import { QuizNode } from "../../nodes/QuizNode";
import { TextInputNode } from "../../nodes/TextInputNode";
import { TextAreaNode } from "../../nodes/TextAreaNode";
import { Flow } from "../Flow";

interface EditorProps {
  nodes: Node[];
  onNodesChange: (changes: NodeChange[]) => void;
  edges: Edge[];
  onEdgesChange: (changes: EdgeChange[]) => void;
  setEdges: (changes: Edge[] | ((els: Edge[]) => Edge[])) => void;
  setNodes: (changes: Node[] | ((nds: Node[]) => Node[])) => void;
  hideMap?: boolean;
}

interface HistoryState {
  undo: { nodes: Node[]; edges: Edge[] }[];
  redo: { nodes: Node[]; edges: Edge[] }[];
}

const Editor: React.FC<EditorProps> = ({
  hideMap,
  nodes,
  onNodesChange,
  edges,
  onEdgesChange,
  setEdges,
  setNodes,
}) => {
  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) =>
      setEdges((els) => updateEdge(oldEdge, newConnection, els)),
    [setEdges],
  );

  const nodeTypes = useMemo(
    () => ({
      textUpdater: TextUpdaterNode,
      quizNode: QuizNode,
      textInput: TextInputNode,
      textArea: TextAreaNode,
    }),
    [],
  );

  const [history, setHistory] = useState<HistoryState>({
    undo: [],
    redo: [],
  });

  const saveHistory = useCallback(
    (newNodes: Node[], newEdges: Edge[]) => {
      setHistory(({ undo }) => ({
        undo: [...undo, { nodes, edges }],
        redo: [],
      }));
      setNodes(newNodes);
      setEdges(newEdges);
    },
    [nodes, edges, setNodes, setEdges],
  );

  const undo = useCallback(() => {
    setHistory(({ undo, redo }) => {
      if (undo.length === 0) return { undo, redo };
      const { nodes: prevNodes, edges: prevEdges } = undo[undo.length - 1];
      setNodes(prevNodes);
      setEdges(prevEdges);
      return {
        undo: undo.slice(0, -1),
        redo: [...redo, { nodes, edges }],
      };
    });
  }, [nodes, edges, setNodes, setEdges]);

  const redo = useCallback(() => {
    setHistory(({ undo, redo }) => {
      if (redo.length === 0) return { undo, redo };
      const { nodes: nextNodes, edges: nextEdges } = redo[redo.length - 1];
      setNodes(nextNodes);
      setEdges(nextEdges);
      return {
        undo: [...undo, { nodes, edges }],
        redo: redo.slice(0, -1),
      };
    });
  }, [nodes, edges, setNodes, setEdges]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        if (event.shiftKey) {
          redo();
        } else {
          undo();
        }
      }
    },
    [undo, redo],
  );

  useEffect(() => {
    const handleEvent = (event: KeyboardEvent) => {
      handleKeyDown(event);
    };
    window.addEventListener("keydown", handleEvent as unknown as EventListener);
    return () =>
      window.removeEventListener(
        "keydown",
        handleEvent as unknown as EventListener,
      );
  }, [handleKeyDown]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  return (
    <div style={{ height: "60vh", minWidth: 700 }}>
      <ReactFlow
        onEdgeUpdate={onEdgeUpdate}
        nodeTypes={nodeTypes}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
        minZoom={0.1}
        defaultEdgeOptions={{ animated: true }}
        onNodesDelete={(nodesToDelete) =>
          saveHistory(
            nodes.filter((node) => !nodesToDelete.includes(node)),
            edges,
          )
        }
        onEdgesDelete={(edgesToDelete) =>
          saveHistory(
            nodes,
            edges.filter((edge) => !edgesToDelete.includes(edge)),
          )
        }
      >
        <Flow nodes={nodes || []} />
        <Controls />
        {!hideMap && <MiniMap pannable />}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
};

export default Editor;
