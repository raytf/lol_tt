type SM = "sm-o" | "sm-q" | "sm-h" | "sm-e" | "sm-a" | "sm-c";

interface SMStep {
  titleKey: string;
  border: string;
  label: string;
}

type DialogKey = {
  imgSrc?: string;
  name?: string;
  text: string;
  options?: DialogOption[];
  alreadyRead?: boolean;
  italic?: boolean;
  onStart?: () => void;
  onShowOptions?: () => void;
  onProceed?: () => void;
};

type DialogOption = {
  text: string;
  nextDialog: DialogKey[];
  imgSrc?: string;
  repeat?: boolean;
  onProceed?: () => void;
};

interface StartDialogParams {
  keys: DialogKey[];
  onFinished?: () => void;
  blockInput?: boolean;
  disabledOptions?: string[];
}

interface ItemDetails {
  imgSrc: string;
  id: string;
  nameKey: string;
  descKey: string;
  upgradedDescKey?: string;
  actionKey?: string;
  measuring?: boolean;
  upgraded?: boolean;
}

type PageData =
  | TextPageData
  | TablePageData
  | CustomPageData
  | SMPageData
  | ExperimentPageData;

interface CustomPageData {
  type: "custom";
  lines: string[];
}

interface TextPageData {
  type: "text";
  titleKey: string;
  lines: string[];
  delimiter?: string;
}

interface SMPageData {
  type: "sm";
  observations: string[];
  question?: string;
  hypothesis?: string;
}

interface TableRow {
  data: string[];
  class?: string;
}

interface TablePageData {
  type: "table";
  rows: TableRow[];
  lines: string[];
}

interface ExperimentPageData {
  type: "experiment";
  showTable?: boolean;
  rows: TableRow[];
  showGraph?: boolean;
  showConclusion?: boolean;
}
