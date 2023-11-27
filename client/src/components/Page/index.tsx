import { FC, ReactNode, useEffect } from "react";
import cls from "classnames";
import { CalendarOutlined } from "@ant-design/icons";
import {
  Avatar,
  Calendar,
  CalendarProps,
  Dropdown,
  message,
  Popover,
  Switch,
  theme,
} from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";
import React from "react";

// types
import {
  CheckCard,
  PageContainer,
  PageContainerProps,
  ProConfigProvider,
  ProLayout,
} from "@ant-design/pro-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MenuCard } from "~components";
import {
  companyConfig,
  employeeConfig,
  emptyConfig,
  companyRoutes,
  employeeRoutes,
  appRoutes,
} from "~config";
import { Dayjs } from "dayjs";
import { useEmployee } from "~hooks";
import { AvatarProps } from "antd/lib";
import { useAppStore } from "../../stores/useAppStore";

export interface PageProps extends Omit<PageContainerProps, "className"> {
  className?: string;
  children: ReactNode;
  title?: ReactNode | string | null;
  type: "company" | "employee" | "empty";
}

const Page: FC<PageProps> = (props) => {
  const { children, type } = props;
  const { pathname } = useLocation();
  const { isLoading, currentEmployee } = useEmployee();
  const navigate = useNavigate();

  const { isDarkTheme, setTheme } = useAppStore();
  const { token } = theme.useToken();

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  const menuStyle = {
    borderRadius: token.borderRadius,
    backgroundColor: token.colorPrimaryBg,
    margin: "20px 0",
  };

  const headerStyle = {
    borderRadius: token.borderRadius,
    backgroundColor: token.colorPrimaryBg,
    margin: "10px",
  };

  const config = {
    company: companyConfig,
    employee: employeeConfig,
    empty: emptyConfig,
  };

  const route = {
    company: companyRoutes,
    employee: employeeRoutes,
    empty: null,
  };

  const { appList } = appRoutes;

  const onPanelChange = (
    value: Dayjs,
    mode: CalendarProps<Dayjs>["mode"],
  ) => {};

  const initialBreadcrumbs =
    type === "company"
      ? { path: "/company", breadcrumbName: "Компания" }
      : { path: "/employee", breadcrumbName: "Сотрудник" };

  const renderAvatarProps = () => {
    switch (type) {
      case "employee": {
        return {
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "large",
          title: `${currentEmployee?.data.username || ""}`,
          render: (props: AvatarProps, dom: ReactNode) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "PersonalInfo",
                      icon: <UserOutlined />,
                      label: "Ваш профиль",
                      onClick: () => {
                        navigate("/employee-profile");
                      },
                    },
                    {
                      key: "logout",
                      onClick: () => {
                        localStorage.removeItem("authorization");
                        navigate("/login");
                      },
                      icon: <LogoutOutlined />,
                      label: "Выйти",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        } as AvatarProps;
      }
      case "company": {
        return {
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "large",
          title: "avatar",
          render: (props: AvatarProps, dom: ReactNode) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      onClick: () => {
                        localStorage.removeItem("authorization");
                        navigate("/login");
                      },
                      icon: <LogoutOutlined />,
                      label: "Выйти",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        } as AvatarProps;
      }
      default: {
        break;
      }
    }
  };

  const { hasAdminAccess = false } = useEmployee();

  useEffect(() => {
    if (!localStorage.getItem("authorization")) {
      message.warning("Пожалуйста, авторизуйтесь");
      navigate("/login");
    }
  }, []);

  return (
    <ProConfigProvider hashed={true}>
      <ProLayout
        appList={hasAdminAccess ? appList : []}
        appListRender={() => {
          return (
            <CheckCard.Group
              onChange={(value) => {
                navigate(value as string);
              }}
              defaultValue={location.pathname}
            >
              {appList.map((app) => {
                return (
                  <CheckCard
                    key={app.title}
                    title={app.title}
                    value={app.url}
                    avatar={<Avatar src={app.icon} size='large' />}
                    description={app.desc}
                  />
                );
              })}
            </CheckCard.Group>
          );
        }}
        avatarProps={renderAvatarProps()}
        location={{
          pathname,
        }}
        actionsRender={() => {
          return [
            <Popover
              trigger='click'
              content={
                <div style={wrapperStyle}>
                  <Calendar fullscreen={false} onPanelChange={onPanelChange} />
                </div>
              }
              key={"calendar"}
            >
              <CalendarOutlined style={{ color: token.colorPrimary }} />
            </Popover>,
            <Switch
              key={"switch"}
              style={{ borderRadius: 20 }}
              checked={!isDarkTheme}
              onChange={() => setTheme(!isDarkTheme)}
            />,
          ];
        }}
        headerRender={(props, defaultDom) => (
          <div style={headerStyle}>{defaultDom}</div>
        )}
        menuContentRender={(props, defaultDom) => (
          <div style={menuStyle}>{defaultDom}</div>
        )}
        defaultCollapsed={false}
        token={{
          bgLayout: token.colorBgBase,
          sider: {
            colorMenuBackground: "transparent",
            colorTextMenuActive: token.colorPrimaryActive,
            colorTextMenuSelected: token.colorPrimaryTextActive,
            colorBgMenuItemSelected: token.Menu?.darkGroupTitleColor,
            colorTextMenuItemHover: token.colorPrimaryTextHover,
            colorBgMenuItemHover: token.colorPrimaryBgHover,
          },
          header: {
            colorBgHeader: token.colorBgBase,
            colorBgMenuItemHover: token.colorPrimaryBgHover,
          },
        }}
        headerTitleRender={(logo, title, _) => {
          const defaultDom = (
            <Link to={"/"}>
              {logo}
              {title}
            </Link>
          );
          if (typeof window === "undefined") return defaultDom;
          if (document.body.clientWidth < 1400) {
            return defaultDom;
          }
          if (_.isMobile) return defaultDom;

          return (
            <>
              {defaultDom}
              <MenuCard />
            </>
          );
        }}
        breadcrumbRender={(routers = []) => {
          return [initialBreadcrumbs, ...routers];
        }}
        breadcrumbProps={{ style: { cursor: "pointer" } }}
        menuItemRender={(item, dom) => {
          const isActive = item.path === location.pathname;

          return (
            <div
              className={cls({
                [`text-[${token.colorPrimaryActive}]`]: isActive,
              })}
              onClick={() => {
                navigate(item?.path || "");
              }}
            >
              {dom}
            </div>
          );
        }}
        {...route[type]}
        {...config[type]}
      >
        <PageContainer
          {...props}
          loading={isLoading}
          style={{ background: "transparent", minHeight: "calc(100vh - 56px)" }}
          header={{
            title: props.title,
          }}
        >
          <div>{children}</div>
        </PageContainer>
      </ProLayout>
    </ProConfigProvider>
  );
};

export default Page;
