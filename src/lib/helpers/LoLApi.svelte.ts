function lol_send(messageName: string, payload: Object) {
  const payloadString: string = JSON.stringify(payload);
  parent.postMessage(
    {
      message: messageName,
      payload: payloadString,
    },
    "*"
  );
}

export function gameIsReady() {
  lol_send("gameIsReady", {
    aspectRatio: "16:9",
    resolution: "1024x576",
  });
  console.log("yoyo");
}
