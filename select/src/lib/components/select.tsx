import React from "react";
import { TextInput, Text, View } from "react-native";
import { Payload, SelectProps } from "../types";
import Icon from "@material-ui/core/Icon";

export const Select = ({
  state,
  label,
  placeholder,
  isClearable,
  isLoading,
  disabled,
  isSearchable,
  isRequired,
  dispatch,
  clearInput,
  toggleSelect
}: SelectProps) => {
  const handleToggleSelect = React.useCallback(() => {
    return disabled ? () => null : toggleSelect({ isOpen: !state.isOpen });
  }, [disabled, toggleSelect, state.isOpen]);

  const selectName = React.useMemo(() => {
    return !state.activeOption
      ? placeholder
        ? placeholder
        : "Выбрать..."
      : state.activeOption.name;
  }, [state.activeOption, placeholder]);

  return (
    <View>
      <Text>{label}</Text>
      <View style={selectStyle} onClick={handleToggleSelect}>
        <Search
          name={selectName}
          value={state.currentValue}
          isSearchable={isSearchable}
          disabled={disabled}
          dispatch={dispatch}
        />

        <Text>{isLoading && "loading..."}</Text>
        {isClearable && !isRequired && (
          <View style={indicatorStyle}>
            <Icon style={clearStyle} onClick={clearInput}>
              remove_circle
            </Icon>
          </View>
        )}

        <View style={indicatorStyle}>
          <Icon style={clearStyle}>keyboard_arrow_down</Icon>
        </View>
      </View>
    </View>
  );
};

const Search = ({
  name,
  isSearchable,
  disabled,
  dispatch,
  value
}: {
  name: string;
  isSearchable?: boolean;
  disabled?: boolean;
  value: { name: string; id?: number | undefined };
  dispatch: React.Dispatch<Payload>;
}) => {
  return isSearchable ? (
    <TextInput
      onChangeText={text =>
        dispatch({
          type: "FILTER_OPTIONS",
          text
        })
      }
      // placeholder={name}
      value={value.name}
      // disabled={disabled}
      style={{
        fontSize: 14,
        width: "100%"
      }}
    />
  ) : (
    <Text style={textStyle}>{name}</Text>
  );
};

const selectStyle = {
  borderWidth: 1,
  borderColor: "#a0a6ab",
  width: 250,
  minHeight: 48,
  paddingLeft: "10px",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const indicatorStyle = {
  alignItems: "center",
  display: "flex",
  borderWidth: 1,
  borderColor: "#a0a6ab",
  paddingHorizontal: 10
};

const textStyle = {
  overflow: "hidden",
  alignItems: "center",
  width: "100%",
  paddingHorizontal: 10,
  textAlign: "left",
  fontSize: 14,
  paddingLeft: 0,
  color: "gray"
};
const clearStyle = {
  color: "rgb(153, 153, 153)"
};
