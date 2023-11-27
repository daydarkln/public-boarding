// utils
import axios from "src/utils/axios";

export const createMeetUps = async (data: {
  title: string;
  description: string;
  date: string;
  link: string;
}) => {
  return axios.post("meet-ups?populate=*", { data });
};

export const fetchMeetUps = async () => {
  return axios.get("meet-ups?populate=*");
};
