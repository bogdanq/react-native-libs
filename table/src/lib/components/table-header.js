import React from "react";

export const TableHeader = ({
  columns,
  dispatch,
  state,
  renderSettings,
  isVisibleSubComponent
}) => {
  return (
    <div className="table-header">
      {typeof renderSettings === "function" &&
        isVisibleSubComponent &&
        renderSettings()}
      {columns.map(item => {
        return (
          <div
            onClick={() => {
              dispatch({
                type: "SORTED_DATA",
                name: item.accessor
              });
            }}
            key={item.Header}
            className={`table-header__item table-header__item-sort ${state
              .sorted.field === item.accessor && "table-header__item-sort__"}${
              state.sorted.direction
            }`}
            style={{
              width: item.width ? `${item.width}px` : "100%"
            }}
          >
            {item.Header}
          </div>
        );
      })}
    </div>
  );
};
