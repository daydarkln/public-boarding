import { Employee } from "~types";

export const mapDataToEmployees = (data: []): Employee[] => {
  return data;
};

export const mapDataToEmployee = (data: {
  data: { attributes: Employee };
}): Employee => {
  return data.data.attributes;
};
