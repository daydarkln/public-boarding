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
    console.log(data);
    if (Array.isArray(data.departments) && data.departments?.length > 2) {
      return (
        <>
          {(data.departments || [])
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
                {(data.departments || [])
                  ?.slice(2, data.departments?.length)
                  .map((s) => allEmployees?.find((a) => a.key === s)?.title)
                  .map((s) => (
                    <Tag key={s} color='green'>
                      {s}
                    </Tag>
                  ))}
              </div>
            }
          >
            <Tag>+{data.departments?.length - 2}</Tag>
          </Popover>
        </>
      );
    }
    return data.departments
      ?.map((s) => allEmployees?.find((a) => a.key === s)?.title)
      .map((s) => (
        <Tag key={s} color='blue'>
          {s}
        </Tag>
      ));
  };
