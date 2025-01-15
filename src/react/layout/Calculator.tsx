import Header from "./Header";
import Main from "./Main";
import Screen from "../component/Screen";
import useCalculator from "../hooks/useCalculator";

const Calculator = () => {
  const { currentOperand, previousOperand, handleClick } = useCalculator();
  return (
    <div className="calculator">
      <Header>
        <Screen topValue={previousOperand} bottomValue={currentOperand} />
      </Header>
      <Main handleClick={handleClick} />
    </div>
  );
};

export default Calculator;
