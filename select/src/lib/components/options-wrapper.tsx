import React from "react";
import { OptionsWrapperProps } from "../types";

export const OptionsWrapper = ({
  state,
  isOpen,
  onChangeOption
}: OptionsWrapperProps) => {
  return (
    <div
      style={{
        ...optionsWrapperStyle,
        display: isOpen ? "block" : "none"
      }}
    >
      {state.filtredOptions &&
        state.filtredOptions.map((item, index) => (
          <p
            key={index}
            style={{
              ...optionsItemStyle,
              background:
                state.activeOption &&
                state.activeOption.id === item.value.id &&
                "red"
            }}
            onClick={() => onChangeOption(item.value)}
          >
            {item.label}
          </p>
        ))}
    </div>
  );
};

const optionsWrapperStyle = {
  border: "1px solid gray",
  height: "300px",
  overflow: "scroll"
};

const optionsItemStyle: any = {
  border: "1px solid green",
  height: "30px",
  textAlign: "left",
  display: "flex",
  alignItems: "center"
};
