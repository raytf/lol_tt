type SM = "sm-o" | "sm-q" | "sm-h" | "sm-e" | "sm-a" | "sm-c";

interface SMStep {
  titleKey: string;
  description: string;
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
  actionKey?: string;
  measuring?: boolean;
}

type PageData = CoverPageData | TextPageData | TablePageData;

interface CoverPageData {
  type: "cover";
}

interface TextPageData {
  type: "text";
  titleKey: string;
  lines: string[];
  delimiter?: string;
}

interface TablePageData {
  type: "table";
  titleKey: string;
  header: string[];
  rows: string[][];
}
