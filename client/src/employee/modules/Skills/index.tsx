import { ProCard, StatisticCard } from "@ant-design/pro-components";
import { Rate, Tag, Space } from "antd";
import { Pie } from "@ant-design/charts";
import { Page } from "~components";
import { useState } from "react";
import { Skills } from "src/company/modules/EmployeeStatictics/components/Skills";

const { Statistic } = StatisticCard;

const skills = [
  {
    id: 1,
    name: "Коммуникация",
    level: 3,
  },
  {
    id: 2,
    name: "Работа в команде",
    level: 4,
  },
  {
    id: 3,
    name: "Проектное управление",
    level: 2,
  },
];

const skillDistributionData = skills.map((skill) => ({
  type: skill.name,
  value: skill.level,
}));

export default () => {
  const [skillsState, setSkillsState] = useState(skills);

  const handleRateChange = (id, value) => {
    setSkillsState(
      skillsState.map((skill) =>
        skill.id === id ? { ...skill, level: value } : skill,
      ),
    );
  };

  const SkillPieChartConfig = {
    appendPadding: 10,
    data: skillDistributionData,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [{ type: "element-active" }],
  };

  return (
    <div
      id='employee-layout'
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Page title={"Тут вы можете посмотреть свои навыки"} type={"employee"}>
        <Skills />
        <ProCard bordered headerBordered>
          <Space direction='vertical' size='middle' style={{ display: "flex" }}>
            <StatisticCard>
              <Statistic
                title='Общее количество навыков'
                value={skills.length}
              />
              <Statistic
                title='Средний уровень навыков'
                value={
                  skills.reduce((acc, skill) => acc + skill.level, 0) /
                  skills.length
                }
              />
            </StatisticCard>

            <Pie {...SkillPieChartConfig} />

            {skillsState.map((skill) => (
              <ProCard key={skill.id}>
                <Space align='center'>
                  <Tag color='blue'>{skill.name}</Tag>
                  <Rate
                    onChange={(value) => handleRateChange(skill.id, value)}
                    value={skill.level}
                  />
                </Space>
              </ProCard>
            ))}
          </Space>
        </ProCard>
      </Page>
    </div>
  );
};
