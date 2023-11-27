import React from "react";
import { ProCard } from "@ant-design/pro-components";
import {
  Steps,
  Button,
  Space,
  notification,
  Card,
  Empty,
  Row,
  Col,
} from "antd";
import { OnBoardingPlan, User } from "~types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchModules, updateUser } from "~api";
import { useNavigate } from "react-router-dom";
import Meta from "antd/lib/card/Meta";
import { atcb_action } from "add-to-calendar-button";
import { CalendarOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { Step } = Steps;

export type Status = "error" | "process" | "finish" | "wait";

export interface StagesProps {
  onBoardingPlan?: OnBoardingPlan;
  current: number;
  currentEmployee?: User | null;
  // eslint-disable-next-line no-unused-vars
  handleCurrentSteps: (step: number) => void;
}

const Stages: React.FC<StagesProps> = (props) => {
  const { onBoardingPlan, currentEmployee, current, handleCurrentSteps } =
    props;

  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = () => {
    api["success"]({
      message: "Пооздравляем, вы узнали еще больше",
      description: "Продолжайте в том же духе, вы молодец",
    });
  };

  const openCompleteNotificationWithIcon = () => {
    api["success"]({
      message: "Пооздравляем, вы завершили онбординг",
    });
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      if (current + 1 === steps.length) {
        openCompleteNotificationWithIcon();
        navigate("/employee");
      } else openNotificationWithIcon();
    },
  });
  const { data: modulesData } = useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
  });

  const steps = onBoardingPlan?.onboardingPlanNodesEdges?.data?.nodes || [];

  const currentModule = modulesData?.data?.data?.find(
    (module: any) =>
      module?.attributes?.title ===
      steps[currentEmployee?.data?.currentStep || 0]?.data?.title,
  );

  const renderContent = () => {
    if (currentEmployee?.data?.isOnBoardingPlanComplete) {
      return (
        <Card bordered={false}>
          <>
            <Button
              type={"link"}
              onClick={(e) => {
                e.stopPropagation();
                atcb_action({
                  name: "Title",
                  options: [
                    "Google",
                    "Microsoft365",
                    "MicrosoftTeams",
                    "Outlook.com",
                  ],
                  listStyle: "overlay",
                  hideIconModal: true,
                  hideBackground: true,
                  hideCheckmark: true,
                  label: "",
                  location: "Встреча с руководителем",
                  startDate: dayjs().format("YYYY-MM-DD"),
                  endDate: dayjs().add(1, "hour").format("YYYY-MM-DD"),
                  startTime: dayjs().add(1, "hour").format("hh:mm"),
                  endTime: dayjs().add(2, "hour").format("hh:mm"),
                  timeZone: "Europe/Moscow",
                });
              }}
              icon={<CalendarOutlined />}
            >
              Создать встречу с HR
            </Button>
            <div className={"text-[24px] whitespace-nowrap text-green-400"}>
              Поздравляю, вы завершили онбординг!
            </div>
          </>
        </Card>
      );
    } else {
      return (
        <>
          {currentModule?.attributes?.description && (
            <h3>{currentModule?.attributes?.description}</h3>
          )}
          {currentModule?.attributes?.moduleType === "text" && (
            <div
              dangerouslySetInnerHTML={{
                __html: currentModule?.attributes?.moduleTypeData?.data,
              }}
            />
          )}
        </>
      );
    }
  };

  if (!steps?.length) return <Empty />;

  return (
    <>
      {contextHolder}
      <ProCard
        title='Этапы онбординга'
        split={"vertical"}
        bordered
        style={{ paddingInline: 20 }}
      >
        <Row>
          <Col span={8}>
            <ProCard colSpan={6} bordered style={{ minHeight: 200 }}>
              <Steps
                direction={"vertical"}
                size='small'
                current={current}
                style={{ height: "100%" }}
              >
                {steps.map((item, index) => {
                  let status: Status = "process";
                  if (current === index) status = "process";
                  if (index > current) status = "wait";
                  if (current > index) status = "finish";

                  return (
                    <Step
                      key={index}
                      status={status}
                      title={item.data?.title}
                    />
                  );
                })}
              </Steps>
            </ProCard>
          </Col>
          <Col span={16}>
            <ProCard
              title={
                <div className={"flex items-center"}>
                  <p className={"mr-10"}>{steps[current]?.data?.title}</p>
                </div>
              }
              colSpan={18}
            >
              {renderContent()}
              {!currentEmployee?.data?.isOnBoardingPlanComplete && (
                <>
                  {steps.length > 0 ? (
                    <>
                      <Space className='mb-10'>
                        {steps[current]?.data?.type !== "Текст" && (
                          <>
                            <Button
                              type='primary'
                              onClick={() => {
                                navigate("/quiz", {
                                  state: {
                                    modules: modulesData?.data?.data,
                                    currentStepModule: currentModule?.id,
                                  },
                                });
                              }}
                            >
                              Пройти тестирование
                            </Button>
                          </>
                        )}
                        {steps[current]?.data?.type !== "Опрос" && (
                          <>
                            {current + 1 !== steps.length && (
                              <Button
                                type='primary'
                                loading={isPending}
                                onClick={() => {
                                  mutateAsync({
                                    id: `${currentEmployee?.data?.id}`,
                                    user: {
                                      currentStep: `${
                                        Number(
                                          currentEmployee?.data?.currentStep,
                                        ) + 1
                                      }`,
                                    },
                                  });
                                }}
                              >
                                Изучил
                              </Button>
                            )}
                          </>
                        )}
                      </Space>
                      <Space>
                        <Button
                          key='pre'
                          onClick={() =>
                            handleCurrentSteps(Math.max(current - 1, 0))
                          }
                          disabled={current === 0}
                        >
                          Предыдущий
                        </Button>
                        <Button
                          key='primary'
                          type='primary'
                          onClick={() => {
                            if (current + 1 === steps.length) {
                              mutateAsync({
                                id: `${currentEmployee?.data?.id}`,
                                user: {
                                  currentStep: `${Number(steps.length)}`,
                                  isOnBoardingPlanComplete: true,
                                },
                              });
                            } else handleCurrentSteps(current + 1);
                          }}
                        >
                          {current + 1 <= steps.length - 1
                            ? "Следующий шаг"
                            : "Завершить онбординг"}
                        </Button>
                      </Space>
                    </>
                  ) : (
                    <Empty />
                  )}
                </>
              )}
            </ProCard>
          </Col>
        </Row>
      </ProCard>
    </>
  );
};

export default Stages;
