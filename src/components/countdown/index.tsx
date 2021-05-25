import { useEffect, useState } from 'react';

type Props = {
  seconds: number;
  expire: () => void;
};

const CountdownComponent = ({ seconds, expire }: Props) => {
  const [count, setCount] = useState(seconds);

  useEffect(() => {
    const id = setInterval(() => setCount((v) => v - 1), 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    setCount(seconds);
  }, [seconds]);

  useEffect(() => {
    if (count <= 0) {
      expire();
    }
  }, [count, expire]);

  if (count <= 0) {
    return <span>Times up!</span>;
  }

  return <span>{count}</span>;
};

export default CountdownComponent;
