import { writable, get } from "svelte/store";

type WarningLevel = "warning" | "danger";
interface Warning {
  level: WarningLevel;
  text: string;
}

class InterfaceApi {
  revealWarning = $state(false);
  warningList = $state<Warning[]>([]);

  get currentLevel() {
    return this.warningList.reduce((highest, warning) => {
      if (warning.level === "danger") return "danger";
      return highest;
    }, "warning" as WarningLevel);
  }

  showWarning(warning: Warning) {
    const exists = this.warningList.some((w) => w.text === warning.text);
    if (!exists) {
      this.warningList = [...this.warningList, warning];
    }
    //console.log("show warning")
    this.revealWarning = true;
  }

  hideWarning(text: string) {
    this.warningList = this.warningList.filter((w) => w.text !== text);
    if (this.warningList.length === 0) {
      this.revealWarning = false;
    }
  }
}

export const interfaceApi = writable<InterfaceApi>(new InterfaceApi());
