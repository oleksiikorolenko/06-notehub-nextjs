
'use client';

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div>
      <h2>Download Error</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default Error;