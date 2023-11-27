import { Page } from "~components";
import Stages from "./components/Stages";
import RecommendedMaterialCard from "./components/RecommendedMaterialCard";
import { useEmployee } from "~hooks";
import { useEffect, useState } from "react";

export type DataSourceType = {
  title: string;
  avatar: string;
  type: string;
  value: number;
};

export default () => {
  const { currentEmployee } = useEmployee();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (currentEmployee?.data?.currentStep)
      setCurrent(Number(currentEmployee?.data?.currentStep));
  }, [currentEmployee?.data?.currentStep]);

  const onBoardingPlan = currentEmployee?.data?.onBoardingPlan;

  const handleCurrentStep = (step: number) => {
    setCurrent(step);
  };

  return (
    <Page title={"Прохождение"} type={"employee"}>
      <Stages
        current={current}
        onBoardingPlan={onBoardingPlan}
        currentEmployee={currentEmployee}
        handleCurrentSteps={handleCurrentStep}
      />
      <RecommendedMaterialCard />
    </Page>
  );
};
