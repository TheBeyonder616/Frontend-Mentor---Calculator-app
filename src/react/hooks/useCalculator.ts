import { useState, MouseEvent, useCallback } from "react";
import Method from "../component/Method";
import { OperandType } from "../config/config";
import { evaluate } from "mathjs";

const useCalculator = () => {
  const [currentOperand, setCurrentOperand] = useState<string>("0");
  const [previousOperand, setPreviousOperand] = useState<string>("0");

  //!=================================[Setter]
  const handleSetCurrentOperand = (string: string, key: OperandType): void => {
    let value: string;
    switch (key) {
      case "function":
      case "numeric":
        value = string;
        break;
      case "symbol":
        value = string = " " + string + " ";
        break;
      default:
        break;
    }
    setCurrentOperand((prev) => (prev === "0" ? value : prev + value));
  };

  const handleCalculate = (): void => {
    if (!Method.hasSymbol(currentOperand)) return;

    if (!Method.canCalculate(currentOperand)) return;

    const expression = currentOperand.replace("x", "*");

    try {
      const result: number = evaluate(expression);
      setPreviousOperand(currentOperand);
      setCurrentOperand(String(result));
    } catch (error) {
      setCurrentOperand("Error");
    }
  };

  const unitMinus = (text: string | undefined, value: string): void => {
    if (text && text.includes("-")) return;
    if (text === "0" || text === undefined) {
      handleSetCurrentOperand(value, "numeric");
      return;
    }
  };

  const operations = (value: string): void => {
    if (value === "=") {
      handleCalculate();
      return;
    }

    const [leftHand, operation, rightHand] =
      Method.operationString(currentOperand);

    if (rightHand !== "-" && leftHand && operation && rightHand) {
      handleCalculate();
      handleSetCurrentOperand(value, "symbol");
      return;
    }

    if (value === "-") {
      leftHand === "0" && unitMinus(leftHand, value);
      operation !== undefined &&
        rightHand === undefined &&
        unitMinus(rightHand, value);
    }

    if (currentOperand === "0") return;
    const newLeftHand = Method.removeMinusAndDot(leftHand);

    let condition =
      leftHand &&
      Method.isNumber(newLeftHand) &&
      !leftHand.endsWith(".") &&
      !operation;

    if (condition) handleSetCurrentOperand(value, "symbol");
  };

  const unitDot = (string: string | undefined, text: string): void => {
    if (string === undefined) {
      handleSetCurrentOperand("0" + text, "numeric");
      return;
    }

    if ((string === "0" || string === "-") && !Method.hasDot(string)) {
      handleSetCurrentOperand("0" + text, "numeric");
      return;
    }

    if (!Method.hasDot(string)) {
      handleSetCurrentOperand(text, "numeric");
      return;
    }
  };

  const handleDot = (text: string): void => {
    const [leftHand, operation, rightHand] =
      Method.operationString(currentOperand);

    let condition = leftHand === "0" || leftHand === "-";

    condition && unitDot(leftHand, text);

    operation && unitDot(rightHand, text);
  };

  //!================================[Function]
  const func = (text: string): void => {
    switch (text) {
      case "del":
        setCurrentOperand((prev) =>
          prev.length > 1 ? prev.slice(0, -1) : "0"
        );
        break;
      case "reset":
        setCurrentOperand((prev) => (prev === "0" ? prev : "0"));
        setPreviousOperand((prev) => (prev === "0" ? prev : "0"));
        break;
      default:
        break;
    }
  };

  //!===============================[Numeric]
  const numeric = (value: string): void => {
    if (!Method.hasDot(value)) {
      handleSetCurrentOperand(value, "numeric");
      return;
    }

    if (Method.hasDot(currentOperand)) return;
    currentOperand === "0"
      ? handleSetCurrentOperand("0" + value, "numeric")
      : handleSetCurrentOperand(value, "numeric");
  };

  //!===================================[Button event]
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      const target = e.target as HTMLButtonElement;
      const innerText = target.innerHTML.toLowerCase().trim();

      if (Method.isNumber(innerText)) {
        numeric(innerText);
        return;
      }

      Method.hasDot(innerText) && handleDot(innerText);

      Method.hasSymbol(innerText) && operations(innerText);

      Method.isFunc(innerText) && func(innerText);
    },
    [currentOperand]
  );

  return {
    currentOperand,
    previousOperand,
    handleClick,
  };
};

export default useCalculator;
