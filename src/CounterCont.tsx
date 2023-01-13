import { ReactNode } from "react";
import { useCounter } from "./context/CounterContext";
import { useCounterText } from "./context/CounterContext";

type ChildrenType = {
  children: (num: number) => ReactNode;
};

const Counter = ({ children }: ChildrenType) => {
  const { count, increment, decrement, reset } = useCounter();
  const { text, color, handleTextInput, handleChangeBgColor } =
    useCounterText();

  return (
    <div style={{ backgroundColor: color }}>
      <h1>{children(count)}</h1>
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={reset}>reset</button>
      </div>
      <input type="text" onChange={handleTextInput} />
      <h2>{text}</h2>
      <input type="text" onChange={handleChangeBgColor} />
    </div>
  );
};
export default Counter;
