import React from "react";
import Pagination from "rc-pagination";
import { TableBody } from "./table-body";
import { TableHeader } from "./table-header";

const sliceData = ({ data, page, defaultPageSize }) => {
  const index = (page - 1) * defaultPageSize;
  return data.slice(index, defaultPageSize + index);
};

const reducer = props => (state, payload) => {
  switch (payload.type) {
    case "CHANGE_PAGE":
      return {
        ...state,
        page: payload.page,
        data: sliceData({
          data: props.data,
          page: payload.page,
          defaultPageSize: props.defaultPageSize
        })
      };
    case "SET_DATA":
      return {
        ...state,
        data: payload.data
      };
    case "SORTED_DATA":
      const name = payload.name;

      return {
        ...state,
        page: 1,
        sorted: {
          direction:
            state.sorted.direction === "asc" && state.sorted.field !== "name"
              ? "desc"
              : "asc",
          field: name
        },
        data: sliceData({
          data: props.data.sort((a, b) => {
            return state.sorted.direction === "desc"
              ? a[name] > b[name]
                ? 1
                : -1
              : a[name] > b[name]
              ? -1
              : 1;
          }),
          page: 1,
          defaultPageSize: props.defaultPageSize
        })
      };
    default:
      return state;
  }
};

export const Table = ({
  columns,
  data,
  loading,
  renderLoading,
  defaultPageSize,
  renderEmpty,
  subComponent,
  ...rest
}) => {
  const [state, dispatch] = React.useReducer(
    reducer({ data, defaultPageSize }),
    {
      page: 1,
      data: [],
      sorted: { direction: null, field: null }
    }
  );

  React.useEffect(() => {
    dispatch({ type: "SET_DATA", data });
    dispatch({ type: "CHANGE_PAGE", page: 1 });
  }, [data]);

  const updateColumns = React.useCallback(
    ({ show }) => {
      return columns
        .map(item => (item.show === false ? item : { ...item, show: true }))
        .filter(item => item.show !== show);
    },
    [columns]
  );

  return (
    <div className="table-wrapper">
      <TableHeader
        columns={updateColumns({ show: false })}
        dispatch={dispatch}
        state={state}
        isVisibleSubComponent={updateColumns({ show: true }).length > 0}
        {...rest}
      />
      {loading ? (
        renderLoading()
      ) : (
        <TableBody
          state={state.data}
          columns={updateColumns({ show: false })}
          renderEmpty={renderEmpty}
          isVisibleSubComponent={updateColumns({ show: true }).length > 0}
          subComponent={props =>
            subComponent({
              ...props,
              columns: updateColumns({ show: true })
            })
          }
          original={data}
          {...rest}
        />
      )}
      <Pagination
        total={data.length}
        itemRender={itemRender}
        pageSize={defaultPageSize}
        current={state.page}
        onChange={nextPage => dispatch({ type: "CHANGE_PAGE", page: nextPage })}
        showTitle={false}
      />
    </div>
  );
};

const itemRender = (current, type, element) => {
  if (type === "page") {
    return <div>{current}</div>;
  }
  return element;
};
