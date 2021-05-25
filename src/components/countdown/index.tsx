import { useEffect, useState } from 'react';

type Props = {
  seconds: number;
  countdown: () => void;
};

const CountdownComponent = ({ seconds, countdown }: Props) => {
  const [count, setCount] = useState(() => seconds);

  useEffect(() => {
    const id = setInterval(() => setCount((v) => v - 1), 1000);
    return () => clearInterval(id);
  }, [seconds]);

  useEffect(() => {
    if (count <= 0) {
      countdown();
    }
  }, [count, countdown]);

  if (count <= 0) {
    return <span>Times up!</span>;
  }

  return <span>{count}</span>;
};

export default CountdownComponent;
