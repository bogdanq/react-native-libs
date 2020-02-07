import React from "react";
import "./styles.css";
import "rc-pagination/assets/index.css";
import { Table } from "./lib/components/table";

export const useResize = () => {
  const [currentWidth, setCurrentWidth] = React.useState(window.innerWidth);
  React.useEffect(() => {
    setCurrentWidth(window.innerWidth);
    const handleResizeCallback = () => setCurrentWidth(window.innerWidth);

    window.addEventListener("resize", handleResizeCallback);
    return () => window.removeEventListener("resize", handleResizeCallback);
  }, [setCurrentWidth]);

  const getVisibility = React.useCallback(
    media => (currentWidth < media ? false : true),
    [currentWidth]
  );

  return { currentWidth, getVisibility };
};

export default function App() {
  const { getVisibility } = useResize();
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <Table
        columns={[
          {
            Header: "Id",
            accessor: "playerId",
            width: 300,
            show: getVisibility(1000)
          },
          {
            Header: "САЙТ",
            accessor: "siteName"
          },
          {
            Header: "Победа",
            accessor: "statistic",
            show: getVisibility(2500)
          }
        ]}
        data={[
          { playerId: 102, siteName: "site 6", statistic: "Win" },
          { playerId: 10, siteName: "site 2", statistic: "Lose" },
          { playerId: 100, siteName: "site 4", statistic: "Lose" },
          { playerId: 10121, siteName: "site 3", statistic: "Lose" },
          { playerId: 1041, siteName: "site 5", statistic: "Win" },
          { playerId: 1051, siteName: "site 1", statistic: "Lose" },
          { playerId: 1071, siteName: "site 7", statistic: "Win" }
        ]}
        loading={false}
        renderLoading={() => <h1>Loading</h1>}
        renderEmpty={() => <h1>No data</h1>}
        defaultPageSize={3}
        subComponent={SubComponent}
        renderSettings={Settings}
        renderSubComponent={RenderSubComponent}
      />
    </div>
  );
}

const SubComponent = ({ item, original, isVisible, columns }) => {
  const data = React.useMemo(
    () =>
      columns.map(column => {
        const value = item[column.accessor];
        return (
          <div key={value}>
            <h3>
              {column.Header}=> {value}
            </h3>
          </div>
        );
      }),
    [columns, item]
  );

  return (
    <div
      className={`${
        isVisible ? "sub-component__open" : "sub-component__close"
      }`}
    >
      <div>{data}</div>
    </div>
  );
};

const RenderSubComponent = ({ toggle, isVisible }) => {
  return (
    <div className="table-setting-column">
      <button
        style={{ background: isVisible ? "red" : "#fff" }}
        onClick={toggle}
      >
        +
      </button>
    </div>
  );
};
const Settings = () => {
  const [isOpen, toggle] = React.useReducer(prev => !prev, false);
  return (
    <div className="table-setting-column table-setting-column__header">
      <button onClick={toggle}>open</button>
      <div
        style={{ display: isOpen ? "block" : "none" }}
        className="table-setting-options"
      >
        options
      </div>
    </div>
  );
};
