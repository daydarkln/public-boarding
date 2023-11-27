import { Edge, Node } from "reactflow";

export type User = {
  data: {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: false;
    blocked: false;
    createdAt: string;
    isOnBoardingPlanComplete: boolean
    updatedAt: string;
    role: {
      id: 3;
      name: "Admin" | "HR" | "Employee";
      description: string;
      type: string;
      createdAt: string;
      updatedAt: string;
    };
    company: Company;
    speciality: WorkSpeciality;
    department: Department;
    onBoardingPlan: OnBoardingPlan;
    currentStep: number;
    onboardingResult: OnBoardingResults[];
    currentStepProgress: number;
    telegram: string;
    progress: number;
    manager: User;
  };
};

export type UsefulMaterial = {
  id: string;
  title: string;
  description: string;
};

export type Department = {
  id: string;
  name: string;
  companyId: string;
};

export type WorkSpeciality = {
  id: string;
  name: string;
  description: string;
  department: Department;
};

export type Employee = {
  id: string;
  name: string;
  surname: string;
  position: string;
  email: string;
  companyId: number;
  company: { data: { attributes: Company } };
  department: { data: { attributes: Department } };
  speciality: { data: { attributes: WorkSpeciality } };
  onboardingDetails: OnboardingDetails;
  onboardingPlan: { data: { attributes: OnBoardingPlan } };
};

export type Company = {
  id: string;
  title: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  departments: Department[];
  employees: Employee[];
};

export type OnBoardingPlanModule = {
  id: string;
  title: string;
  content: string;
  availableInSpecialities: WorkSpeciality[];
};

export type OnBoardingPlan = {
  id: string;
  title: string;
  deadlineFinish: number;
  deadlineStart: number;
  description: string;
  onboardingPlanNodesEdges: { data: { edges: Node[]; nodes: Edge[] } };
  modules: OnBoardingPlanModule[];
  onboardingResult: OnBoardingResults[];
};

export type OnboardingDetails = {
  employeeId: string;
  stages: OnBoardingPlanModule[];
  currentStageId: number;
};

export type OnBoardingResults = {
  id: string;
  creationTime: string;
  action: "text" | "test";
  title: string;
};

// Тип для варианта ответа
export type Option = {
  id: number;
  text: string;
};

export type Question = {
  questionTitle: string;
  key: string;
  quizType: "text" | "single" | "multiple" | "rate";
  // Предполагается, что options является частью вопроса, если это вопросы с выбором
  options?: { key: string; text: string; isCurrect: boolean }[];
};

interface OnboardingPlan {
  attributes: {
    title: string;
    deadlineFinish: number;
  };
}

interface OnboardingResult {
  progress: number;
}

interface Manager {
  name: string;
}

export interface EmployeeAttributes {
  name: string;
  surname: string;
  email: string;
  telegram: string;
  createdAt: string;
  onboardingPlan?: {
    data: OnboardingPlan;
  };
  on_boarding_result?: {
    data: OnboardingResult;
  };
  manager?: {
    data: Manager;
  };
}
