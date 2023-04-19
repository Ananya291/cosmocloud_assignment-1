import { fieldTypes } from "../constants";

export const generateRandomId = () => {
  return Math.random().toString(16).slice(2);
};

export const addNewField = () => {
  return {
    id: generateRandomId(),
    name: "Add name",
    type: fieldTypes[3].type,
    isRequired: false,
    subFields: [],
  };
};
