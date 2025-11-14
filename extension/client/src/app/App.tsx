
import { ReadyState, useServer } from "../useServer";

export const App = () => {
  const { readyState } = useServer((msg) => {
    console.log(msg);
  });

  return readyState === ReadyState.OPEN ? <></> : null;
};
