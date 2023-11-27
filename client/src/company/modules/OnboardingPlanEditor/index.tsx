import Editor from "./components/Editor";
import NavPanel from "./components/NavPanel";
import { Page } from "~components";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ProCard,
  ProForm,
  ProFormDigitRange,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import {
  Edge,
  Node,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import { Button, message, Progress, Typography } from "antd";
import { red, green, yellow } from "@ant-design/colors";
import { allSpecialitiesMock } from "~mocks";
import axios from "src/utils/axios";
import { useMutation } from "@tanstack/react-query";
import { fetchPlan, fetchSpecialities } from "~api";
import { mapResponseToSelectData } from "../../../utils/mappers";

export type ModuleType = "Текст" | "Опрос";
export type NodeData = {
  handleId: string;
  type: ModuleType;
  title: string;
  duration: number;
};

type AddRequest = {
  title: string;
  description: string;
  suggestFor: string[];
  period: number[];
  nodes: Node[];
  edges: Edge[];
};

const mapOnboardingPlanToRequest = (data: AddRequest) => ({
  data: {
    title: data.title,
    description: data?.description ?? "",
    speciality: data.suggestFor,
    deadlineStart: data.period[0],
    deadlineFinish: data.period[1],
    onboardingResult: [],
    onboardingPlanNodesEdges: {
      data: {
        nodes: data.nodes,
        edges: data.edges,
      },
    },
  },
});

const mapResponseToPlan = (response) => {
  const plan = response?.data?.data?.attributes;
  return {
    title: plan.title,
    suggestFor: plan.speciality,
    description: plan.description,
    period: [plan.deadlineStart, plan.deadlineFinish],
    nodes: plan.onboardingPlanNodesEdges.data.nodes,
    edges: plan.onboardingPlanNodesEdges.data.edges,
  };
};

const addOnboardingPlan = async (data: AddRequest) => {
  return axios.post("on-boarding-plans", mapOnboardingPlanToRequest(data));
};

const OnboardingPlanEditor: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const { id } = useParams();

  const { mutateAsync: getPlan, isPending } = useMutation({
    mutationFn: fetchPlan,
  });

  const formRef = useRef<ProFormInstance<any>>();

  const currentDuration = nodes.reduce(
    (acc, cur) => acc + cur.data.duration,
    0,
  );

  const {
    mutate: handleAddPlan,
    isPending: isCreating,
    isSuccess,
  } = useMutation({
    mutationFn: addOnboardingPlan,
  });
  const [minDuration, setMinDuration] = useState(0);
  const [maxDuration, setMaxDuration] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      message.success("Онбординг план добавлен успешно");
      navigate("/onboarding-plans/list");
    }
  }, [isSuccess, navigate]);

  return (
    <Page
      type={"company"}
      title={"Добавление нового плана"}
      footer={[
        <Button
          key={"submit"}
          onClick={formRef.current?.submit}
          loading={isCreating}
        >
          Сохранить
        </Button>,
      ]}
    >
      <ProForm
        grid
        loading={isPending}
        formRef={formRef}
        autoFocusFirstInput
        submitter={false}
        onFinish={async (data) => {
          const result = {
            ...data,
            nodes,
            edges,
          };
          handleAddPlan(result);
        }}
        request={async () => {
          if (!id) {
            return {};
          }
          const response = await getPlan(id);
          const result = mapResponseToPlan(response);
          setNodes(result.nodes);
          setEdges(result.edges);
          return result;
        }}
      >
        <ProFormText
          name='title'
          rules={[
            {
              required: true,
              message: "Заполните название",
            },
          ]}
          colProps={{ md: 12, xl: 8 }}
          label={"Название"}
          placeholder='Название плана'
        />
        <ProFormSelect
          name={"suggestFor"}
          colProps={{ md: 12, xl: 8 }}
          mode={"multiple"}
          label={"Предлагать для специальностей"}
          request={async () => {
            const response = await fetchSpecialities();
            return mapResponseToSelectData(
              response,
              ["attributes", "name"],
              response.data.data,
            );
          }}
        />
        <ProFormDigitRange
          rules={[
            {
              required: true,
              message: "Заполните название",
            },
          ]}
          name={"period"}
          label={"Период адаптации, дней"}
          onChange={() => {
            setMinDuration(formRef.current?.getFieldValue("period")?.[0] || 0);
            setMaxDuration(formRef.current?.getFieldValue("period")?.[1] || 0);
          }}
          tooltip={
            <>
              Выберите количество дней, за которое предположительно должен
              закончиться период онбординга или адаптации. После прохождения
              минимального периода сотруднику начнут приходить уведомления.
              После прохождения максимального онбординг будет считаться
              затянутым. <a href='/#'>Больше узнать можно здесь</a>
            </>
          }
          addonBefore={<>От</>}
          addonAfter={<>До</>}
        />
        <ProCard
          title={"Редактор плана"}
          collapsible
          defaultCollapsed
          extra={
            nodes.length > 0 && (
              <Progress
                percent={100}
                format={() => {
                  return (
                    <Typography.Text>
                      {currentDuration} /{" "}
                      {maxDuration ||
                        formRef.current?.getFieldValue?.("period")?.[1] ||
                        0}
                    </Typography.Text>
                  );
                }}
                strokeColor={nodes.map(() => {
                  if (
                    currentDuration >= minDuration ||
                    (formRef.current?.getFieldValue?.("period")?.[0] &&
                      currentDuration <= maxDuration) ||
                    formRef.current?.getFieldValue?.("period")?.[1] ||
                    0
                  ) {
                    return yellow[6];
                  }
                  return currentDuration > maxDuration ? red[6] : green[6];
                })}
                steps={nodes.length}
              />
            )
          }
        >
          <NavPanel setNodes={setNodes} setEdges={setEdges} nodes={nodes} />
          <Editor
            nodes={nodes}
            onNodesChange={onNodesChange}
            edges={edges}
            onEdgesChange={onEdgesChange}
            setEdges={setEdges}
            setNodes={setNodes}
          />
        </ProCard>
      </ProForm>
    </Page>
  );
};

export default () => (
  <ReactFlowProvider>{<OnboardingPlanEditor />}</ReactFlowProvider>
);
