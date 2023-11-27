import {
  ProForm,
  ProFormCheckbox,
  ProFormList,
  ProFormText,
} from "@ant-design/pro-components";
import { actionRender } from "../../../../components/ReactNodes";
import React from "react";

type MultipleAnswerFieldsProps = {
  name: string;
};

export const MultipleAnswerFields: React.FC<MultipleAnswerFieldsProps> = (
  props,
) => {
  const { name } = props;
  return (
    <ProFormList
      name={"multipleAnswersList"}
      creatorButtonProps={{
        position: "top",
        creatorButtonText: "Добавить вариант ответа",
      }}
      actionRender={actionRender}
    >
      {(field) => {
        return (
          <ProForm.Group key={field.key}>
            <ProFormText name={"answer"} label='Ответ' />
            <ProFormCheckbox.Group
              name={"isTrue"}
              label='Является правильным'
              options={["Является верным"]}
            ></ProFormCheckbox.Group>
          </ProForm.Group>
        );
      }}
    </ProFormList>
  );
};
