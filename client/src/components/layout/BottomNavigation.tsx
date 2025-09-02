
import * as React from "react";
import {
  Home,
  BookOpen,
  Cpu,
  Cloud,
} from "lucide-react";
import { useNavigation } from "../navigation/NavigationProvider";

const navItems = [
  { id: "home", label: "首页", icon: Home },
  { id: "knowledge", label: "知识库", icon: BookOpen },
  { id: "tools", label: "LLM & Agent", icon: Cpu },
  { id: "trending", label: "free chat", icon: Cloud },
];

export const BottomNavigation = () => {
  const { activeTab, setActiveTab } = useNavigation();

  return (
    <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/50 backdrop-blur-sm border-t border-gray-200/80 flex justify-around items-center">
      {navItems.map((item) => (
        <div
          key={item.id}
          className="flex flex-col items-center justify-center cursor-pointer"
          onClick={() => setActiveTab(item.id)}
        >
          <div
            className={`p-3 rounded-lg transition-colors duration-200 ${
              activeTab === item.id ? "bg-purple-100" : "bg-transparent"
            }`}
          >
            <item.icon
              className={`w-6 h-6 transition-colors duration-200 ${
                activeTab === item.id ? "text-purple-600" : "text-gray-500"
              }`}
            />
          </div>
          <span
            className={`text-xs mt-1 transition-colors duration-200 ${
              activeTab === item.id ? "text-purple-700" : "text-gray-600"
            }`}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};
