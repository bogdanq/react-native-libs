import React from "react";
import { Text } from "react-native";
import { OptionsWrapperProps } from "../types";
import { Modal } from "context-react-modal";

export const MyModal = ({
  state,
  onChangeOption,
  ...rest
}: OptionsWrapperProps) => {
  return (
    <Modal
      style={{
        ...optionsWrapperStyle
      }}
      {...rest}
    >
      {({ closeModal }) => {
        return (
          state.filtredOptions &&
          state.filtredOptions.map((item, index) => (
            <Text
              key={index}
              style={{
                ...optionsItemStyle,
                background:
                  state.activeOption &&
                  state.activeOption.id === item.value.id &&
                  "red"
              }}
              onClick={() => {
                onChangeOption(item.value);
                closeModal();
              }}
            >
              {item.label}
            </Text>
          ))
        );
      }}
    </Modal>
  );
};

const optionsWrapperStyle = {
  height: 300,
  borderWidth: 1,
  borderColor: "gray"
};

const optionsItemStyle: any = {
  borderWidth: 1,
  borderColor: "green",
  height: 30,
  textAlign: "left",
  display: "flex",
  alignItems: "center"
};
