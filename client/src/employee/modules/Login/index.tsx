import { LockOutlined, MobileOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Tabs, message, theme } from "antd";
import { useState } from "react";
import { fetchCurrentUser, login } from "~api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
type LoginType = "phone" | "account";

const Page = () => {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState<LoginType>("account");
  const { token } = theme.useToken();

  const { mutateAsync: fetchUser } = useMutation({
    mutationFn: fetchCurrentUser,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: login,
    onSuccess: async () => {
      const user = await fetchUser();
      const userRole = user?.data.role?.name;
      const userId = user?.data.id;
      localStorage.setItem("userID", `${userId}`);
      localStorage.setItem("userRole", `${userRole}`);

      switch (userRole) {
        case "Admin": {
          navigate("/");
          break;
        }
        case "Employee": {
          navigate("/employee");
          break;
        }
        default:
          break;
      }
    },
    onError(error) {
      message.error(error.message);
    },
  });

  return (
    <div
      style={{
        backgroundColor: "white",
        height: "100vh",
      }}
    >
      <LoginFormPage
        backgroundImageUrl='https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp'
        logo='https://github.githubassets.com/images/modules/logos_page/Octocat.png'
        backgroundVideoUrl='https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr'
        title='AppBoarding'
        containerStyle={{
          backgroundColor: "rgba(0, 0, 0,0.65)",
          backdropFilter: "blur(4px)",
        }}
        onFinish={async (values) => {
          await mutateAsync({
            identifier: values.username,
            password: values.password,
          });
        }}
        loading={isPending}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey as LoginType)}
        >
          <Tabs.TabPane key={"account"} tab={"Учетная запись"} />
          <Tabs.TabPane key={"phone"} tab={"По номеру"} />
        </Tabs>
        {loginType === "account" && (
          <>
            <ProFormText
              name='username'
              fieldProps={{
                size: "large",
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Введите вашу почту"}
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите имя пользователя!",
                },
              ]}
            />
            <ProFormText.Password
              name='password'
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              placeholder={"Пароль"}
            />
          </>
        )}
        {loginType === "phone" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: (
                  <MobileOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              name='mobile'
              placeholder={"Номер телефона"}
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите номер телефона!",
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className={"prefixIcon"}
                  />
                ),
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder={"Пожалуйста, введите код проверки"}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${"Получить код проверки"}`;
                }
                return "Получить код проверки";
              }}
              name='captcha'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите код проверки!",
                },
              ]}
              onGetCaptcha={async () => {
                message.success(
                  "Получите успех кода проверки!Код проверки: 1234",
                );
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name='autoLogin'>
            автоматическая авторизация
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
          >
            Забыли пароль
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
};

export default () => {
  return (
    <ProConfigProvider dark>
      <Page />
    </ProConfigProvider>
  );
};
