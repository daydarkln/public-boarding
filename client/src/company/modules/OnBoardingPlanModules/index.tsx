import { ProList } from "@ant-design/pro-components";
import { Button, Descriptions, message, Popconfirm, Tag, theme } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "~components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useOnboardingModuleStore } from "./stores/onboardingModuleStore";
import { fetchModules, removeModule } from "~api";
import { useEffect, useMemo } from "react";
import axios from "../../../utils/axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { mapModuleResponseToData } from "../../../utils/mappers";

export default () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const { setOnboardingModule } = useOnboardingModuleStore();

  const {
    refetch,
    data: response,
    isLoading,
  } = useQuery({
    queryKey: ["on-boarding-plan-modules"],
    queryFn: fetchModules,
  });

  const {
    mutate: handleRemove,
    isPending: isRemoveInProgress,
    isSuccess: isRemovingSuccess,
  } = useMutation({
    mutationFn: removeModule,
  });

  useEffect(() => {
    if (isRemovingSuccess) {
      message.success("Успешно удалено");
      refetch();
    }
  }, [isRemovingSuccess]);

  const onboardingModules = useMemo(() => {
    return response?.data?.data?.map(mapModuleResponseToData) || [];
  }, [response]);

  return (
    <Page
      type={"company"}
      title={"Онбординг модули"}
      extra={
        <Button
          onClick={() => navigate("/onboarding-plans/modules/add")}
          size={"large"}
        >
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
        metas={{
          title: {},
          subTitle: {},
          type: {},
          avatar: {},
          content: {},
          actions: {},
        }}
        dataSource={onboardingModules.map((item) => ({
          title: item.title,
          subTitle: item.isNew ? <Tag color='#5BD8A6'>New</Tag> : null,
          actions: [
            <Link
              to={`/onboarding-plans/modules/${item.id}`}
              key='run'
              onClick={() => {
                setOnboardingModule(item);
              }}
            >
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
          content: <Descriptions items={item.data} />,
        }))}
      />
    </Page>
  );
};
