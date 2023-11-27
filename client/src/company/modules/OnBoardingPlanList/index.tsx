import { ProList } from "@ant-design/pro-components";
import { Button, Descriptions, message, Popconfirm, Tag, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "~components";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "../../../utils/axios";
import { useEffect, useMemo } from "react";
import { useOnboardingPlanStore } from "src/stores/onboardingPlanStore";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { fetchPlans, removePlan } from "~api";
import { ColumnCount } from "antd/es/list";
import { v4 } from "uuid";

export default () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  const {
    refetch,
    data: response,
    isLoading,
  } = useQuery({
    queryKey: ["on-boarding-plans"],
    queryFn: fetchPlans,
  });

  const {
    mutate: handleRemove,
    isPending: isRemoveInProgress,
    isSuccess: isRemovingSuccess,
  } = useMutation({
    mutationFn: removePlan,
  });

  useEffect(() => {
    if (isRemovingSuccess) {
      message.success("Успешно удалено");
      refetch();
    }
  }, [isRemovingSuccess]);

  const onboardingPlans = useMemo(() => {
    return (
      response?.data?.data?.map((plan) => ({
        id: plan.id,
        title: plan.attributes.title,
        nodes: plan.attributes.onboardingPlanNodesEdges?.nodes,
        edges: plan.attributes.onboardingPlanNodesEdges?.edges,
        deadline: [
          plan.attributes.deadlineStart,
          plan.attributes.deadlineFinish,
        ],
      })) || []
    );
  }, [response]);
  return (
    <Page
      type={"company"}
      title={"Онбординг планы"}
      extra={
        <Button onClick={() => navigate("/create-plan")} size={"large"}>
          Добавить
        </Button>
      }
    >
      <ProList
        loading={isLoading || isRemoveInProgress}
        className={"min-h-full"}
        tableStyle={{
          background: token.colorPrimaryBg,
        }}
        pagination={{
          defaultPageSize: 12,
          showSizeChanger: false,
          className: "mt-auto",
        }}
        extra={<Button>Удалить</Button>}
        showActions='hover'
        rowSelection={{}}
        grid={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              // console.log(record)
            },
            onClick: () => {
              // console.log(record)
            },
          };
        }}
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {},
        }}
        dataSource={onboardingPlans.map((item) => {
          return {
            isLoading: isRemoveInProgress,
            title: item.title,
            subTitle: <Tag color='#5BD8A6'>New</Tag>,
            actions: [
              <Link to={`/onboarding-plans/${item.id}`} key='run'>
                <EditOutlined />
              </Link>,
              <Popconfirm
                key={[item.key, "confirm"].join("")}
                title={"Вы уверены?"}
                onConfirm={async () => {
                  await handleRemove(item.id);
                }}
              >
                <DeleteOutlined style={{ color: token.colorError }} />
              </Popconfirm>,
            ],
            avatar:
              "https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg",
            content: (
              <div
                style={{
                  flex: 1,
                }}
              >
                <div
                  style={{
                    width: "100%",
                  }}
                >
                  <div>
                    <Descriptions
                      items={[
                        {
                          key: "deadline",
                          label: "Дней на прохождение",
                          children: (
                            <>
                              от {item.deadline[0]} до {item.deadline[1]}
                            </>
                          ),
                        },
                      ]}
                    />
                  </div>
                </div>
              </div>
            ),
          };
        })}
      />
    </Page>
  );
};
