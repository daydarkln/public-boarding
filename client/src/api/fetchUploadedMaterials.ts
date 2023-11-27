import { UploadedFiles } from "~types";
import axios from "../utils/axios";

export default (): Promise<{ data: UploadedFiles[] }> =>
  axios.get("/upload/files");

export const fetchUploadFilesById = async (
  id: string,
): Promise<{ data: UploadedFiles }> => {
  return axios.get(`/upload/files/${id}`);
};
