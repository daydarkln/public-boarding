import axios from "../utils/axios";

const createUser = async (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return axios.post("/auth/local/register", { ...data });
};

export const updateUser = async (data: { id: string; user: any }) => {
  return axios.put(`/users/${data.id}`, { ...data.user });
};

export const fetchRoles = () => {
  return axios.get("/users-permissions/roles?populate=*");
};

export default createUser;
