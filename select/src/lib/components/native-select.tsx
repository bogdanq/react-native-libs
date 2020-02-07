import * as React from "react";
import { Payload, State, SelectProps } from "../types";
import { OptionsWrapper } from "./options-wrapper";
import { Select as SelectComponent } from "./select";

const reducer = (state: State, payload: Payload) => {
  switch (payload.type) {
    case "SET_OPTIONS_LIST":
      return {
        ...state,
        options: payload.options,
        activeOption: payload.value
      };
    case "CHANGE_OPTION":
      return {
        ...state,
        activeOption: payload.value
      };
    case "SEARCH_OPTION":
      return {
        ...state,
        options: state.options
      };
    default:
      return state;
  }
};

export const NativeSelect = ({
  options,
  value,
  handleChange,
  isRequired,
  renderItems,
  ...rest
}: SelectProps) => {
  const [isOpen, toggle] = React.useReducer(prev => !prev, false);
  const [state, dispatch] = React.useReducer(reducer, {
    options: null,
    activeOption: null
  });

  const onChangeOption = React.useCallback(
    value => {
      if (value !== state.activeOption) {
        dispatch({ type: "CHANGE_OPTION", value });
        handleChange(value);
      }
    },
    [handleChange, state.activeOption]
  );

  React.useEffect(() => {
    dispatch({ type: "SET_OPTIONS_LIST", options, value });
  }, [options, value, isRequired]);

  React.useEffect(() => {
    if (isRequired && options) {
      onChangeOption(options[0].value);
    }
  }, [options]);

  return (
    <div style={wrapperStyle}>
      <SelectComponent
        {...rest}
        dispatch={dispatch}
        toggle={toggle}
        state={state}
        onChangeOption={onChangeOption}
      />
      {renderItems ? (
        renderItems({
          options: state.options,
          isOpen,
          toggle,
          onChangeOption: props => {
            toggle();
            onChangeOption(props);
          },
          activeOption: state.activeOption
        })
      ) : (
        <OptionsWrapper
          {...rest}
          isOpen={isOpen}
          onChangeOption={props => {
            toggle();
            onChangeOption(props);
          }}
          state={state}
        />
      )}
    </div>
  );
};

const wrapperStyle: any = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};
