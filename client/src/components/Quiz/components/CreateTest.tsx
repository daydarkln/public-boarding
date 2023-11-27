import React from "react";
import { Form, Input, Button, Space, Checkbox, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateSurveyForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {};

  const renderOptions = (type: string, optionField: any, removeOption: any) => {
    switch (type) {
      case "single":
      case "multiple":
        return (
          <Space key={optionField.key} align='baseline'>
            <Form.Item
              {...optionField}
              name={[optionField.name, "text"]}
              fieldKey={[optionField.fieldKey, "text"]}
              rules={[{ required: true, message: "Введите текст опции" }]}
            >
              <Input placeholder='Текст опции' />
            </Form.Item>
            <Form.Item
              {...optionField}
              name={[optionField.name, "isCorrect"]}
              fieldKey={[optionField.fieldKey, "isCorrect"]}
              valuePropName='checked'
            >
              <Checkbox>Правильный</Checkbox>
            </Form.Item>
            <MinusCircleOutlined
              onClick={() => removeOption(optionField.name)}
            />
          </Space>
        );
      case "text":
        return (
          <Form.Item
            {...optionField}
            name={[optionField.name, "text"]}
            fieldKey={[optionField.fieldKey, "text"]}
            rules={[
              { required: true, message: "Введите правильный текстовый ответ" },
            ]}
          >
            <Input placeholder='Правильный ответ' />
          </Form.Item>
        );
      default:
        return null;
    }
  };

  return (
    <Form
      form={form}
      name='dynamic_form_nest_item'
      onFinish={onFinish}
      autoComplete='off'
    >
      <Form.List name='questions'>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align='baseline'
              >
                <Form.Item
                  {...restField}
                  name={[name, "questionText"]}
                  rules={[{ required: true, message: "Введите текст вопроса" }]}
                >
                  <Input placeholder='Текст вопроса' />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "type"]}
                  rules={[{ required: true, message: "Выберите тип ответа" }]}
                >
                  <Select
                    placeholder='Выберите тип ответа'
                    style={{ width: 150 }}
                  >
                    <Option value='single'>Одиночный выбор</Option>
                    <Option value='multiple'>Множественный выбор</Option>
                    <Option value='text'>Текстовый ответ</Option>
                  </Select>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
                <Form.List name={[name, "options"]}>
                  {(optionFields, { add: addOption, remove: removeOption }) => {
                    const questionType = form.getFieldValue([
                      "questions",
                      name,
                      "type",
                    ]);
                    return (
                      <>
                        {optionFields.map((optionField) => (
                          <div key={optionField.key}>
                            {renderOptions(
                              questionType,
                              optionField,
                              removeOption,
                            )}
                          </div>
                        ))}
                        {questionType !== "text" && (
                          <Form.Item>
                            <Button
                              type='dashed'
                              onClick={() => addOption()}
                              block
                              icon={<PlusOutlined />}
                            >
                              Добавить опцию
                            </Button>
                          </Form.Item>
                        )}
                      </>
                    );
                  }}
                </Form.List>
              </Space>
            ))}
            <Form.Item>
              <Button
                type='dashed'
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Добавить вопрос
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default CreateSurveyForm;
