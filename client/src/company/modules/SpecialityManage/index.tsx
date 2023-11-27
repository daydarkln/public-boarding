import React from "react";
import ProForm, { ProFormText } from "@ant-design/pro-form";
import { message, notification } from "antd";
import { Page } from "~components";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  mapDepartmetsResponseToData,
  mapResponseToSelectData,
  mapSpecialitiesResponseToData,
} from "../../../utils/mappers";
import { fetchDepartment } from "../../../api/department";
import { ProFormSelect, ProFormTextArea } from "@ant-design/pro-components";
import { fetchEmployees } from "~api";
import { fetchSpeciality, updateSpeciality } from "../../../api/specialities";

export default () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: createDepartment } = useMutation({
    mutationFn: updateSpeciality,
  });

  const onFinish = async (data) => {
    await createDepartment({ id, data });
    if (!id) {
      notification.success({
        message: `Специальность создана`,
      });
    } else {
      message.success("Специальность изменена");
    }
    navigate("/specialities");
  };

  return (
    <Page
      type={"company"}
      title={id ? "Редактирование специальности" : "Создание специальности"}
    >
      <ProForm
        onFinish={onFinish}
        request={async () => {
          if (id) {
            const response = await fetchSpeciality(id);
            return mapSpecialitiesResponseToData(response);
          }

          return {};
        }}
      >
        <ProForm.Group direction='horizontal'>
          <ProForm.Group direction={"vertical"}>
            <ProFormText
              width='md'
              name='name'
              label='Название'
              placeholder='Введите название специальности'
              rules={[
                {
                  required: true,
                  message: "Пожалуйста, введите название специальности",
                },
              ]}
            />
            <ProFormSelect
              width='md'
              label={"Сотрудники"}
              name={"specialities"}
              mode={"multiple"}
              request={async () => {
                const response = await fetchEmployees();
                return mapResponseToSelectData(
                  response,
                  ["username"],
                  response.data,
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
