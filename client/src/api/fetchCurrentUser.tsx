// utils
import axios from "src/utils/axios";
import { User } from "~types";

const fetchCurrentUser = async (): Promise<User> => {
  const { data } = await axios.get("users/me?populate=*");

  return { data };
};

export default fetchCurrentUser;
