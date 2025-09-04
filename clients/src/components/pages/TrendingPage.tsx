
import * as React from 'react';
import { getKnowledgeBases, KnowledgeBase } from '@/data/contentManager';
import { useLocation } from 'react-router-dom';
import { ChevronRight, Flame } from 'lucide-react';
import clsx from 'clsx';

// 定义工具卡片的渐变色映射
const toolGradients = {
  'chatgpt': 'from-blue-50/80 to-indigo-100/50',
  'claude': 'from-green-50/80 to-teal-100/50',
  'midjourney': 'from-purple-50/80 to-pink-100/50',
  'perplexity': 'from-orange-50/80 to-red-100/50',
  'Runway': 'from-teal-50/80 to-cyan-100/50',
  'notion': 'from-yellow-50/80 to-orange-100/50',
  // 默认颜色
  'default': 'from-gray-50/80 to-gray-100/50'
};

export const TrendingPage: React.FC = () => {
  const [knowledgeBases, setKnowledgeBases] = React.useState<KnowledgeBase[]>([]);
  const [selectedTool, setSelectedTool] = React.useState<KnowledgeBase | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isFading, setIsFading] = React.useState<boolean>(false);

  React.useEffect(() => {
    const data = getKnowledgeBases();
    setKnowledgeBases(data);
    // check query param
    const params = new URLSearchParams(window.location.search);
    const selected = params.get('selected');
    if (selected) {
      const found = data.find(d => d.id === selected);
      if (found) {
        setSelectedTool(found);
        return;
      }
    }
    if (data.length > 0) {
      setSelectedTool(data[0]);
    }
  }, []);

  const handleSelectTool = (tool: KnowledgeBase) => {
    if (selectedTool && tool.id !== selectedTool.id) {
      setIsFading(true);
      setTimeout(() => {
        setSelectedTool(tool);
        setIsLoading(true);
        setIsFading(false);
      }, 300); // Match transition duration
    }
  };

  const handleIframeLoad = () => {
    // 延长loading时间，设置1.5秒的延迟
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  if (!selectedTool) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>正在加载工具...</p>
      </div>
    );
  }

  if (!knowledgeBases.length) {
    return (
      <div className="h-full flex items-center justify-center">
        <p>暂无可用工具</p>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-3">
      {/* Left Sidebar */}
      <div className="w-1/5 flex flex-col gap-3">
        <div className="mb-2">
          <h2 className="text-lg font-medium text-gray-800">FREE CHAT</h2>
          <p className="text-gray-600 text-xs">选择您需要的工具</p>
        </div>
  <div className="flex flex-col gap-3 overflow-y-auto scrollbar-hide px-2">
          {knowledgeBases.map((tool) => {
            const Icon = tool.icon;
            return (
              <div
                key={tool.id}
                onClick={() => handleSelectTool(tool)}
                className={clsx(
                  'relative p-4 cursor-pointer rounded-[14px] bg-white/95 transition-transform',
                  selectedTool.id === tool.id ? 'shadow-lg scale-102' : 'shadow-sm hover:shadow-md hover:scale-[1.02]'
                )}
                style={{ minWidth: 0 }}
              >
                {/* corner badge to avoid interfering with title length */}
                {tool.tag && (
                  <div className="absolute top-2 right-2">
                    <span className={clsx('inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full shadow-sm',
                      tool.tag === '推荐' ? 'bg-[#F4E9FB] text-[#9D8DF1]' :
                      tool.tag === '免费' ? 'bg-[#E8F7EF] text-[#65C18C]' :
                      'bg-[#FFF7E6] text-[#E9A13C]'
                    )}>
                      {tool.tag === '热门' ? <Flame className="w-3 h-3" style={{color: '#E9A13C'}} /> : null}
                      <span>{tool.tag}</span>
                    </span>
                  </div>
                )}

                <div className="flex flex-col h-full min-w-0">
                  <div className="flex items-center gap-3 min-w-0">
                    {Icon ? <Icon className="w-6 h-6 text-[#9D8DF1] flex-shrink-0" /> : null}
                    <h4 className="text-sm font-medium text-gray-800 truncate">{tool.name}</h4>
                  </div>

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2">{tool.description}</p>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      点击查看
                    </div>
                    <div className={`flex items-center ${selectedTool.id === tool.id ? 'text-[#9D8DF1]' : 'text-gray-400'} transition-colors duration-200`}>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="w-4/5 flex flex-col">
        <div className="text-center mb-1">
          <h1 className="text-sm font-semibold text-gray-600"> </h1>
        </div>
        <div className="flex-1 bg-gray-100/50 rounded-lg border border-gray-200/60 overflow-hidden relative">
          {(isLoading || isFading) && (
            <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 transition-opacity duration-300">
              <div className="text-center">
                <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
                <p className="mt-3 text-sm text-gray-600">正在加载 {selectedTool.name}...</p>
              </div>
            </div>
          )}
          {selectedTool.iframeStrategy === 'embed' ? (
            <div className="w-full h-full overflow-hidden rounded-[26px] shadow-clay">
              <iframe
                key={selectedTool.id}
                src={selectedTool.url}
                title={selectedTool.name}
                className={`w-full h-full border-0 transition-opacity duration-300 ${isLoading || isFading ? 'opacity-0' : 'opacity-100'}`}
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
                onLoad={handleIframeLoad}
                style={{ scrollbarWidth: 'none' as any }}
              />
            </div>
          ) : (
            // snapshot strategy: show guide image and helpful actions when embed isn't available
            <SnapshotGuideCard tool={selectedTool} />
          )}
        </div>
      </div>
    </div>
  );
};

// Lightweight snapshot guide card component
const SnapshotGuideCard: React.FC<{ tool: KnowledgeBase }> = ({ tool }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(tool.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {
      // ignore
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white rounded shadow flex gap-6 p-6">
        <div className="w-1/3 flex items-center justify-center">
          <a href={tool.url} target="_blank" rel="noreferrer">
            <img src="/加载失败.png" alt="加载失败示意" className="max-w-full max-h-40 rounded" />
          </a>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold">{tool.name}</h3>
            <p className="text-sm text-gray-600 mt-2">{tool.description}</p>
            <p className="text-xs text-gray-500 mt-2">此工具无法直接内嵌显示时，您可以使用下列方式前往或复制链接分享。</p>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a href={tool.url} target="_blank" rel="noreferrer" className="px-4 py-2 bg-blue-500 text-white rounded">打开页面</a>
            <button onClick={() => window.open(tool.url, '_blank')} className="px-4 py-2 bg-gray-200 rounded">在新窗口打开</button>
            <button onClick={handleCopy} className="px-3 py-2 bg-gray-100 rounded border">
              {copied ? '已复制' : '复制链接'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
