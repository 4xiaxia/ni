
import * as React from "react";
import { getKnowledgeBases } from "@/data/contentManager";

export const TrendingPage = () => {
  const [knowledgeBases, setKnowledgeBases] = React.useState([]);
  const [selectedTool, setSelectedTool] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isFading, setIsFading] = React.useState(false);

  React.useEffect(() => {
    const data = getKnowledgeBases();
    setKnowledgeBases(data);
    if (data.length > 0) {
      setSelectedTool(data[0]);
    }
  }, []);

  const handleSelectTool = (tool) => {
    if (selectedTool && tool.id !== selectedTool.id) {
      setIsFading(true);
      setTimeout(() => {
        setSelectedTool(tool);
        setIsLoading(true);
        setIsFading(false);
      }, 300); // 匹配过渡持续时间
    }
  };

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  if (!selectedTool) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>正在加载工具...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-4">
      {/* 左侧边栏 */}
      <div className="w-1/4 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-gray-800">FREE CHAT</h2>
        <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide">
          {knowledgeBases.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => handleSelectTool(tool)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 border ${
                  selectedTool.id === tool.id
                    ? "bg-primary/20 border-primary/50 shadow-sm"
                    : "bg-white/60 hover:bg-white/90 border-transparent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-primary/80 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-gray-800">{tool.name}</h4>
                    <p className="text-xs text-gray-600 mt-1">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 右侧内容区域 */}
      <div className="w-3/4 flex flex-col">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-800">AI 工具展示</h1>
          <p className="text-sm text-gray-500 mt-1">
            互动式体验精选的 AI 工具
          </p>
        </div>
        <div className="flex-1 bg-gray-100/50 rounded-lg border border-gray-200/60 overflow-hidden relative">
          {(isLoading || isFading) && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity duration-300">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                <p className="mt-3 text-sm text-gray-600">
                  正在加载 {selectedTool.name}...
                </p>
              </div>
            </div>
          )}
          <iframe
            key={selectedTool.id}
            src={selectedTool.url}
            title={selectedTool.name}
            className={`w-full h-full border-0 transition-opacity duration-300 ${
              isLoading || isFading ? "opacity-0" : "opacity-100"
            }`}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            onLoad={handleIframeLoad}
          ></iframe>
        </div>
      </div>
    </div>
  );
};
