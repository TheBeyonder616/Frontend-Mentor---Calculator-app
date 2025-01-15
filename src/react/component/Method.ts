import { LOCAL_STORAGE_KEY, LocalstorageType } from "../config/config";

export default class Method {
  // !==================================private==================================
  public static operationString(string: string): string[] {
    return string.trim().split(" ");
  }
  public static hasMinusAndDot(string: string): boolean {
    const reg = /[-.]/;
    return reg.test(string);
  }

  public static removeMinusAndDot(string: string): string {
    const newString = string.replace(/[-.]/g, "");
    return newString;
  }

  private static result(string: string): number {
    if (!string.includes(".")) return +string;

    if (string.includes(".") && string.length > 5) return +(+string).toFixed(2);

    return +string;
  }

  public static calculate([leftHand, operation, rightHand]: string[]): number {
    let result: number;
    switch (operation) {
      case "+":
        result = +leftHand + +rightHand;
        break;
      case "-":
        result = +leftHand - +rightHand;
        break;
      case "*":
        result = +leftHand * +rightHand;
        break;
      case "/":
        result = +leftHand / +rightHand;
        break;
      default:
        throw new Error("Invalid operation.");
    }
    return Method.result(result.toString());
  }

  public static isNegativeNumber = (string: string): boolean => {
    return string.startsWith("-");
  };

  public static hasSymbol(string: string): boolean {
    const symbolRex = /[+\-\/x=]/;
    return symbolRex.test(string);
  }

  public static hasDot(string: string): boolean {
    return string.includes(".");
  }

  public static isNumber(string: string): boolean {
    const numberRex = /^[0-9]+(\.[0-9]+)?$/;
    return numberRex.test(string);
  }

  public static isFunc(string: string): boolean {
    return (
      string.includes("del") || string.includes("reset") || string.includes("=")
    );
  }

  public static canCalculate(currentOperand: string): boolean {
    const arithmeticParts = Method.operationString(currentOperand);
    if (arithmeticParts.length !== 3) return false;
    const [leftHand, operation, rightHand] = arithmeticParts;

    const newLeftHand = Method.isNegativeNumber(leftHand)
      ? leftHand.slice(1)
      : leftHand;
    const newRightHand = Method.isNegativeNumber(rightHand)
      ? rightHand.slice(1)
      : rightHand;

    if (
      !Method.isNumber(newRightHand) ||
      !Method.isNumber(newLeftHand) ||
      !Method.hasSymbol(operation)
    )
      return false;

    return true;
  }

  //!======================================Theme======================================

  public static getLocalStorageTheme(): LocalstorageType {
    const item = localStorage.getItem(LOCAL_STORAGE_KEY);
    const parsedItem: LocalstorageType = item ? JSON.parse(item) : null;
    if (parsedItem === null) return null;
    return parsedItem;
  }

  public static removeBodyClass(): void {
    document.body.removeAttribute("class");
  }

  public static setLocalStorageTheme(item: LocalstorageType): void {
    if (!item) throw new Error("Invalid theme value.");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(item));
  }

  public static removeLocalStorage(): void {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  }
}
