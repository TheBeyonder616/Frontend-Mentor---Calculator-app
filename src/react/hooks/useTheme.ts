import { LocalstorageType } from "../config/config";
import {
  useState,
  useEffect,
  KeyboardEvent,
  ChangeEvent,
  useCallback,
} from "react";
import Method from "../component/Method";

const useTheme = () => {
  const [theme, setTheme] = useState<LocalstorageType>(
    Method.getLocalStorageTheme
  );

  useEffect(() => {
    if (theme === null) return;

    Method.removeBodyClass();
    document.body.classList.add(theme.className);
  }, [theme, Method.removeBodyClass]);

  const handleSetTheme = useCallback((radio: HTMLInputElement): void => {
    const id = radio.getAttribute("data-theme");
    if (!id) return;

    document.body.className = id;
    setTheme({ className: id, checked: radio.value });
    Method.setLocalStorageTheme({ className: id, checked: radio.value });
  }, []);

  const onRadioChange = useCallback((e: ChangeEvent): void => {
    const radio = e.target as HTMLInputElement;
    handleSetTheme(radio);
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLLabelElement>): void => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLLabelElement;
    target.classList.add("label--active");
    handleLabelKeyDown(e);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLLabelElement>): void => {
    if (e.key !== "Enter") return;
    const target = e.target as HTMLLabelElement;
    target.classList.remove("label--active");
  };

  const handleLabelKeyDown = (e: KeyboardEvent<HTMLLabelElement>): void => {
    const label = e.target as HTMLBaseElement;
    const radio = label.querySelector(
      "input[type='radio'].radio-input"
    ) as HTMLInputElement;

    if (!radio) return;
    if (radio.checked) return;

    radio.checked = true;
    handleSetTheme(radio);
  };

  return {
    theme,
    onRadioChange,
    handleKeyDown,
    handleKeyUp,
  };
};

export default useTheme;
