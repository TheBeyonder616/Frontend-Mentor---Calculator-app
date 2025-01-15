import { ButtonHTMLAttributes, ReactNode, KeyboardEvent } from "react";
import { CustomClassType } from "../config/config";
import { useMemo } from "react";
type KeysProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  customClass?: CustomClassType;
  children?: ReactNode;
};

const Key = ({ customClass, children, ...props }: KeysProps) => {
  const buttonClass = useMemo(
    () => customClass || "btn--primary",
    [customClass]
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLButtonElement;
    target.classList.add("btn--active");
  };
  const handleKeyUp = (e: KeyboardEvent<HTMLButtonElement>): void => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLButtonElement;
    target.classList.remove("btn--active");
  };
  return (
    <button
      className={`btn ${buttonClass}`}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      aria-label={` Calculator button for ${children}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Key;
