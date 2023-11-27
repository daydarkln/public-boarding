import { createContext, ReactNode, useEffect } from "react";
import { UsefulMaterial, User } from "~types";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { fetchCurrentUser } from "~api";

export type EmployeeContextType = {
  usefulMaterial: UsefulMaterial[];
  currentEmployee?: User | null;
  isLoading: boolean;
  hasAdminAccess: boolean;
};

const usefulMaterial = [
  {
    id: "1",
    title: "Css",
    description:
      "A style sheet language used for describing the look and formatting of a document written in HTML or XML.",
  },
  {
    id: "2",
    title: "Ant Design",
    description:
      "A design system and React UI library for building elegant and consistent user interfaces.",
  },
  {
    id: "3",
    title: "Ant Financial Experience Technology",
    description:
      "A branch of Ant Group focused on delivering innovative financial experience solutions through technology.",
  },
  {
    id: "4",
    title: "TechUI",
    description:
      "A user interface library or framework, potentially used for building web or mobile applications.",
  },
  {
    id: "5",
    title: "TechUI",
    description:
      "A user interface library or framework, potentially used for building web or mobile applications.",
  },
  {
    id: "6",
    title: "TechUI",
    description:
      "A user interface library or framework, potentially used for building web or mobile applications.",
  },
  {
    id: "7",
    title: "TechUI",
    description:
      "A user interface library or framework, potentially used for building web or mobile applications.",
  },
  {
    id: "8",
    title: "TechUI",
    description:
      "A user interface library or framework, potentially used for building web or mobile applications.",
  },
];

export const EmployeeContext = createContext<EmployeeContextType>({
  usefulMaterial: usefulMaterial,
  currentEmployee: null,
  isLoading: false,
  hasAdminAccess: false,
});

export interface EmployeeProviderProps {
  children: ReactNode;
}

const EmployeeProvider: React.FC<EmployeeProviderProps> = (props) => {
  const { children } = props;

  const {
    mutateAsync,
    data: currentEmployee,
    isPending: isLoading,
  } = useMutation({
    mutationFn: fetchCurrentUser,
  });

  useEffect(() => {
    mutateAsync();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const employee = currentEmployee;
  const hasAdminAccess = employee?.data.role?.type !== "employee";

  return (
    <EmployeeContext.Provider
      value={{
        hasAdminAccess,
        usefulMaterial,
        currentEmployee: employee,
        isLoading: isLoading,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};

export default EmployeeProvider;
