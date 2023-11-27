// QuizPage.tsx
import React, { useState } from "react";
import { Question } from "~types";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Form,
  Input,
  Rate,
  Checkbox,
  Statistic,
  Row,
  Col,
  Tag,
} from "antd";

import { useEmployee } from "~hooks";
import { Page } from "~components";
import { writeActivity } from "~api";
import dayjs from "dayjs";
import { v4 } from "uuid";

const { Countdown } = Statistic;
const { Group: CheckboxGroup } = Checkbox;

interface Module {
  key: string;
  questions: Question[];
}

interface QuizPageProps {
  modules?: Module[];
  timeLimit?: number;
}

const QuizPage: React.FC<QuizPageProps> = () => {
  const { currentEmployee } = useEmployee();
  const location = useLocation();
  const quizModules = location.state?.modules?.filter(
    (module: any) => module.id === location.state?.currentStepModule,
  );

  const title = currentEmployee?.data?.onBoardingPlan?.title;

  const timeLimit = 1000;

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set<string>());

  const deadline = Date.now() + timeLimit * 1000;

  const onFinish = () => {
    handleSubmit();
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    const allValues = form.getFieldsValue(true);
    writeActivity(
      `${currentEmployee?.data?.id}`,
      {
        action: "test",
        creationTime: dayjs().format("YYYY-DD-MM"),
        title: "Прохождение тестирования",
        id: v4(),
      },
      `${Number(currentEmployee?.data?.currentStep) + 1}`,
    )(currentEmployee?.data?.onboardingResult || []).then(() =>
      navigate("/results", { state: { allValues } }),
    );

    setSubmitting(false);
  };

  const goToPreviousQuestion = () => {
    if (currentModuleIndex > 0) {
      setCurrentModuleIndex(currentModuleIndex - 1);
    }
  };

  const goToNextQuestion = () => {
    if (
      currentModuleIndex <
      quizModules[currentModuleIndex]?.attributes?.moduleTypeData?.data.length -
        1
    ) {
      setCurrentModuleIndex(currentModuleIndex + 1);
    }
  };
  const parseQuestionData = (data: any) => {
    const elementsArray: any = [];

    const { quizType, questionTitle } = data;

    Object.keys(data).forEach((key) => {
      if (!isNaN(key as any)) {
        elementsArray.push(data[key]);
      }
    });

    return {
      elements: elementsArray,
      quizType,
      questionTitle,
    };
  };

  const onValuesChange = (changedValues: any) => {
    const changedField = Object.keys(changedValues)[0];

    const match = /modules\[(\d+)]\.questions\[(\d+)]\.answer/.exec(
      changedField,
    );

    if (match) {
      const [moduleIdx, questionIdx] = match.slice(1).map(Number);
      const questionKey = quizModules[moduleIdx].questions[questionIdx].key;

      setAnsweredQuestions(
        new Set([...Array.from(answeredQuestions), questionKey]),
      );
    }
  };

  const renderAnswerField = (
    question: any,
    moduleIndex: number,
    questionIndex: number,
  ) => {
    const quiz =
      question.quizType === "rate" ? parseQuestionData(question) : question;

    const fieldName = `modules[${moduleIndex}].questions[${questionIndex}].answer`;
    switch (question.quizType) {
      case "text":
        return (
          <>
            <Tag color={"blue"} className={"mb-4"}>
              {quiz?.questionTitle}
            </Tag>
            <Form.Item
              name={fieldName}
              rules={[{ required: true, message: "Введите ваш ответ" }]}
            >
              <Input placeholder='Введите ваш ответ' />
            </Form.Item>
          </>
        );
      case "single":
        return (
          <>
            <Tag color={"blue"} className={"mb-4"}>
              {quiz?.questionTitle}
            </Tag>
            <Form.Item
              name={fieldName}
              rules={[{ required: true, message: "Выберите один вариант" }]}
            >
              <CheckboxGroup>
                {quiz?.multipleAnswersList?.map(
                  (option: any, index: number) => {
                    const isTrue = option?.isTrue?.[0];

                    return (
                      <Checkbox
                        key={index}
                        value={{
                          value: isTrue,
                          label: option.answer,
                        }}
                      >
                        {option.answer}
                      </Checkbox>
                    );
                  },
                )}
              </CheckboxGroup>
            </Form.Item>
          </>
        );
      case "multiple":
        return (
          <>
            <Tag color={"blue"} className={"mb-4"}>
              {quiz?.questionTitle}
            </Tag>
            <Form.Item
              name={fieldName}
              rules={[
                { required: true, message: "Выберите несколько вариантов" },
              ]}
            >
              <CheckboxGroup>
                {quiz?.multipleAnswersList?.map(
                  (option: any, index: number) => {
                    const isTrue = option?.isTrue?.[0];

                    return (
                      <Checkbox
                        key={index}
                        value={{
                          value: isTrue,
                          label: option.answer,
                        }}
                      >
                        {option.answer}
                      </Checkbox>
                    );
                  },
                )}
              </CheckboxGroup>
            </Form.Item>
          </>
        );
      case "rate":
        return (
          <>
            <Tag color={"blue"} className={"mb-4"}>
              {quiz?.questionTitle}
            </Tag>
            {quiz.elements.map((element: any, index: any) => {
              return (
                <Form.Item
                  key={index}
                  name={fieldName}
                  rules={[{ required: true, message: "Оцените этот вопрос" }]}
                >
                  <Rate count={element.maxCount} />
                </Form.Item>
              );
            })}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      id='employee-layout'
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Page title={title} type={"employee"}>
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={onValuesChange}
          layout='vertical'
        >
          <Row gutter={24}>
            <Col span={24}>
              <div className={"flex items-center justify-between"}>
                <h3 className={"mr-10"}>
                  Модуль: {quizModules[currentModuleIndex]?.attributes?.title}
                </h3>
                <Countdown
                  title='Оставшееся время'
                  value={deadline}
                  onFinish={onFinish}
                />
              </div>
              {quizModules[
                currentModuleIndex
              ]?.attributes?.moduleTypeData?.data.map(
                (question: any, questionIndex: number) => {
                  return (
                    <Card key={question.key} style={{ marginBottom: 16 }}>
                      {renderAnswerField(
                        question,
                        currentModuleIndex,
                        questionIndex,
                      )}
                    </Card>
                  );
                },
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <Button
                  onClick={goToPreviousQuestion}
                  disabled={currentModuleIndex === 0}
                >
                  Назад
                </Button>
                {quizModules?.length - 1 !== currentModuleIndex && (
                  <Button onClick={goToNextQuestion}>Вперед</Button>
                )}
                <Button type='primary' htmlType='submit' loading={submitting}>
                  Отправить ответы
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Page>
    </div>
  );
};

export default QuizPage;
