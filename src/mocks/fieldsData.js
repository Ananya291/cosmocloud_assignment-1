import { fieldTypes } from "../constants";
import { generateRandomId } from "../utils";

export const mockFieldsData = [
  {
    id: generateRandomId(),
    name: "person",
    type: fieldTypes[0].type,
    isRequired: false,
    subFields: [
      {
        id: generateRandomId(),
        name: "name",
        type: fieldTypes[0].type,
        isRequired: false,
        subFields: [
          {
            id: generateRandomId(),
            name: "firstName",
            type: fieldTypes[1].type,
            isRequired: false,
            subFields: [
              {
                id: generateRandomId(),
                name: "inside firstName",
                type: fieldTypes[0].type,
                isRequired: false,
                subFields: [],
              },
            ],
          },
          {
            id: generateRandomId(),
            name: "lastName",
            type: fieldTypes[1].type,
            isRequired: false,
            subFields: [],
          },
        ],
      },
      {
        id: generateRandomId(),
        name: "age",
        type: fieldTypes[2].type,
        isRequired: false,
        subFields: [],
      },
    ],
  },
  {
    id: generateRandomId(),
    name: "order",
    type: fieldTypes[0].type,
    isRequired: false,
    subFields: [],
  },
  {
    id: generateRandomId(),
    name: "order",
    type: fieldTypes[3].type,
    isRequired: false,
    subFields: [],
  },
];
