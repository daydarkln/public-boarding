import {
  HomeOutlined,
  ApartmentOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  FundViewOutlined,
  BranchesOutlined,
  BookOutlined,
  CalendarOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const companyRoutes = {
  route: {
    path: "/",
    routes: [
      {
        path: "/company",
        name: "Добро пожаловать",
        icon: <HomeOutlined />,
      },
      {
        name: "Сотрудники",
        icon: <TeamOutlined />,
        path: "/employees",
        routes: [
          {
            name: "Редактирование",
            icon: <FundViewOutlined />,
            path: "/employees/:id",
            hideInMenu: true,
          },
          {
            name: "Создание",
            icon: <FundViewOutlined />,
            path: "/employees/add",
            hideInMenu: true,
          },
        ],
      },
      {
        name: "Онбординг",
        icon: <FundViewOutlined />,
        path: "/onboarding-plans",
        routes: [
          {
            name: "Планы",
            icon: <FundViewOutlined />,
            path: "/onboarding-plans/list",
          },
          {
            name: "Модули",
            icon: <FundViewOutlined />,
            path: "/onboarding-plans/modules",
            routes: [
              {
                name: "Добавить модуль",
                path: "/onboarding-plans/modules/add",
                hideInMenu: true,
              },
              {
                name: "Изменить модуль",
                path: "/onboarding-plans/modules/:id",
                hideInMenu: true,
              },
            ],
          },
          {
            name: "Создание плана",
            path: "/create-plan",
            hideInMenu: true,
          },
          {
            name: "Изменение плана",
            path: "/onboarding-plans/:id",
            hideInMenu: true,
          },
        ],
      },
      {
        name: "Департаменты",
        icon: <ApartmentOutlined />,
        path: "/departments",
        routes: [
          {
            name: "Добавить",
            icon: <ApartmentOutlined />,
            path: "/departments/add",
            hideInMenu: true,
          },
          {
            name: "Редактировать",
            icon: <ApartmentOutlined />,
            path: "/departments/:id",
            hideInMenu: true,
          },
        ],
      },
      {
        name: "Специальности",
        icon: <DeploymentUnitOutlined />,
        path: "/specialities",
        routes: [
          {
            name: "Добавить",
            path: "/specialities/add",
            hideInMenu: true,
          },
          {
            name: "Редактировать",
            path: "/specialities/:id",
            hideInMenu: true,
          },
        ],
      },
    ],
  },
};

export const employeeRoutes = {
  route: {
    path: "/employee",
    routes: [
      {
        path: "/employee",
        name: "Добро пожаловать",
        icon: <HomeOutlined />,
      },
      {
        path: "/my-onboarding",
        name: "Мой онбординг",
        icon: <FundViewOutlined />,
      },
      {
        path: "/my-onboarding/go",
        name: "Прохождение",
        icon: <FundViewOutlined />,
      },
      {
        path: "/employee-profile",
        name: "Ваш профиль",
        icon: <UserOutlined />,
      },
      {
        path: "/useful-materials",
        name: "Полезные материалы",
        icon: <BookOutlined />,
      },
      {
        path: "/skills",
        name: "Навыки",
        icon: <BranchesOutlined />,
      },
      {
        path: "/meets",
        name: "График встреч ",
        icon: <CalendarOutlined />,
      },
    ],
  },
};

export const appRoutes = {
  appList: [
    {
      icon: "https://gw.alipayobjects.com/zos/rmsportal/XuVpGqBFxXplzvLjJBZB.svg",
      title: "Сотрудник",
      desc: "Здесь ваши сотрудники",
      url: "/employee",
      value: "A",
    },
    {
      icon: "https://gw.alipayobjects.com/zos/rmsportal/LFooOLwmxGLsltmUjTAP.svg",
      title: "Компания ",
      desc: "Ваша прекрасная компания",
      url: "/company",
      value: "B",
    },
  ],
};
