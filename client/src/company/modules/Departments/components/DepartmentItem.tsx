import { Popover, Tag } from "antd";
import React from "react";
import { DataSourceType } from "../index";
import { take } from "ramda";

export const DepartmentItem = (_dom: React.ReactNode, data: DataSourceType) => {
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
  return data.specialities
    ?.map((s) => allSpecialities?.find((a) => a.key === s)?.title)
    .map((s) => (
      <Tag key={s} color='green'>
        {s}
      </Tag>
    ));
};
