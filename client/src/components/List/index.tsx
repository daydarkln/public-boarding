import { DoubleRightOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";
import { theme } from "antd";
import React, { ReactNode } from "react";

const Item: React.FC<{ children: React.ReactNode }> = (props) => {
  const { token } = theme.useToken();
  return (
    <div
      className={css`
        color: ${token.colorTextSecondary};
        font-size: 14px;
        cursor: pointer;
        line-height: 22px;
        margin-bottom: 8px;
        &:hover {
          color: ${token.colorPrimary};
        }
      `}
      style={{
        width: "33.33%",
      }}
    >
      {props.children}
      <DoubleRightOutlined
        style={{
          marginInlineStart: 4,
        }}
      />
    </div>
  );
};

export default (props: {
  title: string;
  children: ReactNode;
  style?: React.CSSProperties;
}) => {
  const { token } = theme.useToken();

  return (
    <div
      style={{
        width: "100%",
        ...props.style,
      }}
    >
      <div
        style={{
          fontSize: 16,
          color: token.colorTextHeading,
          lineHeight: "24px",
          fontWeight: 500,
          marginBlockEnd: 16,
        }}
      >
        {props.title}
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};
