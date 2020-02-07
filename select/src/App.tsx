import * as React from "react";
import { Formik } from "formik";
import { NativeSelect } from "./lib";
import "./styles.css";
import { RenderItems } from "./lib/types";

export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <MyReactNativeForm />
    </div>
  );
}

const wait = () => new Promise(res => setTimeout(res, 1500));

const SomeRenderItems = ({
  isOpen,
  onChangeOption,
  options,
  activeOption
}: RenderItems) => {
  return isOpen ? (
    <div>
      {options &&
        options.map((item, index) => (
          <p
            key={index}
            style={{
              background:
                activeOption && activeOption.id === item.value.id ? "red" : ""
            }}
            onClick={() => onChangeOption(item.value)}
          >
            {item.label}
          </p>
        ))}
    </div>
  ) : null;
};

export const MyReactNativeForm = () => {
  const [state, setState] = React.useState<any>(null);
  React.useEffect(() => {
    wait().then(() => setState(optionsList));
  }, []);
  return (
    <Formik
      initialValues={{
        label2: null,
        label3: null,
        label: { id: 1213, name: "Hockey55" }
      }}
      onSubmit={values => console.log(values)}
    >
      {({ values, setFieldValue }) => (
        <>
          <p>С начальным стейтом, Кастомный компонент выпадашки</p>
          <NativeSelect
            options={optionsList}
            isSearchable={true}
            placeholder="Selected..."
            value={values.label}
            isClearable={true}
            // disabled={true}
            label="label"
            handleChange={value => setFieldValue("label", value)}
            renderItems={SomeRenderItems}
          />
          <p>Без стейта</p>
          <NativeSelect
            options={optionsList}
            placeholder="Selected..."
            value={values.label2}
            label="label2"
            handleChange={value => setFieldValue("label2", value)}
          />
          <p>обязательное поле с промисом</p>
          <NativeSelect
            options={state}
            isLoading={!state}
            disabled={!state}
            isRequired={true}
            placeholder="Selected..."
            value={values.label3}
            label="label3"
            handleChange={value => setFieldValue("label3", value)}
          />
          <h3>{JSON.stringify(values)}</h3>
        </>
      )}
    </Formik>
  );
};

// handleChange
// options

const optionsList = [
  {
    label: "Baseball",
    value: {
      id: 120,
      name: "http://www.abrahamtips.com/"
    }
  },
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
