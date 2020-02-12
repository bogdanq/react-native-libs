import React from "react";
import "./styles.css";
import { Formik } from "formik";
import { NativeSelect } from "./lib";
import { Options } from "./lib/typings";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <MyReactNativeForm />
    </div>
  );
}

const wait = () => new Promise(res => setTimeout(res, 1500));
export const MyReactNativeForm = () => {
  const [state, setState] = React.useState<Options>(null);
  React.useEffect(() => {
    wait().then(() => setState(optionsList));
  }, []);

  return (
    <Formik
      initialValues={{
        label: null,
        label2: { id: 1213, name: "Hockey55" }
      }}
      onSubmit={values => console.log(values)}
    >
      {({ values, setFieldValue }) => (
        <>
          <p>Обычный c промисом</p>
          <NativeSelect
            options={state}
            value={values.label}
            handleChange={value => setFieldValue("label", value)}
            placeholder="Selected..."
            label="label"
            isLoading={!state}
            isClearable={true}
            disabled={!state}
          />
          <p>С начальным стейтом</p>
          <NativeSelect
            options={optionsList}
            value={values.label2}
            handleChange={value => setFieldValue("label2", value)}
            placeholder="Selected..."
            label="label"
          />
          <h3>{JSON.stringify(values)}</h3>
        </>
      )}
    </Formik>
  );
};

const optionsList = [
  { label: "Hockey66", value: { id: 123, name: "Hockey66" } },
  { label: "Hockey55", value: { id: 1213, name: "Hockey55" } },
  { label: "Hockey44", value: { id: 1243, name: "Hockey44" } },
  { label: "Hockey33", value: { id: 123789, name: "Hockey33" } },
  { label: "Hockey22", value: { id: 1523, name: "Hockey22" } },
  { label: "Hockey11", value: { id: 1723, name: "Hockey11" } },
  { label: "Hockey5", value: { id: 1293, name: "Hockey5" } },
  { label: "Hockey4", value: { id: 1203, name: "Hockey4" } },
  { label: "Hockey 12", value: { id: 1123, name: "Hockey 12" } },
  { label: "Hockey2", value: { id: 5123, name: "Hockey2" } },
  { label: "Hockey1", value: { id: 1823, name: "Hockey1" } }
];
