// ResultsPage.tsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { List, Typography, Divider, Card, Button } from "antd";
import { Page } from "~components";

const { Title, Text } = Typography;

// Here's a simplified structure for the answer,
// but you'll need to adjust it based on how you determine if an answer is correct.
interface Answer {
  question: string;
  answer: string | number | string[]; // Depending on how answers are stored
  isCorrect: boolean;
}

interface Results {
  score: number;
  total: number;
  correctAnswers: number;
  wrongAnswers: number;
}

const ResultsPage: React.FC = () => {
  const location = useLocation();
  const { allValues } = location.state || {};

  // Transform the allValues object into an array of Answer objects
  const answers = Object.entries(allValues || {}).map(([key, value]) => {
    const currentValue = value as { value: boolean; label: string }[];
    // Parse the key to extract which question it refers to
    // For simplicity, let's say the question text is the same as the key
    return {
      question: key,
      answer: currentValue[0]?.label,
      isCorrect: currentValue[0]?.value, // You would have logic to determine if the answer is correct
    };
  });

  const calculateResults = (answers: Answer[]): Results => {
    let correctCount = answers?.filter((answer) => answer?.isCorrect).length;

    return {
      score: correctCount,
      total: answers.length,
      correctAnswers: correctCount,
      wrongAnswers: answers.length - correctCount,
    };
  };

  const results =
    answers?.length > 0 ? calculateResults(answers as Answer[]) : null;

    const navigate = useNavigate()

  return (
    <div
      id='employee-layout'
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Page type={"employee"} footer={<Button onClick={() => navigate('/my-onboarding')}>Продолжить</Button>}>
        <div className='container p-4 mx-auto mt-4'>
          <Card className='shadow-xl'>
            <Title level={2} className='text-center'>
              Спасибо, что прошли тест
            </Title>
            <Divider />
            {results && (
              <>
                <div className='mb-4'>
                  <Text strong>Результат:</Text> {results.score} /{" "}
                  {results.total}
                </div>
                <div className='mb-4'>
                  <Text strong>Правильные Ответы:</Text>{" "}
                  {results.correctAnswers}
                </div>
                <div className='mb-4'>
                  <Text strong>Неправильные ответы:</Text>{" "}
                  {results.wrongAnswers}
                </div>
                <Divider />
                <List
                  header={<div>Ваши результаты</div>}
                  bordered
                  dataSource={answers as Answer[]}
                  renderItem={(item: Answer, index) => (
                    <List.Item className='flex justify-between'>
                      <div>Вопрос: {index + 1}</div>
                      <div
                        className={
                          item.isCorrect ? "text-green-500" : "text-red-500"
                        }
                      >
                        {item.isCorrect ? "Правильно" : "Неправильно"}
                      </div>
                    </List.Item>
                  )}
                />
              </>
            )}
            {!results && <Text>No results to display.</Text>}
          </Card>
        </div>
      </Page>
    </div>
  );
};

export default ResultsPage;
