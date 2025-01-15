import Control from "./Control";

const Theme = () => {
  return (
    <section className="theme">
      <h1 className="heading-primary">calc</h1>

      <div className="theme__wrapper">
        <h2 className="heading-secondary">theme</h2>

        <div className="theme__container">
          <Control />
          <div className="theme__toggle-container">
            <div className="theme__toggle"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Theme;
