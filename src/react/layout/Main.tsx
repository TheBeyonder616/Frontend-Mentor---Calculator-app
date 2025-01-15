import { MouseEvent } from "react";
import Key from "../component/Keys";
import { keys } from "../config/config";
type MainProps = {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
};

const Main = ({ handleClick }: MainProps) => {
  return (
    <main className="main">
      <div className="main__keys">
        {keys.map(({ label, customClass }) => (
          <Key key={label} onClick={handleClick} customClass={customClass}>
            {label}
          </Key>
        ))}
      </div>
    </main>
  );
};

export default Main;
