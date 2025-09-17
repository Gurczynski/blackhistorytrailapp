import { ReactNode } from "react";
import MobileNavigation from "./MobileNavigation";

interface MobileLayoutProps {
  children: ReactNode;
}

const MobileLayout = ({ children }: MobileLayoutProps) => {
  return (
    <div className="mobile-container">
      <main className="pb-20">
        {children}
      </main>
      <MobileNavigation />
    </div>
  );
};

export default MobileLayout;