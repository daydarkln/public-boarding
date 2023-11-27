import {
  ProForm,
  ProFormItem,
  ProFormList,
  ProFormRadio,
  ProFormText,
} from "@ant-design/pro-components";
import { actionRender } from "../../../../components/ReactNodes";

export const SingleAnswerFields = () => {
  return (
    <ProFormList
      name='singleAnswersList'
      creatorButtonProps={{
        position: "top",
        creatorButtonText: "Добавить вариант ответа",
      }}
      actionRender={actionRender}
    >
      {(field) => (
        <ProForm.Group key={field.key}>
          <ProFormItem key={field.key} name={[field.key, "answer"]}>
            <ProFormText label='Ответ' />
          </ProFormItem>
          <ProFormItem key={field.key}>
            <ProFormRadio
              name={[field.key, "isTrue"]}
              label='Является правильным'
            />
          </ProFormItem>
        </ProForm.Group>
      )}
    </ProFormList>
  );
};
