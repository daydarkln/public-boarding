import { create } from "zustand";
import { Employee, Nullable } from "~types";
import axios from "../../utils/axios";
import { mapDataToEmployee } from "./mappers";
import { QueryFunction } from "@tanstack/react-query";
import { queryClient } from "~providers";

type EmployeeState = {
  employee: Nullable<Employee>;
  employees: Array<Employee>;
  setEmployee: (employee: Employee) => void;
  getEmployee: (id: string) => Promise<void>;
  // setEmployees: (employees: Employee[]) => void;
  // getEmployees: Effect;
};

export const useEmployeeStore = create<EmployeeState>((set) => {
  const query = (
    queryFn: QueryFunction<unknown, string[], never> | undefined,
  ) => queryClient.fetchQuery({ queryKey: ["queryFn"], queryFn });
  return {
    employee: null,
    employees: [],
    setEmployee: (employee: Employee) => set({ employee }),
    getEmployee: async (id: string) => {
      const { data } = await query(() =>
        axios.get(`/employees/${id}?populate=*`),
      );
      set({ employee: mapDataToEmployee(data) });
    },
  };
});
