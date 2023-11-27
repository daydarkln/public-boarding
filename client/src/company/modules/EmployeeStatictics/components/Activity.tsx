import { Charts } from "~components";
import { Button, Card, Col, Empty, Row, Tag, Timeline } from "antd";
import React, { memo } from "react";

import dayjs from "dayjs";
import { ArrowDownOutlined } from "@ant-design/icons";
import { green, blue } from "@ant-design/colors";
import { fetchEmployee } from "~api";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const activityTypes = {
  text: { color: green[5], text: "Статья" },
  test: { color: blue[5], text: "Тест" },
};

const Activity: React.FC = () => {
  const { id } = useParams();
  const { data: currentEmployee } = useQuery({
    queryKey: ["onboardingDetailsCompany"],
    queryFn: fetchEmployee(id),
  });

  const steps = currentEmployee?.data?.onboardingResult || [];

  return (
    <Card title={"Активность"}>
      {steps.length > 0 ? (
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Charts.HeatMapChart />
            </Card>
          </Col>
          <Col span={24}>
            <Card title='История активности' bordered>
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
              <Button type={"link"} icon={<ArrowDownOutlined />}>
                Посмотреть все
              </Button>
            </Card>
          </Col>
        </Row>
      ) : (
        <Empty />
      )}
    </Card>
  );
};

export default memo(Activity);
