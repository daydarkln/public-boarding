import "reactflow/dist/style.css";
import {
  OnBoardingPlanEditor,
  OnBoardingPlanList,
  Dashboard,
  Departments,
  Specialties,
  Employees,
} from "~company";
import OnBoardingPlanModules from "src/company/modules/OnBoardingPlanModules";
import OnBoardingPlanAddModule from "src/company/modules/OnBoardingPlanAddModule";
import EmployeeManage from "../company/modules/EmployeeManage";
import EmployeeStatictics from "../company/modules/EmployeeStatictics";
import DepartmentManage from "../company/modules/DepartmentManage";
import SpecialityManage from "../company/modules/SpecialityManage";

const companyRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/company", element: <Dashboard /> },
  { path: "/employees", element: <Employees /> },
  { path: "/employees/add", element: <EmployeeManage /> },
  { path: "/employees/:id", element: <EmployeeManage /> },
  { path: "/employee/:id", element: <EmployeeStatictics /> },
  { path: "/departments", element: <Departments /> },
  { path: "/departments/add", element: <DepartmentManage /> },
  { path: "/departments/:id", element: <DepartmentManage /> },
  { path: "/specialities", element: <Specialties /> },
  { path: "/specialities/add", element: <SpecialityManage /> },
  { path: "/specialities/:id", element: <SpecialityManage /> },
  { path: "/create-plan", element: <OnBoardingPlanEditor /> },
  { path: "/onboarding-plans/:id", element: <OnBoardingPlanEditor /> },
  { path: "/onboarding-plans/modules", element: <OnBoardingPlanModules /> },
  {
    path: "/onboarding-plans/modules/add",
    element: <OnBoardingPlanAddModule />,
  },
  {
    path: "/onboarding-plans/modules/:id",
    element: <OnBoardingPlanAddModule />,
  },
  { path: "/onboarding-plans/list", element: <OnBoardingPlanList /> },
  // Добавьте здесь любые другие маршруты...
];

export default companyRoutes;
