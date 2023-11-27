import { Popover, Tag } from "antd";
import React from "react";
import { DataSourceType } from "../index";

export const SpecialityItem =
  (
    allEmployees: {
      key: string;
      title: string;
      description: string;
    }[],
  ) =>
  (_dom: React.ReactNode, data: DataSourceType) => {
    if (Array.isArray(data.employees) && data.employees?.length > 2) {
      return (
        <>
          {(data.employees || [])
            .slice(0, 2)
            .map((s) => allEmployees?.find((a) => a.key === s)?.title)
            .map((s) => (
              <Tag key={s} color='green'>
                {s}
              </Tag>
            ))}
          <Popover
            trigger={"click"}
            content={
              <div style={{ maxWidth: 300 }}>
                {(data.employees || [])
                  ?.slice(2, data.employees?.length)
                  .map((s) => allEmployees?.find((a) => a.key === s)?.title)
                  .map((s) => (
                    <Tag key={s} color='green'>
                      {s}
                    </Tag>
                  ))}
              </div>
            }
          >
            <Tag>+{data.employees?.length - 2}</Tag>
          </Popover>
        </>
      );
    }
    return data.employees
      ?.map((s) => allEmployees?.find((a) => a.key === s)?.title)
      .map((s) => (
        <Tag key={s} color='blue'>
          {s}
        </Tag>
      ));
  };
