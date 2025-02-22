import { useState, MouseEvent, useCallback } from "react";
import Method from "../component/Method";
import { OperandType } from "../config/config";
import { evaluate } from "mathjs";

const useCalculator = () => {
  const [currentOperand, setCurrentOperand] = useState<string>("0");
  const [previousOperand, setPreviousOperand] = useState<string>("0");
  const [leftHand, operation, rightHand] =
    Method.operationString(currentOperand);

  //!=================================[Setter]

  /**
   * ?Sets the current operand based on the input key type (numeric, function, or symbol).
   *
   * @param string - The value to be added to the current operand.
   * @param key - The type of the key (e.g., numeric, function, symbol).
   * @return void
   */
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

  //!============================================[Utility]
  /**
   * ?Handles the case where a negative sign needs to be added or prevents adding it if it already exists.
   *
   * @param text - The current operand string.
   * @param value - The value to append if the negative sign can be added.
   * @return void
   */
  const unitMinus = (text: string | undefined, value: string): void => {
    if (text?.includes("-")) return;
    if (!text || text === "0") {
      handleSetCurrentOperand(value, "numeric");
      return;
    }
  };

  /**
   * ?Handles adding a decimal point (dot) to the current operand, if applicable.
   *
   * @param string - The current string value of the operand.
   * @param text - The decimal point to be appended.
   * @return void
   */
  const unitDot = (string: string | undefined, text: string): void => {
    const initialString = string ?? "0";

    if (
      (((initialString === "0" && leftHand === "0") ||
        (initialString === "-" && leftHand === "-")) &&
        !Method.hasDot(initialString)) ||
      (((initialString === "0" && rightHand === "0") ||
        (initialString === "-" && rightHand === "-")) &&
        !Method.hasDot(initialString))
    ) {
      handleSetCurrentOperand("0" + text, "numeric");
      return;
    }

    if (string && !Method.hasDot(string)) {
      console.log(string);
      handleSetCurrentOperand(text, "numeric");
      return;
    }
  };

  //!================================================[Calculation]

  /**
   * ?Performs the calculation based on the current operand using mathjs evaluate.
   *
   * @return void
   */
  const handleCalculate = (): void => {
    if (!Method.hasSymbol(currentOperand)) return;

    if (!Method.canCalculate(currentOperand)) return;

    const expression = currentOperand.replace("x", "*");

    try {
      const result: number = evaluate(expression);
      const formattedResult: string = result.toString();
      setPreviousOperand(currentOperand);
      setCurrentOperand(formattedResult);
    } catch (error) {
      setCurrentOperand("Error");
    }
  };

  //!================================================[Operation]
  /**
   * ?Handles operations (e.g., symbols like +, -, *, etc.) based on the current operand state.
   *
   * @param value - The operation symbol or equal sign.
   * @return void
   */
  const operations = (value: string): void => {
    if (value === "=") return handleCalculate();

    if (leftHand && operation && rightHand && rightHand !== "-") {
      handleCalculate();
      handleSetCurrentOperand(value, "symbol");
      return;
    }

    if (value === "-") {
      if (leftHand === "0") unitMinus(leftHand, value);
      if (operation && rightHand === undefined) unitMinus(rightHand, value);
      return;
    }

    if (currentOperand === "0") return;

    const newLeftHand = Method.removeMinusAndDot(leftHand);

    if (
      leftHand &&
      Method.isNumber(newLeftHand) &&
      !leftHand.endsWith(".") &&
      !operation
    ) {
      handleSetCurrentOperand(value, "symbol");
    }
  };

  //!================================================[Dot]
  /**
   * ?Adds a dot to the operand (left-hand side or right-hand side).
   *
   * @param text - The dot symbol.
   * @return void
   */
  const handleDot = (text: string): void => {
    (leftHand === "0" || leftHand === "-") && unitDot(leftHand, text);
    operation && unitDot(rightHand, text);
  };

  //!================================[Function]
  /**
   * ?Handles the function keys (e.g., delete or reset).
   *
   * @param text - The function key name (e.g., "del", "reset").
   * @return void
   */
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
  /**
   * ?Handles the numeric input for the calculator.
   *
   * @param value - The numeric value (0-9).
   * @return void
   */
  const numeric = (value: string): void => {
    if (!Method.hasDot(value)) {
      handleSetCurrentOperand(value, "numeric");
      return;
    }

    if (Method.hasDot(currentOperand)) return;
    console.log(value);
    currentOperand === "0"
      ? handleSetCurrentOperand("0" + value, "numeric")
      : handleSetCurrentOperand(value, "numeric");
  };

  //!===================================[Button event]
  /**
   * ?Handles the click event for calculator buttons, determining the action based on the clicked button.
   *
   * @param e - The mouse click event on the button.
   * @return void
   */
  const handleClick = useCallback(
    (e: MouseEvent<HTMLButtonElement>): void => {
      const target = e.target as HTMLButtonElement;
      const innerText = target.innerHTML.toLowerCase().trim();

      switch (true) {
        case Method.isNumber(innerText):
          return numeric(innerText);
        case Method.hasDot(innerText):
          return handleDot(innerText);
        case Method.hasSymbol(innerText):
          return operations(innerText);
        case Method.isFunc(innerText):
          return func(innerText);
        default:
          return;
      }
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
