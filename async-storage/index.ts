import React from "react";

const store: any = {
  key1: "pincode",
  key2: "show alert",
  key3: "touch - false"
};

const wait = (timer: number, data: string): Promise<string | [string]> =>
  new Promise(resolve => setTimeout(() => resolve(store[data]), timer));

const AsyncStorage = (
  timer: number,
  name: string,
  data?: string
): Promise<string | [string]> => {
  const str = `update value: ${data} => key: ${name}`;
  return new Promise((resolve, rej) => setTimeout(() => resolve(str), timer));
};

type State = {
  loading: boolean;
  error?: string | null;
  data?: string | [string] | (string | [string])[] | null;
  prevValue?: string | null;
};
type Payload = {
  type: string;
  prevValue?: string;
  data?: string | [string] | (string | [string])[];
  error?: string;
};

const reducer = (state: State, payload: Payload) => {
  switch (payload.type) {
    case "GET_STORAGE_DATA_START":
      return {
        ...state,
        loading: true,
        prevValue: payload.prevValue
      };
    case "GET_STORAGE_DATA_SUCCESS":
      return {
        ...state,
        data: payload.data,
        loading: false
      };
    case "GET_STORAGE_DATA_FAULURE":
      return {
        ...state,
        error: payload.error,
        loading: false
      };
    default:
      return state;
  }
};

/**
 * хук для того, что бы достать данные из храенилища
 */
const useAsyncStorage = (args: string[]) => {
  const [state, dispatch] = React.useReducer(reducer, {
    loading: true,
    error: null,
    data: null,
    prevValue: null
  });

  React.useEffect(() => {
    dispatch({ type: "GET_STORAGE_DATA_START" });

    Promise.all(
      args.map(item => {
        return wait(2000, item);
      })
    )
      .then(res => {
        console.log(res);
        dispatch({ type: "GET_STORAGE_DATA_SUCCESS", data: res });
      })
      .catch(error =>
        dispatch({
          type: "GET_STORAGE_DATA_FAULURE",
          error: "Произошла ошибка"
        })
      );
  }, []);

  return state;
};

const eitherString = (
  params?: string | React.MouseEvent<HTMLButtonElement, MouseEvent>,
  value?: string
) => {
  if (typeof params === "string") {
    return params;
  }
  return value;
};

/**
 * хук для того, что бы записать данные в хранилище
 */
type Variables = {
  onSuccess?: () => void;
  value?: string;
  onError?: () => void;
};

type Result = [
  (params?: string | React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  State
];

const useSetAsyncStorage = (name: string, variables: Variables): Result => {
  const { onSuccess, value, onError } = variables;
  const [state, dispatch] = React.useReducer(reducer, {
    loading: false,
    error: null,
    data: null,
    prevValue: null
  });

  const setStorage = React.useCallback(
    (params?: string | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const newValue = eitherString(params, value);
      if (state.prevValue !== newValue) {
        dispatch({ type: "GET_STORAGE_DATA_START", prevValue: newValue });

        AsyncStorage(500, name, newValue)
          .then(res => {
            dispatch({ type: "GET_STORAGE_DATA_SUCCESS", data: res });
            onSuccess && onSuccess();
          })
          .catch(error => {
            dispatch({
              type: "GET_STORAGE_DATA_FAULURE",
              error: "Произошла ошибка"
            });
            onError && onError();
          });
      }
    },
    [name, value, state.prevValue, onSuccess, onError]
  );

  return [setStorage, state];
};

export { useSetAsyncStorage, useAsyncStorage };
