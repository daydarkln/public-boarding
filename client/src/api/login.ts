// utils
import axios from "src/utils/axios";
import { LoginData, LoginResponse } from "~types";

const login = async ({
  identifier,
  password,
}: LoginData): Promise<LoginResponse> => {
  return axios.post("auth/local?populate=*", {
    identifier,
    password,
  });
};

export default login;
