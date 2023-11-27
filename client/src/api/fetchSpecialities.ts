// utils
import axios from "src/utils/axios";

const fetchSpecialities = async () => {
  return axios.get("specialities?populate=*");
};

export default fetchSpecialities;
