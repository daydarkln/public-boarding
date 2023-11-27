import { ProCard, StatisticCard } from "@ant-design/pro-components";
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Empty,
  Table,
  Tag,
  Tour,
  TourProps,
  theme,
  FloatButton,
  Row,
  Col,
} from "antd";
import { atcb_action } from "add-to-calendar-button";
import Meta from "antd/es/card/Meta";
import { Page, Charts } from "~components";
import { useEmployee } from "~hooks";
import { useNavigate } from "react-router-dom";
import { Progress, List } from "antd";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMeetUps, fetchUploadedMaterials } from "~api";
import { getProgress } from "src/utils/mappers";
import dayjs from "dayjs";
import { CalendarOutlined, QuestionCircleOutlined } from "@ant-design/icons";

export default () => {
  const { data: uploadedFiles } = useQuery({
    queryKey: ["files"],
    queryFn: fetchUploadedMaterials,
  });

  const { data: meets } = useQuery({
    queryKey: ["meets"],
    queryFn: fetchMeetUps,
  });

  const meetUps = meets?.data?.data;

  const mappedMeetUps = meetUps?.map((meet: any) => {
    return {
      key: meet.id,
      date: dayjs(meet.attributes.date).format("MMMM Do YYYY"),
      event: meet.attributes.title,
      link: meet.attributes.link,
    };
  });

  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const tutorialRef = useRef(null);

  const stepsTour: TourProps["steps"] = [
    {
      title: "Добро пожаловать в App Boarding",
      description:
        "Проведем небольшую экскурсию. Тут твоя информация о плане адаптации.",
      target: () => ref1.current,
    },
    {
      title: "Встречи",
      description:
        "Куда же без встреч? Тут ты можешь посмотреть с кем и когда у тебя назначен ближайший meetup! Остальной календарь во вкладке График встреч.",
      target: () => ref2.current,
    },
    {
      title: "Вот и твой прогресс",
      description: "Надеюсь ты хорошо справляешься!",
      target: () => ref3.current,
    },
    {
      title: "Дополнительный материал",
      description: "Не упусти!",
      target: () => ref4.current,
    },
    {
      title: "Все самое полезное",
      description:
        "Чтобы ты быстрее влился в компанию, рекомендуем к прочьтению!",
      target: () => ref5.current,
    },
    {
      title: "И куда же без навыков",
      description: "Их станет еще больше.",
      target: () => ref6.current,
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

  const columns = [
    {
      title: "Дата",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Событие",
      dataIndex: "event",
      key: "event",
    },
    {
      title: "Ссылка",
      dataIndex: "link",
      key: "link",
      className: "w-20px",
      render: (item: string) => {
        return (
          <a href={item} target={"_blank"} rel='noreferrer'>
            {item.slice(0, 40)}
          </a>
        );
      },
    },
  ];

  const { currentEmployee } = useEmployee();
  const { token } = theme.useToken();

  const employeeCurrentStep = currentEmployee?.data?.isOnBoardingPlanComplete
    ? currentEmployee?.data?.currentStep - 1
    : currentEmployee?.data?.currentStep;

  useEffect(() => {
    if (!localStorage.getItem("isTutorialPassed")) {
      setOpen(true);
    }
  }, []);

  const progress =
    getProgress(
      currentEmployee?.data?.currentStep || 0,
      currentEmployee?.data?.onBoardingPlan?.onboardingPlanNodesEdges?.data
        ?.nodes.length || 0,
    ) === Infinity
      ? 0
      : getProgress(
          currentEmployee?.data?.currentStep || 0,
          currentEmployee?.data?.onBoardingPlan?.onboardingPlanNodesEdges?.data
            ?.nodes.length || 0,
        );

  return (
    <div
      id='employee-layout'
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Tour
        open={open}
        onClose={() => {
          localStorage.setItem("isTutorialPassed", "1");
          setOpen(false);
        }}
        steps={stepsTour}
      />
      <Page
        title={
          <div className={"flex  items-center"}>
            <p className={"mr-10"}>
              Добро пожаловать в{" "}
              {currentEmployee?.data?.company?.title || "AppBoarding"}
            </p>
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
        type={"employee"}
      >
        <ProCard
          direction='column'
          ghost
          gutter={[0, 16]}
          bodyStyle={{ paddingBlock: 0, paddingInline: 0 }}
        >
          <ProCard
            colSpan={32}
            ref={ref1}
            bodyStyle={{ width: "100%" }}
            style={{
              background: token.colorPrimaryBg,
              width: "100%",
            }}
            title={
              <Card
                hoverable
                style={{
                  width: "100%",
                  marginRight: "20vw",
                  border: "none",
                  alignSelf: "flex-start",
                }}
                loading={false}
                onClick={() => navigate("/employee-profile")}
              >
                <Meta
                  avatar={
                    <Avatar
                      size={80}
                      src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
                    />
                  }
                  title={currentEmployee?.data.username}
                  description={
                    <div className={""}>
                      <p className={"mr-2 font-bold"}>
                        {currentEmployee?.data?.company?.title}
                      </p>
                      <p>
                        <p className={"mr-2"}>
                          Департамент: {currentEmployee?.data?.department?.name}
                        </p>
                        <p>
                          Cпециальность:
                          {currentEmployee?.data?.speciality?.name}
                        </p>
                      </p>
                    </div>
                  }
                />
              </Card>
            }
          >
            <StatisticCard.Group
              key={1}
              direction={"row"}
              hoverable
              className={"cursor-pointer"}
              onClick={() => {
                navigate("/my-onboarding");
              }}
              bodyStyle={{
                background: token.colorBgBase,
                borderRadius: token.borderRadius,
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={12}>
                  <StatisticCard
                    style={{ background: "none" }}
                    statistic={{
                      title: "Ваш онбординг план",
                      value:
                        currentEmployee?.data?.onBoardingPlan?.title ||
                        "Не выбран",
                    }}
                  />
                </Col>
                <Col span={12}>
                  {currentEmployee?.data?.isOnBoardingPlanComplete ? (
                    <Meta
                      description={
                        <>
                          <Button
                            type={"link"}
                            style={{ marginLeft: "auto" }}
                            className={"mt-[8px]"}
                            onClick={(e) => {
                              e.stopPropagation();
                              atcb_action({
                                name: "Title",
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
                                location: "Встреча с руководителем",
                                startDate: dayjs().format("YYYY-MM-DD"),
                                endDate: dayjs()
                                  .add(1, "hour")
                                  .format("YYYY-MM-DD"),
                                startTime: dayjs()
                                  .add(1, "hour")
                                  .format("hh:mm"),
                                endTime: dayjs().add(2, "hour").format("hh:mm"),
                                timeZone: "Europe/Moscow",
                              });
                            }}
                            icon={<CalendarOutlined />}
                          >
                            Создать встречу с HR
                          </Button>
                          <div
                            className={
                              "text-[24px] whitespace-nowrap text-green-400"
                            }
                          >
                            Поздравляю, вы завершили онбординг!
                          </div>
                        </>
                      }
                    />
                  ) : (
                    <StatisticCard
                      bodyStyle={{
                        background: token.colorBgBase,
                        borderRadius: token.borderRadius,
                      }}
                      statistic={{
                        value: " ",
                        title: (
                          <div>
                            {currentEmployee?.data?.isOnBoardingPlanComplete ? (
                              <Tag color={"blue-inverse"}>
                                Вы завершили онбординг
                              </Tag>
                            ) : (
                              <>
                                <Tag color={"blue-inverse"}>Текущий этап</Tag>
                                <h3>
                                  {currentEmployee?.data?.onBoardingPlan
                                    ?.onboardingPlanNodesEdges?.data?.nodes[
                                    employeeCurrentStep
                                  ]?.data?.title ||
                                    "Вы еще не проходите ни одного этапа"}
                                </h3>
                              </>
                            )}
                          </div>
                        ),
                        style: { whiteSpace: "nowrap" },
                      }}
                      chart={
                        <Charts.RingProgressChart
                          percent={progress}
                          title={"Выполнено на"}
                          color={["#1977FF", "white"]}
                        />
                      }
                      chartPlacement='left'
                    />
                  )}
                </Col>
              </Row>
            </StatisticCard.Group>
          </ProCard>
          <div className={"flex gap-x-[10px]"}>
            <ProCard
              bordered
              hoverable
              ref={ref2}
              title='График встреч'
              onClick={() => navigate("/meets")}
              style={{
                background: token.colorPrimaryBg,
              }}
            >
              <Table dataSource={mappedMeetUps} columns={columns} />
            </ProCard>
            <ProCard
              title={"Прогресс онбординга"}
              bordered={false}
              hoverable
              ref={ref3}
              onClick={() => navigate("/my-onboarding")}
              style={{
                background: token.colorPrimaryBg,
              }}
            >
              <Progress
                percent={
                  getProgress(
                    currentEmployee?.data?.currentStep,
                    currentEmployee?.data?.onBoardingPlan
                      ?.onboardingPlanNodesEdges?.data?.nodes.length || 0,
                  ) * 100
                }
                status='active'
              />
              <List
                dataSource={
                  currentEmployee?.data?.onBoardingPlan
                    ?.onboardingPlanNodesEdges.data.nodes
                }
                renderItem={(item, index) => {
                  const renderInfo = () => {
                    const step =
                      currentEmployee?.data?.currentStep === 0
                        ? Number(currentEmployee?.data?.currentStep + 1)
                        : currentEmployee?.data?.currentStep || 0;

                    if (index < Number(step))
                      return (
                        <Tag className={"ml-auto"} color={"green"}>
                          Готово
                        </Tag>
                      );

                    if (index === Number(step))
                      return (
                        <Tag className={"ml-auto"} color={"blue"}>
                          Текущий этап
                        </Tag>
                      );

                    return (
                      <Tag className={"ml-auto"} color={"red"}>
                        Еще не приступили
                      </Tag>
                    );
                  };
                  return (
                    <List.Item>
                      <h3>{item.data.title}</h3>
                      {renderInfo()}
                    </List.Item>
                  );
                }}
              />
            </ProCard>
          </div>
          <ProCard
            direction='row'
            ghost
            gutter={[5, 16]}
            bodyStyle={{ paddingBlock: 0, paddingInline: 0 }}
          >
            <ProCard direction='column' ghost colSpan={16} gutter={[0, 16]}>
              <ProCard
                ref={ref4}
                title='Советуем изучить'
                bordered
                headerBordered
              >
                {!uploadedFiles?.data?.length ? (
                  <Empty />
                ) : (
                  <Carousel
                    autoplay
                    dots
                    className='overflow-hidden rounded-lg'
                  >
                    {uploadedFiles?.data?.map((material, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-center h-64 bg-white'
                      >
                        <div className='p-8 text-center'>
                          <h3 className='mb-3 text-2xl font-bold text-gray-800'>
                            {material.name}
                          </h3>
                          <a
                            href={`/useful-materials/${material.id}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='inline-block px-4 py-2 mt-4 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded hover:bg-blue-700'
                          >
                            Изучить
                          </a>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                )}
              </ProCard>
              <ProCard
                ref={ref5}
                style={{
                  background: token.colorPrimaryBg,
                }}
                bordered={false}
              >
                {!uploadedFiles?.data?.length ? (
                  <Empty />
                ) : (
                  <Card
                    ref={ref5}
                    title={"Полезные материалы"}
                    style={{
                      background: token.colorPrimaryBg,
                    }}
                    bordered={false}
                  >
                    {uploadedFiles?.data?.slice(0, 8).map((item) => (
                      <Card.Grid
                        key={item.id}
                        className={"cursor-pointer border-0"}
                        onClick={() => {
                          navigate(`/useful-materials/${item.id}`);
                        }}
                      >
                        <h3>{item.name}</h3>
                      </Card.Grid>
                    ))}
                    <Card.Grid
                      className={
                        "cursor-pointer flex items-center justify-center text-blue-400"
                      }
                      onClick={() => {
                        navigate("/useful-materials");
                      }}
                    >
                      <h3>READ MORE</h3>
                    </Card.Grid>
                  </Card>
                )}
              </ProCard>
            </ProCard>
            <ProCard
              direction='column'
              ghost
              gutter={[0, 16]}
              style={{
                paddingBlock: 0,
                paddingInline: 0,
              }}
            >
              <ProCard
                hoverable
                ref={ref6}
                bordered={false}
                onClick={() => navigate("/skills")}
                title={"Навыки"}
                style={{
                  background: token.colorPrimaryBg,
                  height: 293,
                }}
              >
                <Charts.SkillsChart />
              </ProCard>
            </ProCard>
          </ProCard>
        </ProCard>
      </Page>
    </div>
  );
};
