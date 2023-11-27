import React from "react";
import { Steps, Progress, Card, Row, Col } from "antd";
import { OnBoardingPlan } from "~types";
import Activity from "./Activity";
import { useEmployee } from "~hooks";

const { Step } = Steps;

interface OnboardingStep {
  title: string;
  description: string;
  timeLeft?: string;
}

interface OnboardingProgressProps {
  steps?: OnboardingStep[];
  currentStep?: number;
  currentStepProgress?: number;
  onBoardingPlan?: OnBoardingPlan;
  title?: string;
}

const OnboardingProgress: React.FC<OnboardingProgressProps> = ({
  currentStep = 1,
  onBoardingPlan,
  title,
}) => {
  return (
    <Card title={title ?? ""}>
      <Row>
        <Col span={24}>
          <Steps current={currentStep} className={"mb-10"}>
            {onBoardingPlan?.onboardingPlanNodesEdges?.data?.nodes.map(
              (step, index) => {
                let status = "process";
                if (currentStep === index) status = "process";
                if (index > currentStep) status = "wait";
                if (currentStep > index) status = "finish";
                return (
                  <Step status={status} key={index} title={step?.data?.title} />
                );
              },
            )}
          </Steps>
        </Col>
        <Col span={24}>
          <Activity />
        </Col>
      </Row>
    </Card>
  );
};

export default OnboardingProgress;
