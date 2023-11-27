import { useState } from "react";
import {
  ProDescriptions,
  ProForm,
  ProFormDatePicker,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Drawer, Tag } from "antd";
import dayjs from "dayjs";
import { Page } from "~components";
import { useEmployee } from "~hooks";
import { useNavigate } from "react-router-dom";
import Activity from "../OnBoarding/components/Activity";

export default () => {
  const navigate = useNavigate();
  const { currentEmployee } = useEmployee();

  const user = currentEmployee?.data;

  const [drawerVisible, setDrawerVisible] = useState(false);

  const [employeeInfo, setEmployeeInfo] = useState({
    name: "John Doe",
    position: "Software Engineer",
    department: "Research & Development",
    email: "john.doe@example.com",
    phone: "+1234567890",
    onboardingProgress: 80,
    startDate: dayjs().subtract(1, "month"),
    education: "B.Sc. Computer Science",
    skills: ["JavaScript", "React", "Node.js"],
    projects: ["Project Alpha", "Project Beta"],
  });

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  const handleFormSubmit = (values) => {
    setEmployeeInfo({ ...employeeInfo, ...values });
    closeDrawer();
  };

  return (
    <Page type={"employee"}>
      <ProDescriptions
        column={1}
        title={user?.username}
        tooltip={"Тут ваша краткая личная информация"}
      >
        <ProDescriptions.Item label='ФИО'>
          {user?.username}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Должность'>
          {user?.speciality?.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Департамент'>
          {user?.department?.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label='Email'>{user?.email}</ProDescriptions.Item>
        <ProDescriptions.Item label='Телефон'>+1234567890</ProDescriptions.Item>
        <ProDescriptions.Item label='Onboarding Progress' valueType='progress'>
          {employeeInfo.onboardingProgress}
        </ProDescriptions.Item>
        <ProDescriptions.Item valueType='option'>
          <Button key='edit' type='primary' onClick={showDrawer}>
            Редактировать
          </Button>
          <Button
            key='onboarding'
            style={{ margin: "0 8px" }}
            onClick={() => navigate("/my-onboarding")}
          >
            Мой онбординг
          </Button>
        </ProDescriptions.Item>
      </ProDescriptions>
      <Activity />
      <Drawer
        title='Edit Profile'
        width={720}
        onClose={closeDrawer}
        visible={drawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <ProForm
          id='employeeEditForm'
          onFinish={handleFormSubmit}
          initialValues={{
            ...employeeInfo,
            startDate: employeeInfo.startDate.format("YYYY-MM-DD"),
            skills: employeeInfo.skills.join(", "),
            projects: employeeInfo.projects.join(", "),
          }}
        >
          <ProFormText
            width='md'
            name='username'
            label='ФИО'
            placeholder='Введите свое фио'
          />
          <ProFormText
            width='md'
            name='speciality'
            label='Должность'
            placeholder='Ваша должность'
          />
          <ProFormText
            width='md'
            name='department'
            label='Департамент'
            placeholder='Ваш департамент'
          />
          <ProFormText
            width='md'
            name='email'
            label='Email'
            placeholder='Email'
          />
        </ProForm>
      </Drawer>
    </Page>
  );
};
