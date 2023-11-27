import React, { useState } from "react";
import ProForm, { ProFormSelect, ProFormText } from "@ant-design/pro-form";
import { message, notification, Popover, Typography } from "antd";
import { Page } from "~components";
import Editor from "../OnboardingPlanEditor/components/Editor";
import { ProDescriptions, ProFormDependency } from "@ant-design/pro-components";
import {
  fetchCompanies,
  fetchDepartments,
  fetchEmployee,
  fetchManagers,
  fetchPlans,
  fetchRoles,
  fetchSpecialities,
  postEmployee,
} from "~api";
import { useEdgesState, useNodesState } from "reactflow";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  mapEmployeeResponseToData,
  mapResponseToSelectData,
} from "../../../utils/mappers";
import dayjs from "dayjs";
import { v4 } from "uuid";
import { omit } from "ramda";

const EmployeeManage: React.FC = () => {
  const [, setNodes, onNodesChange] = useNodesState([]);
  const [, setEdges, onEdgesChange] = useEdgesState([]);
  const [onboardingPlans, setOnboardingPlans] = useState<Array<any>>([]);

  const { id } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: createEmployee } = useMutation({
    mutationFn: postEmployee,
  });

  const onFinish = async (values) => {
    const generatedPassword = v4();
    let result = {
      ...values,
      department: values.department,
      manager: values.manager,
      speciality: values.speciality,
      company: values.company,
      role: values.role,
      onBoardingPlan: onboardingPlans[0]?.[values.onboardingPlan].key,
      password: generatedPassword,
    };
    await createEmployee({
      id,
      data: id
        ? omit(["onboardingPlan"], {
            ...values,
            department: values.department.key,
            manager: values.manager.key,
            speciality: values.speciality.key,
            company: values.company.key,
            role: values.role.key,
            onBoardingPlan: onboardingPlans[0]?.find(
              (p) => p.key === values.onboardingPlan.key,
            ).key,
          })
        : result,
    });
    if (!id) {
      notification.info({
        message: `Пользователь загеристрирован, пароль: ${generatedPassword}`,
      });
    } else {
      message.success("Пользователь изменен");
    }
    navigate("/employees");
  };

  return (
    <Page
      type={"company"}
      title={id ? "Редактирование сотрудника" : "Создание сотрудника"}
    >
      <ProForm
        onFinish={onFinish}
        request={async () => {
          if (id) {
            const response = await fetchEmployee(id)();
            return mapEmployeeResponseToData(response);
          }

          return {};
        }}
      >
        <ProForm.Group direction='vertical'>
          <ProForm.Group>
            <ProFormText
              width='md'
              name='username'
              label='Имя сотрудника'
              placeholder='Введите имя сотрудника'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите имя сотрудника",
                },
              ]}
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormText
              width='md'
              name='email'
              label='Email'
              placeholder='employee1@mail.ru'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите email сотрудника",
                },
                {
                  type: "email",
                  message: "Пожалуйста, введите корректный email",
                },
              ]}
            />
            <ProFormText
              width='md'
              name='telegram'
              label='Telegram'
              placeholder='@nickname'
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              name={"role"}
              label={"Роль"}
              width={"md"}
              request={async () => {
                const response = await fetchRoles();
                return mapResponseToSelectData(
                  response,
                  ["name"],
                  response.data.roles,
                );
              }}
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите роль",
                },
              ]}
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormSelect
              width='md'
              name='company'
              label='Компания'
              request={async () => {
                const response = await fetchCompanies();
                return mapResponseToSelectData(
                  response,
                  ["attributes", "title"],
                  response.data.data,
                );
              }}
              placeholder='Выберите компанию'
            />

            <ProFormSelect
              width='md'
              name='department'
              label='Отдел'
              request={async () => {
                const response = await fetchDepartments();
                return mapResponseToSelectData(
                  response,
                  ["attributes", "name"],
                  response.data.data,
                );
              }}
              placeholder='Выберите отдел'
            />

            <ProFormSelect
              width='md'
              name='speciality'
              label='Специальность'
              request={async () => {
                const response = await fetchSpecialities();
                return mapResponseToSelectData(
                  response,
                  ["attributes", "name"],
                  response.data.data,
                );
              }}
              placeholder='Выберите специальность'
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormSelect
              width='md'
              name={"manager"}
              label='Руководитель'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите руководителя",
                },
              ]}
              request={async () => {
                const response = await fetchManagers();
                return mapResponseToSelectData(response, "username");
              }}
            />
          </ProForm.Group>
          <ProForm.Group align='center'>
            <ProFormSelect
              width='md'
              name='onboardingPlan'
              label='Онбординг план'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, выберите онбординг план",
                },
              ]}
              request={async () => {
                const response = await fetchPlans();
                const result = response.data.data.map((plan: any) => ({
                  label: plan.attributes.title,
                  key: plan.id,
                  edges: plan.attributes?.onboardingPlanNodesEdges?.data?.edges,
                  nodes: plan.attributes?.onboardingPlanNodesEdges?.data?.nodes,
                  deadline: plan.attributes.deadlineFinish,
                }));
                setOnboardingPlans((plans) => [...plans, result]);
                return result;
              }}
              placeholder='Выберите онбординг план'
            />
            <ProFormDependency name={["onboardingPlan"]}>
              {({ onboardingPlan }) => {
                if (onboardingPlan === undefined) {
                  return null;
                }
                return (
                  <Popover
                    trigger={"click"}
                    placement={"right"}
                    title={
                      <Editor
                        hideMap
                        edges={
                          onboardingPlans?.[0]?.find(
                            (p) => p.key === onboardingPlan.key,
                          )?.edges || []
                        }
                        nodes={
                          onboardingPlans?.[0]?.find(
                            (p) => p.key === onboardingPlan.key,
                          )?.nodes || []
                        }
                        onEdgesChange={onEdgesChange}
                        onNodesChange={onNodesChange}
                        setEdges={setEdges}
                        setNodes={setNodes}
                      />
                    }
                  >
                    <Typography.Link>Посмотреть</Typography.Link>
                  </Popover>
                );
              }}
            </ProFormDependency>
          </ProForm.Group>
          <ProForm.Group>
            <ProFormDependency name={["onboardingPlan"]}>
              {({ onboardingPlan }) => {
                return onboardingPlan ? (
                  <ProDescriptions>
                    <ProDescriptions.Item label={"Дата окончания"}>
                      {dayjs()
                        .add(
                          onboardingPlans?.[0]?.find(
                            (p) => p.key === onboardingPlan.key,
                          )?.deadline || 0,
                          "days",
                        )
                        .format("DD MMMM YYYY")}
                    </ProDescriptions.Item>
                  </ProDescriptions>
                ) : null;
              }}
            </ProFormDependency>
          </ProForm.Group>
        </ProForm.Group>
      </ProForm>
    </Page>
  );
};

export default EmployeeManage;
