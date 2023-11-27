import axios from "../utils/axios";
import { OnBoardingResults } from "~types";
import { message } from "antd";

export const removePlan = (id: number) =>
  axios.delete(`on-boarding-plans/${id}`);

export const fetchPlans = () => axios.get(`on-boarding-plans`);
export const fetchPlan = (id?: string) => {
  return axios.get(`on-boarding-plans/${id}`);
};

export const fetchModules = () => axios.get(`on-boarding-plan-modules`);
export const removeModule = (id: number) =>
  axios.delete(`on-boarding-plan-modules/${id}`);

export const updateModule = (id: any, payload: any) => {
  axios.put(`on-boarding-plan-modules/${id}`, payload);
};

export const manageModule =
  (id: string | undefined) => async (payload: any) => {
    if (id === undefined) {
      return axios.post("on-boarding-plan-modules", payload);
    }
    return updateModule(id, payload);
  };
export const writeActivity =
  (id: string, activity: OnBoardingResults, currentStep?: string) =>
  async (activities: OnBoardingResults[]) => {
    const response = await axios.put(`/users/${id}`, {
      onboardingResult: [...activities, activity],
      currentStep,
    });
    message.success(`Действие ${activity.title} записано`);
    return response;
  };
