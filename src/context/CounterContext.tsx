import {
  createContext,
  useReducer,
  ChangeEvent,
  ReactElement,
  Children,
  useCallback,
  useContext,
} from "react";

type StateType = {
  count: number;
  text: string;
  color: string;
};

export const initState: StateType = { count: 0, text: "", color: "" };
// console.log("initState ", typeof initState);

const enum REDUCER_ACTION_TYPE {
  INCREMENT,
  DECREMENT,
  RESET,
  NEW_INPUT,
  CHANGE_COLOR,
}

type ReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload?: string;
};

const reducer = (state: StateType, action: ReducerAction): StateType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INCREMENT:
      return { ...state, count: state.count + 1 };
    case REDUCER_ACTION_TYPE.DECREMENT:
      return { ...state, count: state.count - 1 };
    case REDUCER_ACTION_TYPE.RESET:
      return { ...state, count: 0 };
    case REDUCER_ACTION_TYPE.NEW_INPUT:
      return { ...state, text: action.payload ?? "" };
    case REDUCER_ACTION_TYPE.CHANGE_COLOR:
      return { ...state, color: action.payload ?? "" };
    default:
      return state;
  }
};

const useCounterContext = (initState: StateType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const increment = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT }),
    []
  );
  const decrement = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT }),
    []
  );
  const reset = useCallback(
    () => dispatch({ type: REDUCER_ACTION_TYPE.RESET }),
    []
  );
  const handleTextInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value,
    });
  }, []);

  const handleChangeBgColor = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: REDUCER_ACTION_TYPE.CHANGE_COLOR,
        payload: e.target.value,
      });
    },
    []
  );

  return {
    state,
    increment,
    decrement,
    reset,
    handleTextInput,
    handleChangeBgColor,
  };
};
type UseCounterContextType = ReturnType<typeof useCounterContext>;

const initContextState: UseCounterContextType = {
  state: initState,
  increment: () => {},
  decrement: () => {},
  reset: () => {},
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => {},
  handleChangeBgColor: (e: ChangeEvent<HTMLInputElement>) => {},
};

export const CounterContext =
  createContext<UseCounterContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | undefined;
};

export const CounterProvider = ({
  children,
  ...initState
}: ChildrenType & StateType): ReactElement => {
  return (
    <CounterContext.Provider value={useCounterContext(initState)}>
      {children}
    </CounterContext.Provider>
  );
};

type UseCounterHookType = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};

export const useCounter = (): UseCounterHookType => {
  const {
    state: { count },
    increment,
    decrement,
    reset,
  } = useContext(CounterContext);

  return { count, increment, decrement, reset };
};

type UseCounterTextHookType = {
  text: string;
  color: string;
  handleTextInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleChangeBgColor: (e: ChangeEvent<HTMLInputElement>) => void;
};

export const useCounterText = (): UseCounterTextHookType => {
  const {
    state: { text, color },
    handleTextInput,
    handleChangeBgColor,
  } = useContext(CounterContext);
  return { text, color, handleTextInput, handleChangeBgColor };
};
