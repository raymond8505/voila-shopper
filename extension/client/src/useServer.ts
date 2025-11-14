import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
export { ReadyState } from "react-use-websocket";
export const useServer = (
  onMessage: (event: WebSocketEventMap["message"]) => void,
  url = `ws://localhost:1596`
) => {
  const { sendMessage, readyState } = useWebSocket(url, {
    onMessage,
  });

  function sendJson(obj: any) {
    sendMessage(JSON.stringify(obj));
  }

  return {
    send: sendMessage,
    sendJson,
    readyState,
  };
};
