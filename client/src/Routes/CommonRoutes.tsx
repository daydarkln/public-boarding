import "reactflow/dist/style.css";
import { Route, Routes } from "react-router-dom";
import {
  OnBoardingPlanEditor,
  OnBoardingPlanList,
  Registration,
  Dashboard,
  Departments,
  Specialties,
  Employees,
} from "~company";

const CommonRoutes: React.FC = () => {
  return <Routes></Routes>;
};

export default CompanyRoutes;
