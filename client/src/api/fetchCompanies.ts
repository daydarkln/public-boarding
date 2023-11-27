// utils
import axios from "src/utils/axios";

const fetchCompanies = async () => {
  return axios.get("companies?populate=*");
};

export default fetchCompanies;
