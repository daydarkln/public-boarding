import { Rule } from "rc-field-form/lib/interface";

export const emailRules: Rule[] = [
  {
    required: true,
    message: "Пожалуйста, введите адрес электронной почты",
  },
  {
    type: "email",
    message: "Пожалуйста, введите корректный адрес электронной почты",
  },
];
