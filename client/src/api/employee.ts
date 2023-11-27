import axios from "../utils/axios";

export const fetchEmployee = (id?: string | number) => () =>
  axios.get(`/users/${id}?populate=*`);

export const fetchManagers = () => axios.get("/users");

export const postEmployee = (req: { id?: number | string; data }) => {
  const { id, data } = req;
  if (id) {
    return axios.put(`/users/${id}`, data);
  }
  return axios.post("/users", data);
};
