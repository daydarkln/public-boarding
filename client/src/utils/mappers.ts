import dayjs from "dayjs";
import { Response } from "../types/base/strapi";
import { RequestOptionsType } from "@ant-design/pro-components";
import { path } from "ramda";

export const moduleTypes = {
  text: "Текст",
  test: "Опрос",
};

export const mapModuleResponseToData = (module) => ({
  ...module?.attributes,
  id: module?.id,
  isNew: dayjs(module?.created_at).diff(dayjs(), "hours") < 1,
  moduleTextContent:
    module?.attributes?.moduleType === "text"
      ? module?.attributes?.moduleTypeData?.data
      : "",
  questions:
    module?.attributes?.moduleType === "test"
      ? module?.attributes?.moduleTypeData?.data
      : "",
  data: [
    {
      key: "type",
      label: "Тип",
      children: moduleTypes[module?.attributes?.moduleType],
    },
    {
      key: "deadline",
      label: "Продолжительность",
      children: module?.attributes?.duration,
    },
  ],
});

export const mapEmployeeResponseToData = (response: Response<any>) => {
  const employee = response?.data;
  const company = employee?.company;
  const department = employee?.department;
  const speciality = employee?.speciality;
  const onboardingPlan = employee?.onBoardingPlan;
  const manager = employee?.manager;
  return {
    username: employee?.username || "",
    email: employee?.email || "",
    manager: {
      key: manager?.id,
      value: manager?.id,
      label: manager?.username || "",
    },
    role: {
      key: employee.role?.id,
      value: employee.role?.id,
      label: employee.role?.name || "",
    },
    company: {
      key: company?.id,
      value: company?.id,
      label: company?.title || "",
    },
    department: {
      key: department?.id,
      value: department?.id,
      label: department?.name || "",
    },
    speciality: {
      key: speciality?.id,
      value: speciality?.id,
      label: speciality?.name || "",
    },
    onboardingPlan: {
      key: onboardingPlan?.id,
      value: onboardingPlan?.id,
      label: onboardingPlan?.title || "",
    },
  };
};

export const mapResponseToSelectData = (
  response?: Response<any>,
  labelKey?: string | string[],
  data?: [],
): RequestOptionsType[] => {
  const entities = data ?? response?.data;
  if (!Array.isArray(entities)) {
    return [];
  }
  if (!labelKey) {
    return entities.map((item) => ({
      key: item.id,
      value: item.id,
      label: item.attributes.title,
    }));
  }
  if (typeof labelKey === "string") {
    return entities.map((item) => ({
      key: item.id,
      value: item.id,
      label: item[labelKey],
    }));
  }
  if (Array.isArray(labelKey)) {
    return entities.map((item) => ({
      key: item.id,
      value: item.id,
      label: path(labelKey, item),
    }));
  }
};

export const mapDepartmetsResponseToData = (response: Response<any>) => {
  const departmets = response?.data?.data;
  if (Array.isArray(departmets)) {
    return departmets.map((department, index) => ({
      key: department?.id,
      index,
      name: department.attributes.name,
      description: department.attributes.description,
      specialities: department.attributes.specialities.data.map(
        (s) => s.attributes.name,
      ),
    }));
  }
  return {
    key: departmets?.id,
    name: departmets?.attributes?.name,
    description: departmets?.attributes?.description,
    specialities: departmets?.attributes?.specialities?.data.map(
      (s) => s.attributes.name,
    ),
  };
};

export const mapSpecialitiesResponseToData = (response: Response<any>) => {
  const specialities = response?.data?.data;
  if (Array.isArray(specialities)) {
    const data = specialities.map((speciality) => ({
      id: speciality.id,
      title: speciality.attributes.name,
      description: speciality.attributes.description,
      employees: speciality.attributes.employees.data.map((e) =>
        [e.attributes.name, e.attributes.surname].join(" "),
      ),
    }));
    return data;
  }
  return {
    key: specialities?.id,
    name: specialities?.attributes?.name,
    description: specialities?.attributes?.description,
    employees: specialities?.attributes?.employees?.data.map(
      (s) => s.attributes.username,
    ),
  };
};

export const getProgress = (currentStep: number, moduleLength: number) => {
  const step =
    currentStep === 0 ? Number(currentStep) + 1 : Number(currentStep);
  return Math.round((100 / moduleLength) * step) / 100;
};
