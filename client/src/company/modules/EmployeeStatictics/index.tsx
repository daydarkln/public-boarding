import { Page } from "~components";
import CurrentStage from "./components/CurrentStage";
import Stages from "./components/Stages";
import RecommendedMaterialCard from "./components/RecommendedMaterialCard";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployee } from "~api";
import { useNavigate, useParams } from "react-router-dom";
import { Skills } from "./components/Skills";
import { Button, Col, Row } from "antd";

export type DataSourceType = {
  title: string;
  avatar: string;
  type: string;
  value: number;
};

export default () => {
  const [current] = useState(0);

  const { id } = useParams();
  const navigate = useNavigate();

  const { data: currentEmployee } = useQuery({
    queryKey: ["onboardingDetailsCompany"],
    queryFn: fetchEmployee(id),
  });

  const onBoardingPlan = currentEmployee?.data?.onBoardingPlan;

  return (
    <Page
      title={`Данные об онбординге ${currentEmployee?.data?.username ?? ""}`}
      type={"company"}
      extra={
        <Button type={"primary"} onClick={() => navigate(`/employees/${id}`)}>
          Редактировать
        </Button>
      }
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <CurrentStage
            title={"Этапы"}
            onBoardingPlan={onBoardingPlan}
            currentStep={current}
            currentStepProgress={currentEmployee?.data?.currentStepProgress}
          />
        </Col>
        <Col span={24}>
          <Skills />
        </Col>
      </Row>
    </Page>
  );
};
