// utils
import axios from "src/utils/axios";
import { User } from "~types";

export const createNotifications = async (data: {
  title: string;
  description: string;
  user?: User;
  type: string;
}) => {
  return axios.post("notifications?populate=*", { data });
};

export const fetchNotifications = async () => {
  return axios.get("notifications?populate=*");
};
