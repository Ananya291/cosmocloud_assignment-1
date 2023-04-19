import { useState } from "react";
import "./App.css";
import Field from "./components/Field/Field";
import AddIcon from "@mui/icons-material/Add";
import { addNewField } from "./utils";
import { mockFieldsData } from "./mocks/fieldsData";
import Button from "./common/Button/Button";

function App() {
  const [fields, setFields] = useState(mockFieldsData);
  const [showUpdationGraphically, setShowUpdationGraphically] = useState(false);

  const addField = () => {
    setFields([...fields, addNewField()]);
  };

  const showData = () => {
    console.log("fieldsfields", fields);
  };

  const handleShowGraphicalUpdation = () => {
    setShowUpdationGraphically(!showUpdationGraphically);
  };

  return (
    <div className="app_container">
      <div className="app">
        <div className="title_container">
          <p>Field name and type</p>
          <AddIcon style={{ cursor: "pointer" }} onClick={addField} />
        </div>

        {fields.map((field, key) => (
          <Field
            key={field.id}
            serialNumber={key + 1}
            fields={fields}
            setFields={setFields}
            currentField={field}
            id={field.id}
            name={field.name}
            type={field.type}
            subFields={field.subFields}
            isRequired={field.isRequired}
          />
        ))}

        <div className="save_button_container">
          <Button buttonText="Save" onClick={showData} />
        </div>
      </div>

      <div className="graphical_ui_button_container">
        <Button
          buttonText={
            showUpdationGraphically
              ? "Hide JSON"
              : "Click to see JSON here instead of console?"
          }
          onClick={handleShowGraphicalUpdation}
        />
      </div>

      <div className="graphical_ui_text_container">
        {showUpdationGraphically && <p>{JSON.stringify(fields)}</p>}
      </div>
    </div>
  );
}

export default App;
