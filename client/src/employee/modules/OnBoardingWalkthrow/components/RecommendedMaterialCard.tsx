import React from "react";
import ProCard from "@ant-design/pro-card";
import { Carousel } from "antd";
import { useQuery } from "@tanstack/react-query";
import { fetchUploadedMaterials } from "~api";

const RecommendedMaterialCard: React.FC = () => {
  const { data: uploadedFiles } = useQuery({
    queryKey: ["recomendedFilte"],
    queryFn: fetchUploadedMaterials,
  });

  return (
    <ProCard
      title='Рекомендуемый материал'
      headStyle={{ marginBottom: 14 }}
      className='ml-5 bg-transparent'
    >
      <ProCard ghost bordered className='p-0 border'>
        <Carousel autoplay dots className='overflow-hidden rounded-lg '>
          {uploadedFiles?.data?.map((material, index) => (
            <div
              key={index}
              className='flex items-center justify-center h-64 bg-white'
            >
              <div className='p-8 text-center'>
                <h3 className='mb-3 text-2xl font-bold text-gray-800'>
                  {material.name}
                </h3>
                <a
                  href={`/useful-materials/${material.id}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block px-4 py-2 mt-4 font-semibold text-white transition-colors duration-300 bg-blue-600 rounded hover:bg-blue-700'
                >
                  Изучить
                </a>
              </div>
            </div>
          ))}
        </Carousel>
      </ProCard>
    </ProCard>
  );
};

export default RecommendedMaterialCard;
