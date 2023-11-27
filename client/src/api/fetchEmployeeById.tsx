// utils
import axios from "src/utils/axios";
import { Employee } from "~types";

const fetchEmployeeById = async (
  id: string,
): Promise<{ data: { data: { attributes: Employee } } }> => {
  return axios.get(`/employees/${id}?populate=*`);
};

export default fetchEmployeeById;
