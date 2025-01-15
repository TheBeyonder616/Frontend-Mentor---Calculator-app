import { themeObject } from "../config/config";
import useTheme from "../hooks/useTheme";

const Control = () => {
  const { onRadioChange, handleKeyDown, handleKeyUp, theme } = useTheme();
  return (
    <div className="theme__input">
      {Object.entries(themeObject).map(([key, value]) => {
        const themeName = key.replace("__", "--");

        return (
          <label
            tabIndex={0}
            key={key}
            htmlFor={key}
            onKeyDown={handleKeyDown}
            className="radio-label"
            onKeyUp={handleKeyUp}
          >
            <h2 className="heading-secondary heading--label">{value}</h2>

            <input
              className={`radio-input ${themeName}`}
              type="radio"
              id={key}
              name="theme"
              value={value}
              onChange={onRadioChange}
              data-theme={themeName}
              checked={theme?.checked === value}
            />
          </label>
        );
      })}
    </div>
  );
};

export default Control;
