// @flow
import ruRU from "antd/locale/ru_RU";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider, theme } from "antd";
import companyRoutes from "./Routes/CompanyRoutes";
import employeeRoutes from "./Routes/EmployeeRoutes";
import { useAppStore } from "./stores/useAppStore";

const router = createBrowserRouter([...companyRoutes, ...employeeRoutes]);

export const App = () => {
  const { isDarkTheme } = useAppStore();

  return (
    <ConfigProvider
      theme={
        isDarkTheme
          ? {
              algorithm: theme.darkAlgorithm,
              token: {
                colorInfo: "#715fe4",
                colorBgBase: "#050921",
                colorTextBase: "#ffffff",
                fontSize: 14,
                borderRadius: 16,
              },
              components: {
                Table: {
                  colorBgContainer: "#050921",
                  padding: 30,
                },
                Popover: {
                  colorBgElevated: "rgb(17, 26, 44)",
                },
                Card: {
                  colorBgContainer: "#050921",
                },
                Dropdown: {
                  colorBgElevated: "rgb(17, 26, 44)",
                },
              },
            }
          : {}
      }
      locale={ruRU}
    >
      <RouterProvider router={router}></RouterProvider>
    </ConfigProvider>
  );
};
