// utils
import axios from "src/utils/axios";

const fetchDepartments = async () => {
  return axios.get("departments?populate=*");
};

export default fetchDepartments;
