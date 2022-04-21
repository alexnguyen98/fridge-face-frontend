import { useState } from 'react';

const MAX_FAILURE = 3;

export const useFailure = () => {
  const [count, setCount] = useState(MAX_FAILURE);

  const increaseFailure = () => setCount((state) => state - 1);

  return { failed: !count, increaseFailure };
};
