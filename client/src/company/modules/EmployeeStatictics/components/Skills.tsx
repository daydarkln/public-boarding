// @flow
import { Card, Col, Row } from "antd";
import { Charts } from "~components";

type Props = {};

export const Skills = (props: Props) => {
  const data = [
    {
      name: "FrontEnd",
      skills: [
        {
          name: "UI",
          star: 65,
        },
        {
          name: "UX",
          star: 65,
        },
        {
          name: "CSS",
          star: 65,
        },
        {
          name: "JavaScript",
          star: 65,
        },
      ],
    },
    {
      name: "BackEnd",
      skills: [
        {
          name: "Strapi",
          star: 30,
        },
        {
          name: "Python",
          star: 21,
        },
        {
          name: "Elixir",
          star: 35,
        },
        {
          name: "PhP",
          star: 78,
        },
      ],
    },
    {
      name: "Design",
      skills: [
        {
          name: "FigJam",
          star: 56,
        },
        {
          name: "Blender",
          star: 31,
        },
        {
          name: "Figma",
          star: 94,
        },
        {
          name: "Adobe",
          star: 23,
        },
      ],
    },
  ];

  return (
    <Card title={"Навыки"}>
      <Row gutter={[16, 16]}>
        {data.map((item) => (
          <Col key={item.name} span={8}>
            <Card>
              <h4>{item.name}</h4>
              <Charts.SkillsChart data={item.skills} />
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};
