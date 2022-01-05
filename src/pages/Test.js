import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "../store/counter/counterSlice";

const Test = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const incrementBy = 4;

  return (
    <div>
      <div>{count}</div>
      <div>
        <button onClick={() => dispatch(increment())}>INCREMENT</button>
        <button onClick={() => dispatch(decrement())}>DECREMENT</button>
        <button onClick={() => dispatch(incrementByAmount(incrementBy))}>INCREMENT BY {incrementBy}</button>
      </div>
    </div>
  );
}

export default Test;