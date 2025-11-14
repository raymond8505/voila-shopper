import { useEffect, useRef, useState } from "react";
import { useServer } from "../useServer";

export const App = () => {
  const [groupToken, setGroupToken] = useState("group id");
  const groupField = useRef<HTMLInputElement>(null);

  const { sendJson } = useServer((msgEvent) => {
    const msg = JSON.parse(msgEvent.data);

    switch (msg.action) {
      case "group-created":
        setGroupToken(msg.data.groupToken);
        break;
      case "new-user-joined":
        console.log(msg);
        break;
    }
  });

  useEffect(() => {
    sendJson({
      action: "greeting",
      data: "hello",
    });
  }, []);
  return (
    <>
      <button
        onClick={() => {
          sendJson({ action: "create-group" });
        }}
      >
        create group
      </button>
      <div>{groupToken}</div>
      <button
        onClick={() => {
          sendJson({
            action: "join-group",
            data: {
              groupToken: groupField.current?.value,
            },
          });
        }}
      >
        join group
      </button>
      <input type="text" ref={groupField} />
    </>
  );
};
