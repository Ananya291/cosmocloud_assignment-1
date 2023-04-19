import React, { useState } from "react";
import "./Field.css";
import Switch from "@mui/material/Switch";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { fieldTypes } from "../../constants";
import { addNewField } from "../../utils";
import AddIcon from "@mui/icons-material/Add";

function Field({
  serialNumber,
  fields,
  setFields,
  currentField,
  id,
  name,
  type,
  subFields,
  isRequired,
}) {
  const [isEditEnabled, setIsEditEnabled] = useState(false);
  const [showFieldDetails, setShowFieldDetails] = useState(false);
  const [changeName, setChangeName] = useState(name);
  const [changeFieldType, setChangeFieldType] = useState(type);
  const [isRequiredField, setIsRequiredField] = useState(isRequired);

  const editFieldName = (e) => {
    if (changeName) {
      currentField.name = changeName;
      setChangeName("");
    }
    setFields([...fields]);
  };

  const onNameClick = () => {
    setIsEditEnabled(true);
  };

  const handleNameChange = (e) => {
    setChangeName(e.target.value);
  };

  const handleFieldChange = (e) => {
    setChangeFieldType(e.target.value);
    currentField.type = e.target.value;
    setFields([...fields]);
  };

  const addField = () => {
    subFields.push(addNewField());
    setFields([...fields]);
  };

  function deleteObjectById(id, data = fields) {
    for (let i = 0; i < data.length; i++) {
      const object = data[i];
      if (object.id === id) {
        data.splice(i, 1);
        setFields([...fields]);
        return true;
      } else if (object.subFields && object.subFields.length) {
        if (deleteObjectById(id, object.subFields)) {
          return true;
        }
      }
    }
    return false;
  }

  const handleRequireFieldChange = (e) => {
    setIsRequiredField(!isRequiredField);
    currentField.isRequired = !isRequiredField;
    setFields([...fields]);
  };

  return (
    <>
      <div
        className="field_container"
        onMouseOver={() => setShowFieldDetails(true)}
        onMouseLeave={() => setShowFieldDetails(false)}
      >
        <p>
          {serialNumber}
          {serialNumber && "."}
        </p>
        <div className="field_container_right">
          <div className="field_container_details">
            {isEditEnabled ? (
              <input
                value={changeName}
                onChange={handleNameChange}
                onBlur={() => {
                  editFieldName();
                  setIsEditEnabled(false);
                }}
              />
            ) : (
              <p onClick={onNameClick}>{name}</p>
            )}

            <p className="field_container_details_type">
              <select onChange={handleFieldChange} value={changeFieldType}>
                {fieldTypes.map((fieldType) => (
                  <option key={fieldType.type} value={fieldType.type}>
                    {fieldType.type}
                  </option>
                ))}
              </select>
            </p>
          </div>

          <div>
            {showFieldDetails && (
              <div className="field_container_editable_icons">
                <div className="field_container_editable__switch_icon">
                  <p>Required</p>
                  <Switch
                    checked={isRequiredField}
                    onChange={handleRequireFieldChange}
                  />
                </div>
                {type === fieldTypes[0].type && (
                  <AddIcon
                    style={{ cursor: "pointer" }}
                    onClick={() => addField(id)}
                  />
                )}
                <DeleteOutlineIcon
                  onClick={() => deleteObjectById(id, fields)}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <hr className="field_hr" />

      {subFields && (
        <div className="sub_fields_container">
          {subFields.map((subField) => (
            <Field
              key={subField.serialNumber}
              fields={fields}
              currentField={subField}
              subFields={subField.subFields}
              setFields={setFields}
              {...subField}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default Field;
