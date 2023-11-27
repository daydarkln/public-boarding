import { CalendarOutlined, CaretDownFilled } from "@ant-design/icons";
import { ProCard } from "@ant-design/pro-components";
import { useQuery } from "@tanstack/react-query";
import { Divider, Popover, List, theme, Space, Avatar, Button } from "antd";
import dayjs from "dayjs";
import { atcb_action } from "add-to-calendar-button";
import { fetchEmployees, fetchUploadedMaterials } from "~api";

export default () => {
  const { token } = theme.useToken();
  const { data: employeesData } = useQuery({
    queryKey: ["collegue"],
    queryFn: fetchEmployees,
  });

  const { data: uploadedMaterial } = useQuery({
    queryKey: ["material"],
    queryFn: fetchUploadedMaterials,
  });

  const employees =
    employeesData?.data?.length > 2
      ? employeesData?.data?.slice(0, 3)
      : employeesData?.data;

  const onboardingContent = (
    <>
      <div className='flex'>
        {employees?.map((employee) => {
          return (
            <ProCard
              bordered
              key={employee.id}
              title={
                <Space>
                  <Avatar src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=2' />
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
                        endDate: dayjs().add(1, "day").format("YYYY-MM-DD"),
                        startTime: dayjs().add(1, "day").format("hh:mm"),
                        endTime: dayjs().add(2, "day").format("hh:mm"),
                        timeZone: "Europe/Moscow",
                      },
                      e.target as HTMLElement,
                    )
                  }
                >
                  Назначить встречу
                </Button>,
              ]}
            >
              <p>{employee?.username}</p>
              <p> {employee?.email}</p>
              <p>{employee?.telegram}</p>
              <p>{employee?.department?.name}</p>
              <p>{employee?.specialities?.name}</p>
            </ProCard>
          );
        })}

        <Divider
          type='vertical'
          className='h-auto'
          style={{ borderColor: "#d9d9d9" }}
        />

        <div className='w-80' style={{ paddingLeft: "1rem" }}>
          <div className='mb-4 text-lg colorText'>Ресурсы для обучения</div>
          <List>
            {uploadedMaterial?.data?.slice(0, 3).map((file, index) => {
              return (
                <List.Item key={index}>
                  <a href={`/useful-materials/${file?.id}`}>{file.name}</a>
                </List.Item>
              );
            })}
          </List>
        </div>
      </div>
    </>
  );

  return (
    <div
      className={`hover:bg-[${token.colorPrimary}]`}
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Divider style={{ height: "1.5em" }} type='vertical' />
      <Popover
        placement='bottom'
        content={onboardingContent}
        overlayStyle={{
          width: "calc(100vw - 24px)",
          padding: "24px",
          paddingTop: 8,
          height: "307px",
          borderRadius: "0 0 8px 8px",
        }}
      >
        <div
          style={{
            color: token.colorTextHeading,
            fontWeight: 500,
            cursor: "pointer",
            display: "flex",
            gap: 4,
            paddingInlineStart: 8,
            paddingInlineEnd: 12,
            alignItems: "center",
          }}
          className={`hover:bg-[${token.colorBgTextHover}]`}
        >
          <span>Ваша Команда</span>
          <CaretDownFilled />
        </div>
      </Popover>
    </div>
  );
};
