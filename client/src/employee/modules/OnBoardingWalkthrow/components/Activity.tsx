import { ProCard } from "@ant-design/pro-components";
import { Charts } from "~components";
import { Button, Card, Tag, Timeline } from "antd";
import React from "react";
import { OnBoardingPlan } from "~types";
import { useEmployee } from "~hooks";
import { ArrowDownOutlined } from "@ant-design/icons";
import { green, blue } from "@ant-design/colors";

const activityTypes = {
  text: { color: green[5], text: "Статья" },
  test: { color: blue[5], text: "Тест" },
};

export interface ActivityProps {
  onBoardingPlan?: OnBoardingPlan;
}

const Activity: React.FC<ActivityProps> = () => {
  const { currentEmployee } = useEmployee();

  const steps = currentEmployee?.data?.onboardingResult || [];

  return (
    <ProCard
      direction='column'
      ghost
      gutter={[0, 16]}
      bodyStyle={{ paddingBlock: 0, paddingInline: 0 }}
    >
      <h2>Активность</h2>
      <div className={"grid grid-cols-2 "}>
        <Charts.HeatMapChart />

        <Card title='Активность сотрудника' bordered>
          <Timeline>
            {steps?.map((activity) => {
              return (
                <Timeline.Item key={activity.id}>
                  <p>
                    {activity?.title}{" "}
                    <Tag color={activityTypes[activity.action].color}>
                      {activityTypes[activity.action].text}
                    </Tag>
                  </p>
                  <p>{activity?.creationTime}</p>
                </Timeline.Item>
              );
            })}
          </Timeline>
          <Button type={"link"} icon={<ArrowDownOutlined />}>
            Посмотреть все
          </Button>
        </Card>
      </div>
    </ProCard>
  );
};

export default Activity;
