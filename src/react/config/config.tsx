type ThemeType = {
  theme__primary: "1";
  theme__secondary: "2";
  theme__tertiary: "3";
};

export const themeObject: ThemeType = Object.freeze({
  theme__primary: "1",
  theme__secondary: "2",
  theme__tertiary: "3",
} as const);

export const LOCAL_STORAGE_KEY = "CalculatorThem";

export type CustomClassType = "btn--delete" | "btn--reset" | "btn--total";

type KeyType = ReadonlyArray<{
  label: string;
  customClass?: CustomClassType;
}>;

export const keys: KeyType = Object.freeze([
  { label: "7" },
  { label: "8" },
  { label: "9" },
  { label: "Del", customClass: "btn--delete" },
  { label: "4" },
  { label: "5" },
  { label: "6" },
  { label: "+" },
  { label: "1" },
  { label: "2" },
  { label: "3" },
  { label: "-" },
  { label: "." },
  { label: "0" },
  { label: "/" },
  { label: "x" },
  { label: "reset", customClass: "btn--reset" },
  { label: "=", customClass: "btn--total" },
] as const);

export type LocalstorageType = {
  className: string;
  checked: string;
} | null;
