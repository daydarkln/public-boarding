import React from "react";
import ProForm, { ProFormText } from "@ant-design/pro-form";
import { message, notification } from "antd";
import { Page } from "~components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  mapDepartmetsResponseToData,
  mapResponseToSelectData,
} from "../../../utils/mappers";
import { fetchDepartment, updateDepartment } from "../../../api/department";
import { ProFormSelect, ProFormTextArea } from "@ant-design/pro-components";
import { fetchSpecialities } from "~api";

export default () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: createDepartment } = useMutation({
    mutationFn: updateDepartment,
  });

  const onFinish = async (data) => {
    await createDepartment({ id, data });
    if (id) {
      notification.success({
        message: `Департамент изменен`,
      });
    } else {
      message.success("Департамент создан");
    }
    navigate("/departments");
  };

  return (
    <Page
      type={"company"}
      title={id ? "Редактирование департамента" : "Создание департамента"}
    >
      <ProForm
        onFinish={onFinish}
        request={async () => {
          if (id) {
            const response = await fetchDepartment(id);
            return mapDepartmetsResponseToData(response);
          }

          return {};
        }}
      >
        <ProForm.Group direction='horizontal'>
          <ProForm.Group direction='vertical'>
            <ProFormText
              width='md'
              name='name'
              label='Название'
              placeholder='Введите название департамента'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите название департамента",
                },
              ]}
            />
            <ProFormSelect
              width='md'
              label={"Специальности"}
              name={"specialities"}
              mode={"multiple"}
              request={async () => {
                const response = await fetchSpecialities();
                return mapResponseToSelectData(
                  response,
                  ["attributes", "name"],
                  response.data.data,
                );
              }}
            />
          </ProForm.Group>
          <ProForm.Group>
            <ProFormTextArea
              width='lg'
              name={"description"}
              label={"Описание"}
            />
          </ProForm.Group>
        </ProForm.Group>
      </ProForm>
    </Page>
  );
};
