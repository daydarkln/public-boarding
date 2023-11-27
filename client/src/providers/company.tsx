import { createContext, ReactNode } from "react";

export type CompanyContext = {};

export const CompanyContext = createContext<CompanyContext>({});

export interface CompanyProviderProps {
  children: ReactNode;
}

const CompanyProvider: React.FC<CompanyProviderProps> = (props) => {
  const { children } = props;

  return (
    <CompanyContext.Provider value={{}}>{children}</CompanyContext.Provider>
  );
};

export default CompanyProvider;
