import { Charts } from "~components";
import { Card, Col, Empty, Row, Tag, Timeline } from "antd";
import React, { memo } from "react";
import dayjs from "dayjs";
import { green, blue } from "@ant-design/colors";
import { useEmployee } from "~hooks";
import RecommendedMaterialCard from "./RecommendedMaterialCard";

const activityTypes = {
  text: { color: green[5], text: "Статья" },
  test: { color: blue[5], text: "Тест" },
};

const Activity: React.FC = () => {
  const { currentEmployee } = useEmployee();
  const steps = currentEmployee?.data?.onboardingResult || [];

  return (
    <Card title={"Активность"}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card>
            <Charts.HeatMapChart />
          </Card>
        </Col>
        <Col span={12}>
          <Card title='История активности' bordered>
            {steps.length > 0 ? (
              <Timeline>
                {steps?.map((activity: any) => {
                  return (
                    <Timeline.Item key={activity.id}>
                      <p>
                        {activity?.title}{" "}
                        <Tag color={activityTypes[activity.action].color}>
                          {activityTypes[activity.action].text}
                        </Tag>
                      </p>
                      <p>
                        {dayjs(activity?.creationTime).format(
                          "DD.MM.YYYY, hh:mm",
                        )}
                      </p>
                    </Timeline.Item>
                  );
                })}
              </Timeline>
            ) : (
              <Empty />
            )}
          </Card>
        </Col>
        <Col span={12}>
          <RecommendedMaterialCard />
        </Col>
      </Row>
    </Card>
  );
};

export default memo(Activity);
