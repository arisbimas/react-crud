import React, { useMemo, useState } from "react";

const Memo = () => {
  const [number, setNumber] = useState(0);
  const [count, setCount] = useState(0);

  const incrementNumber = () => setNumber((prev) => prev + 1);
  const incrementCount = () => setCount((prev) => prev + 1);

  const isNumberEven = () => {
    let i = 0;
    while (i < 200000000) i++;
    return number % 2 === 0;
  };

  return (
    <div className="App">
      <button onClick={incrementNumber}>number : {number}</button>
      <div>{isNumberEven() ? "even" : "odd"}</div>
      <button onClick={incrementCount}>count: {count}</button>
    </div>
  );
};

export default Memo;
