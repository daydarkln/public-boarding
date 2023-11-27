import React, { useState } from "react";
import {
  Calendar,
  Badge,
  Modal,
  List,
  Drawer,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
  CalendarProps,
} from "antd";
import dayjs, { Dayjs } from "dayjs";

import { Moment } from "moment";
import { Page } from "~components";
import { createMeetUps, fetchMeetUps } from "~api";
import { useMutation, useQuery } from "@tanstack/react-query";

const MeetingsCalendar: React.FC = () => {
  const { mutateAsync } = useMutation({ mutationFn: createMeetUps });

  const [selectDate, setSelectDate] = useState<Dayjs>();

  const { data: meets } = useQuery({
    queryKey: ["meets"],
    queryFn: fetchMeetUps,
  });

  const meetUps = meets?.data?.data;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState<boolean>(false);
  const [form] = Form.useForm();

  const showDrawer = () => {
    setIsDrawerVisible(true);
  };

  const closeDrawer = () => {
    setIsDrawerVisible(false);
  };

  const onDrawerFormSubmit = (values: any) => {
    mutateAsync({
      title: values.title,
      description: values.description,
      date: values.date,
      link: values.zoomLink,
    });
    setIsDrawerVisible(false);
    form.resetFields();
  };

  const dateCellRender = (value: Moment) => {
    const valueDateStr = value.format("YYYY-MM-DD");

    const dayEvents = meetUps?.filter((event: any) => {
      return dayjs(event.attributes.date).format("YYYY-MM-DD") === valueDateStr;
    });

    if (dayEvents?.length > 0)
      return (
        <ul className='events'>
          {meetUps?.map((event: any) => (
            <li key={event.id}>
              <Badge status={"success"} text={event.attributes.title} />
            </li>
          ))}
        </ul>
      );
  };

  const cellRender: CalendarProps<Dayjs>["cellRender"] = (
    current: any,
    info,
  ) => {
    if (info.type === "date") return dateCellRender(current);
    return info.originNode;
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <Page type={"employee"}>
      <Calendar
        cellRender={cellRender}
        mode={"month"}
        onSelect={(value) => {
          setSelectDate(value);
          setIsModalVisible(true);
        }}
      />
      <Modal
        title='События на день'
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <List
          size='small'
          bordered
          dataSource={meetUps?.filter(
            (meet: any) =>
              dayjs(meet.attributes.date).format("YYYY-MM-DD") ===
              dayjs(selectDate).format("YYYY-MM-DD"),
          )}
          renderItem={(item: any) => {
            return (
              <div>
                <List.Item>
                  {item.attributes.title}: {item.attributes.description}
                </List.Item>
                <List.Item>
                  Дата: {`${dayjs(item.attributes.date).format("YYYY-MM-DD")}`}
                </List.Item>
                <List.Item>
                  Ccылка на встречу:
                  <a
                    href={item.attributes.link}
                    target={"_blank"}
                    rel='noreferrer'
                  >
                    {item.attributes.link}
                  </a>
                </List.Item>
              </div>
            );
          }}
        />
      </Modal>
      <Button type='primary' onClick={showDrawer}>
        Создать встречу с HR
      </Button>
      <Drawer
        title='Создать встречу с HR'
        width={360}
        onClose={closeDrawer}
        open={isDrawerVisible}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={closeDrawer} style={{ marginRight: 8 }}>
              Отмена
            </Button>
            <Button onClick={() => form.submit()} type='primary'>
              Создать
            </Button>
          </div>
        }
      >
        <Form form={form} layout='vertical' onFinish={onDrawerFormSubmit}>
          <Form.Item
            name='title'
            label='Название встречи'
            rules={[{ required: true, message: "Введите название встречи" }]}
          >
            <Input placeholder='Введите название' />
          </Form.Item>
          <Form.Item name='description' label='Описание'>
            <Input.TextArea rows={3} placeholder='Введите описание встречи' />
          </Form.Item>
          <div className={"flex justify-between mb-3"}>
            <Form.Item
              name='date'
              label='Дата'
              rules={[{ required: true, message: "Выберите дату встречи" }]}
            >
              <DatePicker />
            </Form.Item>
            <Form.Item
              name='time'
              label='Время'
              rules={[{ required: true, message: "Выберите время встречи" }]}
            >
              <TimePicker />
            </Form.Item>
          </div>
          <Form.Item
            name='zoomLink'
            label='Ссылка на Zoom'
            rules={[{ type: "url", message: "Введите корректную ссылку" }]}
          >
            <Input placeholder='Введите ссылку для встречи Zoom' />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Сохранить
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </Page>
  );
};

export default MeetingsCalendar;
