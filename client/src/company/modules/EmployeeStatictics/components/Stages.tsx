import React from "react";
import { ProCard } from "@ant-design/pro-components";
import { Steps, Button, Space, notification } from "antd";
import { OnBoardingPlan, User } from "~types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchModules, updateUser } from "~api";
import { useNavigate } from "react-router-dom";

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

  const { mutateAsync } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      openNotificationWithIcon();
    },
  });
  const { data: modulesData } = useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
  });

  const steps = onBoardingPlan?.onboardingPlanNodesEdges?.data?.nodes || [];

  const currentModule = modulesData?.data?.data?.find(
    (module) =>
      module?.attributes?.title ===
      steps[currentEmployee?.data?.currentStep || 0]?.data?.title,
  );

  return (
    <>
      {contextHolder}
      <ProCard
        direction='column'
        ghost
        gutter={[0, 16]}
        bodyStyle={{ paddingBlock: 0, paddingInline: 0 }}
      >
        <ProCard
          direction='column'
          title={"Этапы онбординга"}
          ghost
          style={{ width: "60vw" }}
          colSpan={16}
          gutter={[0, 16]}
        >
          <ProCard split={"vertical"} bordered>
            <ProCard colSpan={6}>
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
            <ProCard
              title={
                <div className={"flex items-center"}>
                  <p className={"mr-10"}>{steps[current]?.data?.title}</p>
                </div>
              }
              colSpan={18}
            >
              <div className='flex flex-col'>
                {currentModule?.attributes?.description && (
                  <h3>{currentModule?.attributes?.description}</h3>
                )}
                {currentModule?.attributes?.moduleType === "text" ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: currentModule?.attributes?.moduleTypeData?.data,
                    }}
                  />
                ) : (
                  <h3>
                    Чтобы лучше адаптироваться и поднять свои навыки пожалуйста
                    пройдите небольшое тестирование
                  </h3>
                )}
                <Space className='mb-10'>
                  {steps[current]?.data?.type !== "Текст" ? (
                    <>
                      <Button
                        type='primary'
                        onClick={() => {
                          navigate("/quiz", {
                            state: modulesData?.data?.data,
                          });
                        }}
                      >
                        Пройти тестирование
                      </Button>
                    </>
                  ) : (
                    <Button
                      type='primary'
                      onClick={() => {
                        mutateAsync({
                          id: `${currentEmployee?.data?.id}`,
                          user: {
                            currentStep: `${
                              Number(currentEmployee?.data?.currentStep) + 1
                            }`,
                          },
                        });
                      }}
                    >
                      Изучил
                    </Button>
                  )}
                </Space>
                <Space>
                  <Button
                    key='pre'
                    onClick={() => handleCurrentSteps(Math.max(current - 1, 0))}
                    disabled={current === 0}
                  >
                    Предыдущий
                  </Button>
                  <Button
                    key='primary'
                    type='primary'
                    onClick={() => {
                      handleCurrentSteps(
                        Math.min(current + 1, steps.length - 1),
                      );
                    }}
                  >
                    Следующий шаг
                  </Button>
                </Space>
              </div>
            </ProCard>
          </ProCard>
        </ProCard>
      </ProCard>
    </>
  );
};

export default Stages;
