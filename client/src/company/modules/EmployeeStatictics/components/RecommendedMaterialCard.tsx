import React from "react";
import ProCard from "@ant-design/pro-card";
import { Empty, Carousel, Typography } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const { Link } = Typography;

// Предположим, что у вас есть массив ресурсов для карусели
const resources = [
  {
    title: "Введение в корпоративную культуру",
    content: "Краткое руководство по корпоративным ценностям и стандартам.",
    link: "#",
  },
  // ... другие ресурсы
];

const RecommendedMaterialCard: React.FC = () => {
  return (
    <ProCard
      title='Рекомендуемый материал'
      headStyle={{ marginBottom: 14 }}
      className='ml-5 bg-transparent'
    >
      <ProCard
        ghost
        bordered
        className='h-[425px] flex items-center justify-center border p-0'
      >
        {resources.length > 0 ? (
          <Carousel autoplay className='w-full h-full'>
            {resources.map((resource, index) => (
              <div
                key={index}
                className='flex flex-col items-center justify-center h-full p-4'
              >
                <h3 className='text-lg font-semibold'>{resource.title}</h3>
                <p className='mb-4 text-sm text-gray-600'>{resource.content}</p>
                <Link
                  href={resource.link}
                  className='text-blue-600 hover:underline'
                >
                  Узнать больше <ArrowRightOutlined />
                </Link>
              </div>
            ))}
          </Carousel>
        ) : (
          <Empty description='Нет доступных ресурсов' />
        )}
      </ProCard>
    </ProCard>
  );
};

export default RecommendedMaterialCard;
