type ScreenProps = {
  topValue: string;
  bottomValue: string;
};

const Screen = ({ topValue, bottomValue }: ScreenProps) => {
  return (
    <section className="screen" aria-live="polite">
      <div className="screen__value screen--top-container ">
        <div
          data-id="previous-operand"
          className="heading-secondary heading--screen screen--top"
        >
          {topValue}
        </div>
      </div>
      <div className="screen__value screen--bottom-container">
        <div
          data-id="current-operand"
          className="heading-secondary heading--screen screen--bottom"
        >
          {bottomValue}
        </div>
      </div>
    </section>
  );
};

export default Screen;
