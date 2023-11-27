import axios from "../utils/axios";

export const updateDepartment = (req: { id?: string; data }) => {
  const { id, data } = req;
  if (id) {
    return axios.put(`/departments/${id}`, { data });
  }
  return axios.post(`/departments`, { data });
};

export const fetchDepartment = (id?: string) =>
  axios.get(`departments/${id}?populate=*`);
