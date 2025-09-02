
import * as React from "react";
import { useNavigation } from "../navigation/NavigationProvider";
import { HomePage } from "../pages/HomePage";
import { KnowledgePage } from "../pages/KnowledgePage";
import { ToolsPage } from "../pages/ToolsPage";
import { TrendingPage } from "../pages/TrendingPage";

export const ContentArea = () => {
  const { activeTab } = useNavigation();

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomePage />;
      case "knowledge":
        return <KnowledgePage />;
      case "tools": // 对应 'llm&agent'
        return <ToolsPage />;
      case "trending": // 对应 'free chat'
        return <TrendingPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="flex-1 p-6 pb-24 overflow-hidden">
      <div className="h-full">{renderContent()}</div>
    </div>
  );
};
