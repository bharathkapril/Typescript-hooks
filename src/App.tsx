import {
  useCallback,
  useEffect,
  useState,
  MouseEvent,
  KeyboardEvent,
  useMemo,
  useRef,
} from "react";
import "./App.css";
import Axi from "./axios";
import { CounterProvider, initState } from "./context/CounterContext";
import Counter from "./Counter";
import CounterCont from "./CounterCont";

interface User {
  id: number;
  username: string;
}

type fibFunc = (n: number) => number;
// interface fibFunc {
//   (n: number): number;
// }

const fib: fibFunc = (n) => {
  if (n < 2) return n;
  return fib(n - 1) + fib(n - 2);
};

const myNum: number = 37;

function App() {
  const [count, setCount] = useState<number>(0);
  const [users, setUsers] = useState<User[] | null>(null);

  const inpurRef = useRef<HTMLInputElement>(null);

  console.log(inpurRef.current);
  console.log(inpurRef?.current?.value);

  useEffect(() => {
    console.log("mounting");
    console.log(`Users: ${users}`);

    return () => console.log("unmounting");
  }, [users]);

  const addTwo = useCallback(
    (
      e: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>
    ): void => setCount((prev) => prev + 2),
    []
  );

  const result = useMemo<number>(() => fib(myNum), [myNum]);

  return (
    <div className="App">
      <h1>Bharath</h1>
      <h1>{count}</h1>
      <button onClick={() => setCount((prev) => prev + 1)}>Add</button>
      <button onClick={addTwo}>Add Two</button>
      <h2>{result}</h2>
      <input ref={inpurRef} type="text" />
      <Axi />
      <Counter>{(num: number) => <>Current Count: {num}</>}</Counter>
      {/* <CounterProvider>
        <CounterCont>{(num: number) => <>Current Count: {num}</>}</CounterCont>
      </CounterProvider> */}
    </div>
  );
}

export default App;
