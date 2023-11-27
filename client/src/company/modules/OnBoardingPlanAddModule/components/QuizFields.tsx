import React, { ReactNode } from "react";

import {
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { MultipleAnswerFields } from "./MultipleAnswerFields";
import { Card } from "antd";
import { actionRender } from "../../../../components/ReactNodes";

type QuestionTypes = "text" | "single" | "multiple" | "rate";

const questionTypes: { label: string; value: QuestionTypes }[] = [
  {
    label: "Свободный ответ",
    value: "text",
  },
  {
    label: "Единственный вариант",
    value: "single",
  },
  {
    label: "Множественный выбор",
    value: "multiple",
  },
  {
    label: "Оценка",
    value: "rate",
  },
];

const ansersOf = (
  type: QuestionTypes,
  key: string,
): Record<QuestionTypes, ReactNode> => {
  const types = {
    text: null,
    rate: (
      <ProFormDigit
        name={[key, "maxCount"]}
        placeholder={"Максимальная оценка"}
        initialValue={5}
      />
    ),
    single: <MultipleAnswerFields name={key} />,
    multiple: <MultipleAnswerFields name={key} />,
  };

  return types[type];
};

const QuizFields: React.FC = () => {
  return (
    <ProForm.Group>
      <ProFormList
        name='questions'
        creatorButtonProps={{
          position: "top",
          creatorButtonText: "Добавить вопрос",
        }}
        actionRender={actionRender}
      >
        {(field) => (
          <Card style={{ minWidth: 470, marginBottom: 10 }}>
            <ProFormText
              name={"questionTitle"}
              placeholder='Enter question'
              label='Question'
            />
            <ProFormSelect name={"quizType"} options={questionTypes} />
            <ProFormDependency name={["quizType"]}>
              {(data) => {
                return ansersOf(data?.quizType, field.key);
              }}
            </ProFormDependency>
          </Card>
        )}
      </ProFormList>
    </ProForm.Group>
  );
};

export default QuizFields;
