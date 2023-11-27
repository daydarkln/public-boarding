import "reactflow/dist/style.css";
import { QuizPage, QuizResult } from "~components";
import {
  Dashboard,
  UsefulMaterials,
  Skills,
  UseFullMaterialsById,
  MyOnboarding,
  Login,
  Meets,
  EmployeeProfile,
} from "~employee";
import OnBoardingWalkthrow from "../employee/modules/OnBoardingWalkthrow";

const EmployeeRoutes = [
  { path: "/employee", element: <Dashboard /> },
  { path: "/login", element: <Login /> },
  { path: "/employee-profile", element: <EmployeeProfile /> },
  { path: "/meets", element: <Meets /> },
  { path: "/results", element: <QuizResult /> },
  { path: "/quiz", element: <QuizPage /> },
  { path: "/useful-materials", element: <UsefulMaterials /> },
  { path: "/useful-materials/:id", element: <UseFullMaterialsById /> },
  { path: "/skills", element: <Skills /> },
  { path: "/my-onboarding", element: <MyOnboarding /> },
  { path: "/my-onboarding/go", element: <OnBoardingWalkthrow /> },
];

export default EmployeeRoutes;
