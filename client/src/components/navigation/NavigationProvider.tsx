
import * as React from "react";

type NavigationContextType = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const NavigationContext = React.createContext<NavigationContextType | undefined>(
  undefined
);

export const NavigationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeTab, setActiveTab] = React.useState("home");

  return (
    <NavigationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = React.useContext(NavigationContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};
