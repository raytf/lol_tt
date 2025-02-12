type SM = "sm-o" | "sm-q" | "sm-h" | "sm-e" | "sm-a" | "sm-c";

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
  new?: boolean;
}
