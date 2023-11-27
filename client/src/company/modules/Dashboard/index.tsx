import { ProCard, ProList } from "@ant-design/pro-components";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Flex,
  FloatButton,
  Progress,
  Row,
  Skeleton,
  Space,
  Tag,
  Tour,
  TourProps,
} from "antd";
import { Page } from "~components";
import Meta from "antd/lib/card/Meta";
import {
  ArrowRightOutlined,
  CalendarOutlined,
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { allEmployeesMock } from "~mocks";
import { take } from "ramda";
import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { Link, useNavigate } from "react-router-dom";
import { green, red, yellow } from "@ant-design/colors";
import { atcb_action } from "add-to-calendar-button";
import { useQuery } from "@tanstack/react-query";
import { fetchEmployees, fetchModules, fetchPlans } from "~api";

const employees = allEmployeesMock.map((employee) => ({
  ...employee,
  finishDate: dayjs().add(10, "days"),
  description: `${employee.departments.join(
    ", ",
  )}, ${employee.specialities.join(", ")}`,
}));

export default () => {
  const cardStyle = {};
  const ref1 = useRef(null);
  const refDanger = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const tutorialRef = useRef(null);

  const stepsTour: TourProps["steps"] = [
    {
      title: "Добро пожаловать в App Boarding",
      description:
        "Проведем небольшую экскурсию. Тут твоя информация о сотрудниках, которые уже начали адаптироваться. Можете назначить встречу, посмотреть прогресс.",
      target: () => ref1.current,
    },
    {
      title: "Не все могут успеть",
      description:
        "Сотрудники, которым нужно уделить больше внимания, дополнительно отмечены",
      target: () => refDanger.current,
    },
    {
      title: "Ваши дорогие коллеги",
      description:
        "Тут же можете познакомиться с коллегами и их руководителями, которые уже прошли онбординг в компанию. Поздравим их",
      target: () => ref2.current,
    },
    {
      title: "Нагрузка",
      description:
        "Ох, день выдался тяжелый. Посмотрите на сколько вы нагружены.",
      target: () => ref3.current,
    },
    {
      title: "Онбординг",
      description:
        "А вот и онбординг планы. Советую посмотреть их все. Может вы захотите создать новый?",
      target: () => ref4.current,
    },
    {
      title: "Онбординг модули",
      description:
        "Не менее важная вещь. Создайте модуль и соберите из него любой онбординг. Проявите креативность!",
      target: () => ref5.current,
    },
    {
      title: "Повторение обучения",
      description:
        "Если что-то вдруг забудешь - с помощью этой кнопки всегда сможешь повторить. Удачи!",
      target: () => tutorialRef.current,
    },
  ];

  const [open, setOpen] = useState<boolean>(false);

  const navigate = useNavigate();

  const managerLoad = 40;
  const managerLoadColor = useMemo(() => {
    if (managerLoad > 60 && managerLoad < 80) {
      return yellow[5];
    }
    if (managerLoad > 80) {
      return red[5];
    }
    return green[5];
  }, [managerLoad]);

  const { data: plansData } = useQuery({
    queryKey: ["plans"],
    queryFn: fetchPlans,
  });
  const { data: modulesData } = useQuery({
    queryKey: ["modules"],
    queryFn: fetchModules,
  });
  const { data: employeesData } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });

  const plansDataSource = useMemo(() => {
    return (
      plansData?.data?.data?.map((plan) => ({
        title: plan.attributes?.title,
        subTitle: (
          <Tag color={green[5]}>дней: {plan.attributes?.deadlineFinish}</Tag>
        ),
      })) || []
    );
  }, [plansData?.data?.data]);

  const modulesDataSource = useMemo(() => {
    return (
      modulesData?.data?.data?.map((module) => {
        return {
          title: module.attributes?.title,
          subTitle: (
            <Tag color={green[5]}>
              прохождение занимает дней: {module.attributes?.duration}
            </Tag>
          ),
        };
      }) || []
    );
  }, [modulesData?.data?.data]);

  const dataSource = useMemo(() => {
    return (
      employees
        ?.filter((e) => e.progress === 100)
        ?.map((employee) => {
          return {
            title: [employee?.name].join(" "),
            subTitle: (
              <Tag color={green[5]}>{[employee?.manager].join(" ")}</Tag>
            ),
            content: (
              <Button
                type={"link"}
                style={{ marginLeft: "auto" }}
                onClick={(e) =>
                  atcb_action(
                    {
                      name: "Встреча с руководителем",
                      options: [
                        "Google",
                        "Microsoft365",
                        "MicrosoftTeams",
                        "Outlook.com",
                      ],
                      listStyle: "overlay",
                      hideIconModal: true,
                      hideBackground: true,
                      hideCheckmark: true,
                      label: "",
                      location: "Zoom",
                      startDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
                      endDate: dayjs().add(2, "days").format("YYYY-MM-DD"),
                      startTime: dayjs().add(1, "hour").format("hh:mm"),
                      endTime: dayjs().add(2, "hours").format("hh:mm"),
                      timeZone: "Europe/Moscow",
                    },
                    // e.target as HTMLElement,
                  )
                }
                icon={<CalendarOutlined />}
              ></Button>
            ),
          };
        }) || []
    );
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("isTutorialPassedCompany")) {
      setOpen(true);
    }
  }, []);

  return (
    <Page
      title={
        <div className={"flex items-center"}>
          <p className={"mr-10"}>Добро пожаловать</p>
          <FloatButton
            ref={tutorialRef}
            icon={<QuestionCircleOutlined />}
            type='primary'
            style={{ right: 24 }}
            onClick={() => {
              localStorage.setItem("isTutorialPassedCompany", "1");
              setOpen(true);
            }}
          />
        </div>
      }
      type={"company"}
    >
      <Tour open={open} onClose={() => setOpen(false)} steps={stepsTour} />
      <Divider></Divider>
      <h3>Проходят онбординг</h3>
      <Flex gap={20} vertical>
        <Row gutter={16} title={"Сейчас проходят"} ref={ref1}>
          {employees.length
            ? take(3)(
                employees
                  .filter((e) => e.progress < 100)
                  .map((employee, index) => (
                    <div key={index} style={{ width: "25%" }}>
                      <Col ref={index === 0 ? refDanger : null}>
                        <ProCard
                          style={
                            dayjs(employee.deadline).diff(dayjs(), "days") < 3
                              ? { borderColor: red[5] }
                              : {}
                          }
                          bordered
                          key={employee.key}
                          title={
                            <Space>
                              <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />
                              <Link
                                target={"_blank"}
                                to={`/employee/${employee.key}`}
                              >
                                {employee.name}
                              </Link>
                            </Space>
                          }
                          actions={[
                            <Button
                              key={"addToCalendar"}
                              icon={<CalendarOutlined />}
                              type={"link"}
                              onClick={(e) =>
                                atcb_action(
                                  {
                                    name: "Встреча с руководителем",
                                    options: [
                                      "Google",
                                      "Microsoft365",
                                      "MicrosoftTeams",
                                      "Outlook.com",
                                    ],
                                    listStyle: "overlay",
                                    hideIconModal: true,
                                    hideBackground: true,
                                    hideCheckmark: true,
                                    label: "",
                                    location: "Zoom",
                                    startDate: dayjs()
                                      .add(1, "day")
                                      .format("YYYY-MM-DD"),
                                    endDate: dayjs()
                                      .add(2, "days")
                                      .format("YYYY-MM-DD"),
                                    startTime: dayjs()
                                      .add(1, "hour")
                                      .format("hh:mm"),
                                    endTime: dayjs()
                                      .add(2, "hours")
                                      .format("hh:mm"),
                                    timeZone: "Europe/Moscow",
                                  },
                                  e.target as HTMLElement,
                                )
                              }
                            >
                              Назначить встречу
                            </Button>,
                          ]}
                          extra={
                            <Progress
                              size={16}
                              type='circle'
                              percent={employee.progress}
                            />
                          }
                        >
                          {employee.progress < 100
                            ? employee.deadline.locale("ru").fromNow()
                            : "Готово"}
                        </ProCard>
                      </Col>
                    </div>
                  )),
              )
            : Array.from(Array(3).keys()).map((i) => (
                <ProCard
                  key={i}
                  style={{ width: 300, marginTop: 16 }}
                  actions={[
                    <EditOutlined key='edit' />,
                    <EllipsisOutlined key='ellipsis' />,
                  ]}
                >
                  <Skeleton loading avatar active>
                    <Meta
                      avatar={
                        <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />
                      }
                      title='Card title'
                      description='This is the description'
                    />
                  </Skeleton>
                </ProCard>
              ))}
          <div style={{ width: "25%" }}>
            <Col>
              <Button
                icon={<PlusOutlined />}
                type={"dashed"}
                style={{ width: "100%", height: 146 }}
                onClick={() => {
                  navigate("/employees");
                }}
              >
                Посмотреть всех
              </Button>
            </Col>
          </div>
        </Row>
        <ProCard gutter={16} ghost>
          <ProCard
            colSpan={{ xs: 24, sm: 16 }}
            boxShadow
            ref={ref2}
            title={"Недавно закончили"}
          >
            <ProList<{
              title: string;
              subTitle: ReactNode;
              actions: ReactNode[];
              description: ReactNode;
              type?: "top" | "inline" | "new";
              avatar: string;
              children: ReactNode;
            }>
              metas={{
                title: {},
                subTitle: {},
                type: {},
                description: {},
                avatar: {},
                content: {},
              }}
              rowKey='id'
              dataSource={take(3)(dataSource)}
            />
          </ProCard>
          <ProCard
            ref={ref3}
            style={{ ...cardStyle, background: "transparent" }}
            title={"Ваша нагрузка"}
          >
            <Flex justify={"center"} align={"center"}>
              <Progress
                type={"dashboard"}
                percent={managerLoad}
                strokeColor={managerLoadColor}
              />
            </Flex>
          </ProCard>
        </ProCard>
        <Row gutter={[16, 16]}>
          <Col span={24} md={24} lg={12}>
            <ProCard
              bordered
              ref={ref4}
              title={"Онбординг планы"}
              extra={
                <Button
                  icon={<ArrowRightOutlined />}
                  type={"dashed"}
                  onClick={() => {
                    navigate("/onboarding-plans/list");
                  }}
                >
                  Посмотреть все
                </Button>
              }
            >
              <ProList<{
                title: string;
                subTitle: ReactNode;
                actions: ReactNode[];
                description: ReactNode;
                type?: "top" | "inline" | "new";
                avatar: string;
                children: ReactNode;
              }>
                metas={{
                  title: {},
                  subTitle: {},
                  type: {},
                  description: {},
                  avatar: {},
                  content: {},
                }}
                rowKey='id'
                dataSource={take(3)(plansDataSource)}
              />
            </ProCard>
          </Col>
          <Col span={24} md={24} lg={12}>
            <ProCard
              bordered
              ref={ref5}
              title={"Онбординг модули"}
              extra={
                <Button
                  icon={<ArrowRightOutlined />}
                  type={"dashed"}
                  onClick={() => {
                    navigate("/onboarding-plans/modules");
                  }}
                >
                  Посмотреть все
                </Button>
              }
            >
              <ProList<{
                title: string;
                subTitle: ReactNode;
                actions: ReactNode[];
                description: ReactNode;
                type?: "top" | "inline" | "new";
                avatar: string;
                children: ReactNode;
              }>
                metas={{
                  title: {},
                  subTitle: {},
                  type: {},
                  description: {},
                  avatar: {},
                  content: {},
                }}
                rowKey='id'
                dataSource={take(3)(modulesDataSource)}
              />
            </ProCard>
          </Col>
        </Row>
      </Flex>
    </Page>
  );
};
