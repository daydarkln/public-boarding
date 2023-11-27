import axios from "../utils/axios";

const createCompany = async (data: {
  email: string;
  password: string;
  address: string;
  phone: string;
  logo: string;
  employees: string[];
  departments: string[];
  on_boarding_result: string;
  title: string;
}) => {
  return axios.post("/companies", { data });
};
export const createDepartment = async (data: {
  email: string;
  password: string;
  address: string;
  phone: string;
  logo: string;
  employees: string[];
  departments: string[];
  on_boarding_result: string;
  title: string;
}) => {
  return axios.post("/departments", { data });
};

export const initSpecialites = async (data: {
  name: string;
  description: string;
}) => {
  return axios.post("/specialities", { data });
};

export const initDepartment = async (data: {
  name: string;
  description: string;
}) => {
  return axios.post("/departments", { data });
};

export const initEmployees = async (data: { name: string; email: string }) => {
  return axios.post("/employees", { data });
};

export default createCompany;
