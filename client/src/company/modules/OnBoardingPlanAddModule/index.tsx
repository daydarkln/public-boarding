import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormInstance,
  ProFormItem,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import {
  Button,
  Card,
  Divider,
  Empty,
  message,
  Upload,
  UploadFile,
} from "antd";
import { Page } from "~components";
import { useEffect, useRef, useState } from "react";
import QuizFields from "./components/QuizFields";
import { UploadChangeParam } from "antd/lib/upload";
import mammoth from "mammoth";

import { BlockNoteView, useBlockNote } from "@blocknote/react";
import { Block } from "@blocknote/core";
import axios from "../../../utils/axios";
import { useParams } from "react-router-dom";
import { mapModuleResponseToData } from "../../../utils/mappers";
import { useMutation } from "@tanstack/react-query";
import { manageModule } from "~api";

export default () => {
  const formRef = useRef<ProFormInstance<any>>();

  const [, setAttachment] = useState<UploadChangeParam<UploadFile<any>>>();

  const [htmlOutput, setHtmlOutput] = useState<string>("");

  const convertToHtml = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      const arrayBuffer = reader.result as ArrayBuffer;

      mammoth
        .convertToHtml({ arrayBuffer })
        .then((result) => {
          setHtmlOutput(result.value);
        })
        .catch((error) => {});
    };
    reader.readAsArrayBuffer(file);
  };

  const editor = useBlockNote();

  const fieldsOf = {
    text: (
      <Card>
        <ProFormItem name={"moduleTextContent"} label={"Введите текст"}>
          <BlockNoteView editor={editor} theme={"light"} />
        </ProFormItem>
      </Card>
    ),
    test: <QuizFields />,
  };

  const { id } = useParams();

  useEffect(() => {
    const getBlocks = async () => {
      const blocks: Block[] = await editor.HTMLToBlocks(htmlOutput);
      editor.replaceBlocks(editor.topLevelBlocks, blocks);
    };
    getBlocks();
  }, [editor, htmlOutput]);

  const { mutate: handleManageModule } = useMutation({
    mutationFn: manageModule(id),
  });

  return (
    <Page
      type={"company"}
      footer={[
        <Button
          key={"submit"}
          onClick={async () => {
            const values = formRef.current?.getFieldsValue();
            const text = await editor.blocksToHTML(editor.topLevelBlocks);
            if (id !== undefined) {
              const payload = {
                data: {
                  ...values,
                  moduleTypeData: {
                    data:
                      values.moduleType === "text" ? text : values.questions,
                  },
                },
              };
              await handleManageModule(payload);
              message.success("Модуль успешно изменен");
              return;
            }
            const payload = {
              data: {
                ...values,
                moduleTypeData: {
                  data: values.moduleType === "text" ? text : values.questions,
                },
              },
            };
            await handleManageModule(payload);
            message.success("Модуль успешно добавлен");
          }}
        >
          Сохранить
        </Button>,
      ]}
    >
      <ProForm
        formRef={formRef}
        submitter={false}
        request={async () => {
          if (id === undefined) {
            return {};
          }
          const response = await axios.get(`on-boarding-plan-modules/${id}`);
          const result = mapModuleResponseToData(response?.data?.data);
          const blocks: Block[] = await editor.HTMLToBlocks(
            result.moduleTextContent,
          );
          await editor.replaceBlocks(editor.topLevelBlocks, blocks);
          return result;
        }}
      >
        <Card className='flex justify-center cursor-pointer'>
          <Upload
            name={"uploadFile"}
            onChange={(data) => {
              setAttachment(data);
            }}
            beforeUpload={convertToHtml}
            accept={".doc,.docx"}
            maxCount={1}
            action='https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188'
          >
            <Empty description='Добавьте файл' />
          </Upload>
        </Card>
        <Divider>Или заполните форму</Divider>
        <ProFormText
          width='md'
          name='title'
          label='Название модуля'
          placeholder='Пожалуйста введите название'
        />
        <ProFormTextArea
          width='md'
          name='description'
          label='Описание модуля'
          placeholder='Пожалуйста введите описание'
        />
        <ProForm.Group>
          <ProFormSelect
            options={[
              {
                value: "text",
                label: "Текст",
              },
              {
                value: "test",
                label: "Опросник",
              },
            ]}
            width='md'
            name='moduleType'
            tooltip={
              "На данном этапе доступны два вида - это текстовая информация и опросник. Если требуется сделать опросник по текстовой информации, стоит создать два модуля"
            }
            initialValue={"text"}
            label={"Тип модуля"}
          />
          <ProFormDigit name='duration' label={"Продолжительность"} />
        </ProForm.Group>
        <ProFormDependency name={["moduleType"]}>
          {({ moduleType }) => {
            return fieldsOf[moduleType];
          }}
        </ProFormDependency>
      </ProForm>
    </Page>
  );
};
