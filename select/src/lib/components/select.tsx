import React from "react";
import { State, Payload } from "../types";

type Props = {
  state: State;
  label: string;
  onChangeOption: (props: { id: number; name: string } | null) => void;
  placeholder?: string;
  disabled?: boolean;
  selectedFirst?: boolean;
  isSearchable?: boolean;
  isClearable?: boolean;
  isLoading?: boolean;
  isRequired?: boolean;
  toggle: React.DispatchWithoutAction;
  dispatch: React.Dispatch<Payload>;
};

export const Select = ({
  state,
  label,
  onChangeOption,
  placeholder,
  isClearable,
  isLoading,
  disabled,
  toggle,
  isSearchable,
  dispatch
}: Props) => {
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
      <div style={selectStyle} onClick={disabled ? () => null : toggle}>
        <Search
          name={selectName}
          isSearchable={isSearchable}
          disabled={disabled}
          dispatch={dispatch}
        />
        <p>{isLoading && "loading..."}</p>
        {isClearable && (
          <div
            style={clearStyle}
            onClick={e => {
              e.stopPropagation();
              onChangeOption(null);
            }}
          >
            clear
          </div>
        )}
        <div style={indicatorStyle}>open</div>
      </div>
    </>
  );
};

const Search = ({
  name,
  isSearchable,
  disabled,
  dispatch
}: {
  name: string;
  isSearchable?: boolean;
  disabled?: boolean;
  dispatch: React.Dispatch<Payload>;
}) => {
  return (
    <>
      <input disabled={true} value={name} style={textStyle} />
    </>
  );
};

const selectStyle = {
  border: "1px solid #a0a6ab",
  width: "250px",
  minHeight: "48px",
  cursor: "pointer",
  padding: "0 15px",
  background: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around"
};

const indicatorStyle = {
  alignItems: "center",
  alignSelf: "stretch",
  display: "flex",
  borderLeft: "1px solid #a0a6ab",
  padding: "0 15px"
};

const textStyle = {
  overflow: "hidden",
  alignItems: "center",
  textOverflow: "ellipsis",
  width: "100%"
};
const clearStyle = {
  padding: "0 10px"
};
