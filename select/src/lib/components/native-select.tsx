import * as React from "react";
import { Payload, State, NativeSelectProps, Options } from "../types";
import { OptionsWrapper } from "./options-wrapper";
import { Select as SelectComponent } from "./select";
import { useOnClickOutside } from "../use-outside-click";

const reducer = (state: State, payload: Payload) => {
  switch (payload.type) {
    case "SET_OPTIONS_LIST":
      return {
        ...state,
        options: payload.options,
        filtredOptions: payload.options,
        activeOption: payload.value
      };
    case "CHANGE_OPTION":
      return {
        ...state,
        activeOption: payload.value,
        currentValue: payload.value ? payload.value : { name: "" },
        filtredOptions: state.options
      };
    case "FILTER_OPTIONS":
      return {
        ...state,
        currentValue: { name: payload.text },
        filtredOptions: filterOptions(state.options, payload.text)
      };
    case "CLEAR_INPUT":
      return {
        ...state,
        currentValue: { name: "" },
        filtredOptions: state.options,
        activeOption: null
      };
    case "TOGGLE_SELECT":
      return {
        ...state,
        currentValue:
          checkInputText && state.activeOption
            ? { name: state.activeOption.name }
            : { name: "" },
        filtredOptions: state.options,
        isOpen: !state.isOpen
      };
    default:
      return state;
  }
};

const checkInputText = (options?: Options, text?: string) => {
  const result = filterOptions(options, text);
  return result.length > 0;
};

const filterOptions = (options?: Options, text?: string) => {
  const filtredOptions =
    options &&
    options.filter(item => {
      return item.label.toLowerCase().includes((text || "").toLowerCase());
    });

  return filtredOptions && filtredOptions.length > 0 ? filtredOptions : [];
};

export const NativeSelect = ({
  options,
  value,
  handleChange,
  isRequired,
  renderItems,
  ...rest
}: NativeSelectProps) => {
  const ref = React.useRef(null);
  const [state, dispatch] = React.useReducer(reducer, {
    options: null,
    filtredOptions: null,
    activeOption: null,
    currentValue: { name: "" },
    isOpen: false
  });

  const toggleSelect = React.useCallback(() => {
    dispatch({ type: "TOGGLE_SELECT" });
  }, []);

  const onChangeOption = React.useCallback(
    value => {
      if (value !== state.activeOption) {
        dispatch({ type: "CHANGE_OPTION", value });
        handleChange(value);
      }
    },
    [handleChange, state.activeOption]
  );

  const clearInput = React.useCallback(() => {
    dispatch({ type: "CLEAR_INPUT" });
    handleChange(null);
  }, [handleChange]);

  useOnClickOutside(ref ? ref : null, toggleSelect);

  React.useEffect(() => {
    // этот еффект должен отработать только при первом рендере
    // onChangeOption - при каждом апдейте activeOption - будет новая ссылка
    // и еффект тригернется заново
    dispatch({ type: "SET_OPTIONS_LIST", options, value });
    if (isRequired && options) {
      onChangeOption(options[0].value);
    }
  }, [options]);

  return (
    <div style={wrapperStyle}>
      <div ref={state.isOpen ? ref : null}>
        <SelectComponent
          {...rest}
          dispatch={dispatch}
          state={state}
          isRequired={isRequired}
          clearInput={clearInput}
          toggleSelect={toggleSelect}
        />

        <OptionsWrapper
          {...rest}
          isOpen={state.isOpen}
          onChangeOption={props => {
            toggleSelect();
            onChangeOption(props);
          }}
          state={state}
        />
      </div>
    </div>
  );
};

const wrapperStyle: any = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
};
