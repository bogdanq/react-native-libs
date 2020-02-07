# react-native-libs

## Demos

[select](https://codesandbox.io/s/react-native-select-mw6uw)

[table](https://codesandbox.io/s/mobile-table-kd3ub)

## Select

## Usage Select with Formik

```jsx
const optionsList = [
  { label: "Hockey66", value: { id: 123, name: "Hockey66" } },
  { label: "Hockey55", value: { id: 1213, name: "Hockey55" } }
];

export const MyReactNativeForm = () => {
  return (
    <Formik
      initialValues={{
        label2: null,
        label: { id: 1213, name: "Hockey55" }
      }}
      onSubmit={values => console.log(values)}
    >
      {({ values, setFieldValue }) => (
        <View>
          <NativeSelect
            options={optionsList}
            isSearchable={true}
            placeholder="Selected..."
            value={values.label2}
            isClearable={true}
            label="label"
            handleChange={value => setFieldValue("label2", value)}
          />
          <NativeSelect
            options={optionsList}
            placeholder="Selected..."
            value={values.label}
            label="label2"
            handleChange={value => setFieldValue("label", value)}
          />
          <Text>{JSON.stringify(values)}</Text>
        </View>
      )}
    </Formik>
  );
};
```

## API select

|     Props      |                      Type                      | required |                                description                                 |
| :------------: | :--------------------------------------------: | :------: | :------------------------------------------------------------------------: |
|   `options`    |      Array<{ label: string; value: any}>       |   true   |                                options list                                |
|    `value`     |          { id: number; name: string }          |   true   |                                select value                                |
| `placeholder`  |                     string                     |  false   |                                                                            |
|   `disabled`   |                    boolean                     |  false   |                                                                            |
| `isSearchable` |                    boolean                     |  false   |                                                                            |
| `isClearable`  |                    boolean                     |  false   |                                                                            |
|  `isLoading`   |                    boolean                     |  false   |                                                                            |
|  `isRequired`  |                    boolean                     |  false   |                                                                            |
| `handleChange` | (value: { id: number; name: string }) => void; |   true   |                                                                            |
|    `label`     |                     string                     |   true   |                                                                            |
| `renderItems`  |                  JSX.Element                   |  false   | you can specify your component, which will be used instead of the standard |

## Table

## Usage

```jsx
const optionsList = [
  { label: "Hockey66", value: { id: 123, name: "Hockey66" } },
  { label: "Hockey55", value: { id: 1213, name: "Hockey55" } }
];

export const MyReactNativeTable = () => {
  const { getVisibility } = useResize(); // you hook
  return (
    <View>
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
        renderLoading={() => <Text>Loading</Text>}
        renderEmpty={() => <Text>No data</Text>}
        defaultPageSize={3}
        subComponent={SubComponent}
        renderSettings={Settings}
        renderSubComponent={RenderSubComponent}
      />
    </View>
  );
};
```
