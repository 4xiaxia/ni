
import * as React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
}

export const GridLayout = ({ children }: GridLayoutProps) => {
  return (
    <div className="grid grid-cols-4 gap-3 h-full auto-rows-fr">
      {children}
    </div>
  );
};
