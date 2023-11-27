import type { ProColumns } from "@ant-design/pro-components";
import { DragSortTable } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { Page } from "~components";
import { Link, useNavigate } from "react-router-dom";
import { Button, Progress, Tag, Typography } from "antd";
import dayjs, { Dayjs } from "dayjs";
import axios from "../../../utils/axios";
import { emailRules } from "../../../utils/formRules";
import { fetchEmployees, fetchPlans } from "~api";
import { EmployeeAttributes } from "~types";
import { StrapiResponse } from "~types";
import { useQuery } from "@tanstack/react-query";

export type DataSourceType = {
  id: React.Key;
  name?: string;
  onboardingPlan?: string;
  email: string;
  manager: string;
  progress: number;
  deadline: Dayjs;
  type?: string;
};

const fetchOnboardingPlans = async () => {
  const response = await fetchPlans();
  return response.data.data.map((plan: { attributes: { title: string } }) => ({
    value: plan.attributes.title,
    label: plan.attributes.title,
  }));
};

const renderDeadline = (_dom: React.ReactNode, data: DataSourceType) => {
  if (data.progress === 100) {
    return "";
  }
  return (
    <Typography.Text
      type={
        data?.deadline?.diff?.(dayjs(), "days") > 2 ? "secondary" : "danger"
      }
    >
      {data?.deadline?.locale("ru").fromNow?.()}
    </Typography.Text>
  );
};

const columns: ProColumns<DataSourceType>[] = [
  {
    title: "ФИО",
    dataIndex: "username",
    valueType: "text",
    render: (dom, data) => <Link to={`/employee/${data.id}`}>{dom}</Link>,
  },
  {
    title: "Email",
    dataIndex: "email",
    valueType: "text",
    formItemProps: {
      rules: emailRules,
    },
  },
  {
    title: "Telegram",
    dataIndex: "telegram",
    valueType: "text",
    render: (dom) => <Tag color='blue'>{dom}</Tag>,
  },
  {
    title: "Руководитель",
    dataIndex: "manager",
    valueType: "select",
    render: (dom) => <Tag color='yellow'>{dom}</Tag>,
  },
  {
    title: "Онбординг план",
    dataIndex: "onboardingPlan",
    valueType: "select",
    request: fetchOnboardingPlans,
    render: (dom) => <Tag color='green'>{dom}</Tag>,
  },
  {
    title: "Дедлайн",
    dataIndex: "deadline",
    valueType: "option",
    readonly: true,
    renderFormItem: () => null,
    render: renderDeadline,
  },
  {
    title: "Прогресс",
    dataIndex: "progress",
    valueType: "option",
    readonly: true,
    render: (_dom, data) => <Progress percent={data.progress} />,
  },
];

export default () => {
  const { data: employees, isLoading } = useQuery({
    queryKey: ["dataEmployeePage"],
    queryFn: fetchEmployees,
  });

  const [dataSource, setDataSource] = useState<Array<any>>([]);

  useEffect(() => {
    setDataSource(
      (employees?.data || [])?.map(
        (employee: StrapiResponse<EmployeeAttributes>) => {
          return {
            id: employee.id,
            username: employee?.username || "Не указано",
            telegram: employee?.telegram || "Не указано",
            email: employee?.email || "Не указано",
            manager: employee?.manager?.username || "Не указано",
            onboardingPlan:
              employee?.onboardingPlan?.data?.attributes?.title || "Не указано",
            progress: employee?.on_boarding_result?.data?.progress || 0,
            deadline: dayjs(employee?.createdAt).add(
              employee?.onboardingPlan?.data?.attributes.deadlineFinish || 0,
              "days",
            ),
          };
        },
      ) || [],
    );
  }, [employees?.data, employees?.data.data]);

  const handleDragSortEnd = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    setDataSource(newDataSource);
  };

  const navigate = useNavigate();

  return (
    <Page
      type={"company"}
      title={"Сотрудники"}
      extra={
        <Button type={"primary"} onClick={() => navigate("/employees/add")}>
          Добавить
        </Button>
      }
    >
      <DragSortTable<DataSourceType>
        onDragSortEnd={handleDragSortEnd}
        loading={isLoading}
        headerTitle='Сотрудники'
        columns={columns}
        rowKey='key'
        dragSortKey={"sort"}
        dataSource={dataSource}
      />
    </Page>
  );
};
