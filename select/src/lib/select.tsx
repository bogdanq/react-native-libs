import React from "react";
import { OptionsList } from "./options-list";
import { Select } from "./typings";

export const NativeSelect = ({
  options,
  value,
  handleChange,
  placeholder,
  label,
  isLoading,
  disabled,
  isClearable
}: Select) => {
  const [selectIsOpen, toggleSelect] = React.useReducer(prev => !prev, false);

  return isLoading ? (
    <div
      style={{
        border: "1px solid red",
        width: "200px",
        height: "50px",
        position: "relative"
      }}
    >
      <h3>loading...</h3>
    </div>
  ) : (
    <>
      {label}
      <div
        style={{
          border: "1px solid red",
          width: "200px",
          height: "50px",
          position: "relative"
        }}
      >
        {value ? value.name : placeholder}
        <button onClick={toggleSelect}>open</button>
        {isClearable && (
          <button onClick={() => handleChange(null)}>remove</button>
        )}
        {selectIsOpen && (
          <OptionsList
            options={options}
            handleChange={handleChange}
            selectedOption={value}
            toggleSelect={toggleSelect}
          />
        )}
      </div>
    </>
  );
};
