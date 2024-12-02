import { writable, get } from "svelte/store";
import { objectivesApi } from "$apis";

class RadioApi {
  onCall = () => {};
  call() {
    const objectives = get(objectivesApi);
    if (objectives.currentIs("obj_check-equipment")) {
      objectives.completeTask("task_contact-mc");
    }
    this.onCall();
  }
}

export const radioApi = writable<RadioApi>(new RadioApi());
