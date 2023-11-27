import { StarOutlined } from "@ant-design/icons";
import { ProCard, ProList } from "@ant-design/pro-components";
import { Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Page } from "~components";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchUploadedMaterials } from "~api";
import { UploadedFiles } from "~types";

const IconText = ({ icon, text }: { icon: any; text: string }) => (
  <p className={"p-2"}>
    {React.createElement(icon, { style: { marginInlineEnd: 8 } })}
    {text}
  </p>
);

export default () => {
  const navigate = useNavigate();
  const { data: uploadedFiles, isLoading } = useQuery({
    queryKey: ["files"],
    queryFn: fetchUploadedMaterials,
  });
  const [materialList, setMaterialList] = useState<UploadedFiles[]>();

  useEffect(() => {
    if (uploadedFiles) setMaterialList(uploadedFiles?.data);
  }, [uploadedFiles]);

  const [form] = Form.useForm();

  const onFinish = (data: { search: string }) => {
    if (data.search === "") setMaterialList(uploadedFiles?.data);
    else
      setMaterialList(
        uploadedFiles?.data.filter((item: UploadedFiles) =>
          item.name
            .toLocaleLowerCase()
            .includes(data.search.toLocaleLowerCase()),
        ),
      );
  };

  return (
    <div
      id='employee-layout'
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Page title={"Полезные материалы"} type={"employee"}>
        <ProList
          search={{}}
          loading={isLoading}
          searchFormRender={() => {
            return (
              <ProCard className={"mb-3 flex"}>
                <Form
                  form={form}
                  layout='vertical'
                  onFinish={onFinish}
                  autoComplete='off'
                  className={"flex justify-between"}
                >
                  <Form.Item name='search' className={"flex-1 mr-10"}>
                    <Input placeholder='Название материала' />
                  </Form.Item>
                  <Form.Item>
                    <Button type='primary' htmlType='submit'>
                      Найти
                    </Button>
                  </Form.Item>
                </Form>
              </ProCard>
            );
          }}
          rowKey='id'
          pagination={{
            pageSize: 5,
          }}
          itemHeaderRender={(item) => {
            return (
              <h2
                onClick={() => navigate(`/useful-materials/${item.id}`)}
                className={`hover:text-blue-400 cursor-pointer transform p-2`}
              >
                {item.name}
              </h2>
            );
          }}
          itemLayout='vertical'
          dataSource={materialList}
          metas={{
            title: {},
            description: {
              render: () => (
                <>
                  <Tag>Колонка воробья</Tag>
                  <Tag>Язык дизайна</Tag>
                  <Tag>Муравей финансовый</Tag>
                </>
              ),
            },
            actions: {
              render: () => [
                <IconText
                  icon={StarOutlined}
                  text='156'
                  key='list-vertical-star-o'
                />,
              ],
            },
            extra: {
              render: () => (
                <img
                  width={272}
                  alt='logo'
                  src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
                />
              ),
            },
            content: {
              render: (_, data) => {
                return <div>{data.name}</div>;
              },
            },
          }}
        />
      </Page>
    </div>
  );
};
