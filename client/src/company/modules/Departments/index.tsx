import type { ProColumns, ProFormInstance } from "@ant-design/pro-components";
import { DragSortTable } from "@ant-design/pro-components";
import React, { useEffect, useRef, useState } from "react";
import { Page } from "~components";
import { Button, Popover, Tag } from "antd";
import { fetchDepartments } from "~api";
import { mapDepartmetsResponseToData } from "../../../utils/mappers";
import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import { take } from "ramda";

export type DataSourceType = {
  id: React.Key;
  title?: string;
  description?: string;
  specialities?: string[];
  type?: string;
};

export default () => {
  const columns: ProColumns<DataSourceType>[] = [
    {
      title: "Название",
      dataIndex: "name",
      valueType: "text",
      render: (dom, data) => <Link to={`/departments/${data.key}`}>{dom}</Link>,
    },
    {
      title: "Описание",
      dataIndex: "description",
      valueType: "textarea",
    },
    {
      title: "Специальности",
      dataIndex: "specialities",
      render: (_dom: React.ReactNode, data: DataSourceType) => {
        if (Array.isArray(data.specialities) && data.specialities?.length > 2) {
          return (
            <>
              {take(2, data.specialities || []).map((s) => (
                <Tag key={s} color='green'>
                  {s}
                </Tag>
              ))}
              <Popover
                trigger={"click"}
                content={
                  <div style={{ maxWidth: 300 }}>
                    {(data.specialities || [])
                      ?.slice(2, data.specialities?.length)
                      .map((s) => (
                        <Tag key={s} color='green'>
                          {s}
                        </Tag>
                      ))}
                  </div>
                }
              >
                <Tag>+{data.specialities?.length - 2}</Tag>
              </Popover>
            </>
          );
        }
        return (data?.specialities || []).slice(0, 2).map((s) => (
          <Tag key={s} color='green'>
            {s}
          </Tag>
        ));
      },
    },
  ];

  const { data: response, isLoading } = useQuery({
    queryKey: ["getDepsInPage"],
    queryFn: fetchDepartments,
  });

  const [dataSource, setDataSource] = useState<Array<any>>([]);

  useEffect(() => {
    setDataSource(mapDepartmetsResponseToData(response));
  }, [response]);

  const navigate = useNavigate();

  const handleDragSortEnd = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    setDataSource(newDataSource);
  };

  return (
    <Page
      type={"company"}
      title={"Департаменты"}
      extra={
        <Button onClick={() => navigate("/departments/add")}>Добавить</Button>
      }
    >
      <DragSortTable<DataSourceType>
        loading={isLoading}
        headerTitle='Департаменты'
        columns={columns}
        rowKey='departmentKey'
        dataSource={Array.isArray(dataSource) ? dataSource : []}
        dragSortKey='sort'
        onDragSortEnd={handleDragSortEnd}
      />
    </Page>
  );
};
