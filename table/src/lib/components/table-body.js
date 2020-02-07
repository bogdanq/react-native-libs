import React from "react";

export const TableBody = ({ state, columns, renderEmpty, ...rest }) => {
  return state.length === 0
    ? renderEmpty()
    : state.map((data, index) => {
        return (
          <TableBodyItem
            key={hash(data)}
            columns={columns}
            data={data}
            {...rest}
          />
        );
      });
};

const hash = (data, index) => {
  return JSON.stringify(data) + index;
};

const TableBodyItem = ({ columns, data, original, ...rest }) => {
  const [isVisible, toggle] = React.useReducer(prev => !prev, false);
  const { isVisibleSubComponent, subComponent, renderSubComponent } = rest;
  return (
    <div>
      <div className="table-body">
        {typeof renderSubComponent === "function" &&
          isVisibleSubComponent &&
          renderSubComponent({ toggle, isVisible })}
        {columns.map((item, index) => {
          return (
            <div
              key={index}
              className="table-body__item"
              style={{ width: item.width ? `${item.width}px` : "100%" }}
            >
              {data[item.accessor]}
            </div>
          );
        })}
      </div>
      {typeof subComponent === "function" &&
        subComponent({ item: data, isVisible, original })}
    </div>
  );
};
