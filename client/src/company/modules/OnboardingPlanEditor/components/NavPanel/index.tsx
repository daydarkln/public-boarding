import React, { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { createNode } from "../../utils/graph";
import { Edge, Node } from "reactflow";
import Meta from "antd/lib/card/Meta";

import { Avatar, Button, Card, Drawer, Input, Space, theme } from "antd";
import { ProCard } from "@ant-design/pro-components";
import { MenuOutlined } from "@ant-design/icons";
import { NodeData } from "../../index";
import { useQuery } from "@tanstack/react-query";
import { fetchModules } from "~api";
import { moduleTypes } from "../../../../../utils/mappers";

interface NavPanelProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  nodes: Node[];
}

type AvailableNode = {
  title: string;
  type: string;
  duration: string;
  action: () => void;
  defaultDeadline?: number;
};

const NavPanel: React.FC<NavPanelProps> = ({ setNodes, setEdges, nodes }) => {
  const [search, setSearch] = useState("");
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const addNode = useCallback(
    (type: string, data?: Omit<NodeData, "handleId">) => {
      setNodes((nds) => {
        const newNode = createNode(nds[nds.length - 1], type, data);

        return [...nds, newNode];
      });

      setEdges((eds) => {
        if (nodes.length > 1) {
          return [
            ...eds,
            {
              id: uuidv4(),
              source: nodes[nodes.length - 1]?.id,
              target: nodes[nodes.length]?.id,
              animated: true,
            },
          ];
        }
        return eds;
      });
    },
    [nodes, setEdges, setNodes],
  );

  const { data: modules, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchModules,
  });
  const availableNodes: AvailableNode[] =
    modules?.data?.data?.map((module) => ({
      title: module?.attributes?.title,
      duration: module.attributes.duration,
      type: moduleTypes[module?.attributes?.moduleType],
      action: () =>
        addNode("quizNode", {
          title: module?.attributes?.title,
          type: moduleTypes[module?.attributes?.moduleType],
          duration: module?.attributes?.duration,
        }),
    })) || [];

  const items = (
    <>
      <Input.Search placeholder={"Введите название"} onSearch={setSearch} />
      <Card loading={isLoading}>
        {availableNodes
          .filter((item) =>
            search !== ""
              ? item.title.toLowerCase().includes(search.toLowerCase())
              : true,
          )
          .map((item) => (
            <Card.Grid
              key={item.title}
              style={{ width: "50%" }}
              hoverable
              onClick={item.action}
            >
              <Meta
                title={item.title}
                description={`${item.type}, ${item.duration}`}
                avatar={
                  <Avatar src='https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg' />
                }
              />
            </Card.Grid>
          ))}
      </Card>
    </>
  );

  const { token } = theme.useToken();

  return (
    <>
      <ProCard
        style={{ background: token.colorPrimaryBg }}
        title={"Популярные"}
        extra={
          <>
            <Button
              onClick={() => setIsDrawerOpened(true)}
              icon={<MenuOutlined />}
            >
              Все
            </Button>
            <Drawer
              size={"large"}
              open={isDrawerOpened}
              onClose={() => setIsDrawerOpened(false)}
            >
              {items}
            </Drawer>
          </>
        }
      >
        <div style={{ overflow: "scroll" }}>
          <Space size='large' style={{ padding: "10px 0" }}>
            {availableNodes.map((node) => (
              <Card
                key={node.title}
                style={{ minWidth: 250 }}
                size={"small"}
                hoverable
                onClick={node.action}
              >
                <Meta
                  title={node.title}
                  description={node.duration}
                  avatar={
                    <Avatar src='https://gw.alipayobjects.com/zos/bmw-prod/f601048d-61c2-44d0-bf57-ca1afe7fd92e.svg' />
                  }
                />
              </Card>
            ))}
          </Space>
        </div>
      </ProCard>
    </>
  );
};

export default NavPanel;
