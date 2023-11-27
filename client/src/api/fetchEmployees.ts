// utils
import axios from "src/utils/axios";
import { Employee } from "~types";

const fetchEmployees = async (): Promise<{
  data: { data: { attributes: Employee }[] };
}> => {
  return axios.get("users?populate=*");
};

export default fetchEmployees;
