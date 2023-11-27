import axios from "../utils/axios";

export const updateSpeciality = (req: { id?: string; data }) => {
  const { id, data } = req;
  if (id) {
    return axios.put(`/specialities/${id}`, { data });
  }
  return axios.post(`/specialities`, { data });
};

export const fetchSpeciality = (id?: string) =>
  axios.get(`specialities/${id}?populate=*`);
