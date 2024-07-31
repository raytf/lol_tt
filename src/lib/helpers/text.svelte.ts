export function createTextTracker(textKeys: string[]) {
  const keys = textKeys;
  let index = $state(0);
  let ready = $state(false);

  function increment() {
    index++;
  }

  return {
    get finished() {
      return index >= keys.length;
    },
    get index() {
      return index;
    },
    get ready() {
      return ready;
    },
    set ready(isReady: boolean) {
      ready = isReady;
    },
    increment,
  };
}
