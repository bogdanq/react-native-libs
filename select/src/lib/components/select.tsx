import React from "react";
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
    return disabled ? () => null : toggleSelect();
  }, [disabled, toggleSelect]);

  const selectName = React.useMemo(() => {
    return !state.activeOption
      ? placeholder
        ? placeholder
        : "Выбрать..."
      : state.activeOption.name;
  }, [state.activeOption, placeholder]);

  return (
    <>
      <h3>{label}</h3>
      <div style={selectStyle} onClick={handleToggleSelect}>
        <Search
          name={selectName}
          value={state.currentValue}
          isSearchable={isSearchable}
          disabled={disabled}
          dispatch={dispatch}
        />

        <p>{isLoading && "loading..."}</p>
        {isClearable && !isRequired && (
          <div style={indicatorStyle}>
            <Icon style={clearStyle} onClick={clearInput}>
              remove_circle
            </Icon>
          </div>
        )}

        <div style={indicatorStyle}>
          <Icon style={clearStyle}>keyboard_arrow_down</Icon>
        </div>
      </div>
    </>
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
    <input
      onChange={({ target }) =>
        dispatch({
          type: "FILTER_OPTIONS",
          text: target.value
        })
      }
      placeholder={name}
      value={value.name}
      disabled={disabled}
      style={{
        outline: "none",
        border: "none",
        fontSize: "14px",
        width: "100%"
      }}
    />
  ) : (
    <div style={textStyle}>{name}</div>
  );
};

const selectStyle = {
  border: "1px solid #a0a6ab",
  width: "250px",
  minHeight: "48px",
  cursor: "pointer",
  paddingLeft: "10px",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

const indicatorStyle = {
  alignItems: "center",
  alignSelf: "stretch",
  display: "flex",
  borderLeft: "1px solid #a0a6ab",
  padding: "0 10px"
};

const textStyle = {
  overflow: "hidden",
  alignItems: "center",
  textOverflow: "ellipsis",
  width: "100%",
  padding: "0 10px",
  textAlign: "left",
  fontSize: "14px",
  paddingLeft: 0,
  color: "gray"
};
const clearStyle = {
  color: "rgb(153, 153, 153)"
};
