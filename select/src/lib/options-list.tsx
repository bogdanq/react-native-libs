import React from "react";
import { OptionsListProps, Options } from "./typings";

export const OptionsList = ({
  options,
  handleChange,
  selectedOption,
  toggleSelect
}: OptionsListProps) => {
  const [filtredOptions, setFiltredOptions] = React.useState<Options>([]);

  React.useEffect(() => {
    setFiltredOptions(options);
  }, [options]);

  const onChangeInput = React.useCallback(
    option => {
      toggleSelect();
      handleChange(option);
    },
    [handleChange, toggleSelect]
  );

  const handleFilterOptions = (value: string) => {
    const result =
      options &&
      options.filter(item => {
        return item.label.toLowerCase().includes(value.toLowerCase());
      });

    setFiltredOptions(result);
  };

  return (
    <div
      style={{
        border: "1px solid green",
        width: "200px",
        height: "300px",
        position: "absolute",
        bottom: "-300px",
        background: "#fff",
        overflow: "scroll",
        zIndex: 999
      }}
    >
      <input
        style={{ height: 25, padding: "0 15px", width: "140px" }}
        onChange={({ target }) => handleFilterOptions(target.value)}
        placeholder="Search..."
      />
      {filtredOptions &&
        filtredOptions.map(item => (
          <h3
            style={{
              color:
                (selectedOption && selectedOption.id) ===
                (item.value && item.value.id)
                  ? "red"
                  : "#000"
            }}
            onClick={() => onChangeInput(item.value)}
            key={item.label}
          >
            {item.label}
          </h3>
        ))}
    </div>
  );
};
