import type { ProColumns } from "@ant-design/pro-components";
import { DragSortTable } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import { Page } from "~components";
import { Button, Popover, Tag } from "antd";
import { fetchSpecialities } from "~api";
import { mapSpecialitiesResponseToData } from "../../../utils/mappers";
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
      dataIndex: "title",
      valueType: "text",
      render: (dom, data) => <Link to={`/specialities/${data.id}`}>{dom}</Link>,
    },
    {
      title: "Описание",
      dataIndex: "description",
      valueType: "textarea",
    },
    {
      title: "Пользователи",
      dataIndex: "employees",
      render: (_dom: React.ReactNode, data: DataSourceType) => {
        if (Array.isArray(data?.employees) && data?.employees?.length > 2) {
          return (
            <>
              {take(2, data?.employees || []).map((s) => (
                <Tag key={s} color='green'>
                  {s}
                </Tag>
              ))}
              <Popover
                trigger={"click"}
                content={
                  <div style={{ maxWidth: 300 }}>
                    {(data?.employees || [])
                      ?.slice(2, data?.employees?.length)
                      .map((s) => (
                        <Tag key={s} color='green'>
                          {s}
                        </Tag>
                      ))}
                  </div>
                }
              >
                <Tag>+{data?.employees?.length - 2}</Tag>
              </Popover>
            </>
          );
        }
        return (data?.employees || []).slice(0, 2).map((s) => (
          <Tag key={s} color='green'>
            {s}
          </Tag>
        ));
      },
    },
  ];

  const { data: response, isLoading } = useQuery({
    queryKey: ["getDepsInSpecPage"],
    queryFn: fetchSpecialities,
  });

  const [dataSource, setDataSource] = useState<Array<any>>([]);

  useEffect(() => {
    setDataSource(mapSpecialitiesResponseToData(response));
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
      title={"Специальности"}
      extra={
        <Button onClick={() => navigate("/specialities/add")}>Добавить</Button>
      }
    >
      <DragSortTable<DataSourceType>
        loading={isLoading}
        headerTitle='Специальности'
        columns={columns}
        rowKey='specialitiesKey'
        dataSource={Array.isArray(dataSource) ? dataSource : []}
        dragSortKey='sort'
        onDragSortEnd={handleDragSortEnd}
      />
    </Page>
  );
};
