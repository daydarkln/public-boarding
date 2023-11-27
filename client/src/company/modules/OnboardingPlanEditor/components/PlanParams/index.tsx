// @flow
import * as React from "react";
import { Descriptions, DescriptionsProps, Space, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useOnboardingPlanStore } from "../../stores/onboardingPlanStore";
import { prop, uniqBy } from "ramda";

export const PlanParams: React.FC = () => {
  const { edges, nodes } = useOnboardingPlanStore();
  const dataEdges = uniqBy(prop("source"))(edges);
  const items: DescriptionsProps["items"] = [
    {
      key: "nodes",
      label: "Модулей",
      children: nodes?.length,
    },
    {
      key: "edges",
      label: "Связей",
      children:
        nodes?.length - dataEdges?.length === 1 || nodes?.length === 0 ? (
          dataEdges?.length
        ) : (
          <Space>
            {dataEdges?.length}
            <Tooltip title={`У вас модули без связей`}>
              <InfoCircleOutlined />
            </Tooltip>
          </Space>
        ),
    },
  ];
  return <Descriptions title='Параметры плана' items={items} />;
};
