import { ReactNode, useReducer, ChangeEvent } from "react";

const initState = { count: 0, text: "", color: "" };
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

const reducer = (
  state: typeof initState,
  action: ReducerAction
): typeof initState => {
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

type ChildrenType = {
  children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenType) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const increment = () => dispatch({ type: REDUCER_ACTION_TYPE.INCREMENT });
  const decrement = () => dispatch({ type: REDUCER_ACTION_TYPE.DECREMENT });
  const reset = () => dispatch({ type: REDUCER_ACTION_TYPE.RESET });
  const handleTextInput = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.NEW_INPUT,
      payload: e.target.value,
    });
  };

  const handleChangeBgColor = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.CHANGE_COLOR,
      payload: e.target.value,
    });
  };

  //   const changeColor = () => {
  //     const col = "#" + Math.floor(Math.random() * 16777215).toString(16);
  //     console.log(col);
  //   };

  return (
    <div style={{ backgroundColor: state.color ? state.color : "grey" }}>
      <h1>{children(state.count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>RESET</button>
      </div>
      <input type="text" onChange={handleTextInput} />
      <h2>{state.text}</h2>
      <input type="text" onChange={handleChangeBgColor} placeholder="color" />
      {/* <button onClick={changeColor}>COLOR</button> */}
    </div>
  );
};
export default Counter;
