import { Page } from "~components";
import CurrentStage from "./components/CurrentStage";
import { useEmployee } from "~hooks";

export type DataSourceType = {
  title: string;
  avatar: string;
  type: string;
  value: number;
};

export default () => {
  const { currentEmployee } = useEmployee();
  const onBoardingPlan = currentEmployee?.data?.onBoardingPlan;

  return (
    <Page title={"Мой Онбординг"} type={"employee"}>
      <CurrentStage
        onBoardingPlan={onBoardingPlan}
        currentStep={currentEmployee?.data.currentStep}
      />
    </Page>
  );
};
