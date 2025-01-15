import Theme from "../component/Theme";
import { ReactNode, useMemo } from "react";

type HeaderProps = {
  children?: ReactNode;
};
const Header = ({ children }: HeaderProps) => {
  const memoizedTheme = useMemo(() => <Theme />, []);
  return (
    <header className="header">
      {memoizedTheme}
      {children}
    </header>
  );
};

export default Header;
