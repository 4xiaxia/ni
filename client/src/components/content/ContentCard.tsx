
import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContentCardProps {
  title: string;
  description: string;
  layout:
    | "full"
    | "half-left"
    | "half-right"
    | "quarter"
    | "two-thirds"
    | "one-third";
  color: string;
  compact?: boolean;
}

export const ContentCard = ({
  title,
  description,
  layout,
  color,
  compact = false,
}: ContentCardProps) => {
  const getLayoutClasses = () => {
    switch (layout) {
      case "full":
        return "col-span-4";
      case "half-left":
      case "half-right":
        return "col-span-2";
      case "quarter":
        return "col-span-1";
      case "two-thirds":
        return "col-span-3";
      case "one-third":
        return "col-span-1";
      default:
        return "col-span-4";
    }
  };

  if (compact) {
    return (
      <div
        className={`group cursor-pointer transition-all duration-200 hover:shadow-md bg-gradient-to-br ${color} border border-gray-200/50 rounded-lg p-3 overflow-hidden`}
      >
        <div className="relative">
          <h3 className="text-xs font-medium text-gray-800 line-clamp-2 leading-tight">
            {title}
          </h3>

          <div className="mt-2 flex items-center justify-center">
            <div className="w-6 h-0.5 bg-blue-500/60 rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card
      className={`${getLayoutClasses()} group cursor-pointer transition-all duration-200 hover:shadow-md bg-gradient-to-br ${color} border-gray-200/50 overflow-hidden`}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-gray-800 line-clamp-1">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-xs text-gray-600 line-clamp-2">{description}</p>

        <div className="mt-3 flex items-center justify-between">
          <div className="w-8 h-1 bg-blue-500/60 rounded-full" />
          <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            阅读更多
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
