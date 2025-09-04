import * as React from 'react';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Rss, Gift, Sparkles, Wrench, Database, BarChart3, PenTool, Cpu, ShoppingBag, Star } from 'lucide-react';
import { getKnowledgeBases } from '@/data/contentManager';
import { useNavigate } from 'react-router-dom';

const SectionHeader = ({ icon, title }: { icon: React.ReactNode, title: string }) => (
  <div className="flex items-center gap-2 mb-3">
    {icon}
    <h2 className="text-base font-semibold text-gray-800">{title}</h2>
  </div>
);

const InfoItem = ({ icon, text, iconBgColor }: { icon: React.ReactNode, text: string, iconBgColor: string }) => (
  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50/50 cursor-pointer transition-colors">
    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${iconBgColor}`}>
      {icon}
    </div>
    <p className="text-sm text-gray-700">{text}</p>
  </div>
);

const ToolItem = ({ label, subLabel, bgColor, tag }: { label: string, subLabel: string, bgColor: string, tag?: string }) => (
  <div className={`p-3 rounded-lg cursor-pointer transition-all hover:shadow-sm relative ${bgColor}`}>
    <div className="flex items-center gap-2">
      <span className="text-xs font-semibold bg-black/5 text-gray-700 px-2 py-0.5 rounded-full">{label}</span>
      <p className="text-sm font-medium text-gray-800">{subLabel}</p>
    </div>
    {tag && <div className="absolute top-2 right-2 text-xs font-bold text-yellow-600 bg-yellow-400/50 px-1.5 py-0.5 rounded-full">{tag}</div>}
  </div>
);

export const HomePage = () => {
  // 管理员入口已移至右下角图标，页面不再展示内嵌登录面板
  const navigate = useNavigate();
  const kb = getKnowledgeBases();

  const homeItems = kb.filter(item => item.showOnHome).sort((a,b) => (a.order ?? 0) - (b.order ?? 0));

  const handleGoToTrending = (id: string) => {
    navigate(`/trending?selected=${encodeURIComponent(id)}`);
  };
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-purple-700">Ai4free</h1>
          <span className="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded">公益站</span>
        </div>
        <div className="w-1/3 relative">
          {/* 管理员入口已移动到右下角图标，不在页面中直接显示登录 */}
        </div>
      </header>
      <p className="text-sm text-gray-500 mb-6 -mt-3">让知识流动起来</p>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-3 gap-6 overflow-y-auto scrollbar-hide pb-4">
        {/* Left Column */}
        <div className="col-span-1 flex flex-col">
          <Card className="p-6 flex-1 flex flex-col items-center justify-center text-center bg-white/70">
            <BarChart3 className="w-12 h-12 text-orange-500 mb-4" />
            <h2 className="text-xl font-bold text-gray-800">共建知识库</h2>
            <p className="text-sm text-gray-600 mt-2 mb-4">知识创造收入</p>
            <p className="text-xs text-gray-500 mb-6">参与知识库建设,分享专业知识,获得持续收益回报</p>
            <Button className="bg-green-400 hover:bg-green-500 text-white font-bold">立即加入</Button>
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-span-2 grid grid-cols-2 gap-6">
          {/* 最新资讯 & 福利羊毛 */}
          <div className="col-span-1 flex flex-col gap-6">
            <Card className="p-4 bg-white/70">
              <SectionHeader icon={<Rss className="w-5 h-5 text-orange-500" />} title="最新资讯" />
                <div className="space-y-3">
                  {homeItems.map(item => (
                    <div key={item.id} onClick={() => handleGoToTrending(item.id)} className="flex items-center gap-3 p-3 cursor-pointer transition-transform hover:scale-[1.01] clay-card" style={{borderRadius: 12}}>
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center`} style={{background: item.tag === '推荐' ? '#FFECEC' : item.tag === '免费' ? '#E0F2E9' : item.tag === '热门' ? '#FFF7E6' : '#F5F3FB'}}>
                        {item.icon ? <item.icon className="w-4 h-4 text-lavender-500" /> : null}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          {item.tag && (
                            <span className="clay-badge" style={{background: item.tag === '推荐' ? '#F4E9FB' : item.tag === '免费' ? '#E8F7EF' : '#FFF7E6', color: item.tag === '推荐' ? '#9D8DF1' : item.tag === '免费' ? '#65C18C' : '#E9A13C'}}>{item.tag}</span>
                          )}
                          {item.category && <span className="text-xs text-gray-500">{item.category}</span>}
                          <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                        </div>
                      </div>
                      <div className="text-sm text-lavender-500 font-semibold">前往</div>
                    </div>
                  ))}
                </div>
            </Card>
            <Card className="p-4 bg-white/70">
              <SectionHeader icon={<Gift className="w-5 h-5 text-pink-500" />} title="福利羊毛" />
              <div className="space-y-2">
                <InfoItem icon={<Star className="w-4 h-4 text-red-500" />} text="每日签到领取积分奖励" iconBgColor="bg-red-100" />
                <InfoItem icon={<ShoppingBag className="w-4 h-4 text-green-500" />} text="限时免费资源大放送" iconBgColor="bg-green-100" />
              </div>
            </Card>
          </div>

          {/* AI 最新应用 & 常用工具 */}
          <div className="col-span-1 flex flex-col gap-6">
            <Card className="p-4 bg-white/70">
              <SectionHeader icon={<Cpu className="w-5 h-5 text-purple-500" />} title="AI 最新应用" />
              <div className="grid grid-cols-2 gap-3">
                <ToolItem label="学术" subLabel="学术搜索" bgColor="bg-purple-100/50" />
                <ToolItem label="HF" subLabel="HF 镜像" bgColor="bg-yellow-100/70" tag="HF" />
                <ToolItem label="VPN" subLabel="直连模型" bgColor="bg-red-100/50" />
                <ToolItem label="API" subLabel="免费API" bgColor="bg-blue-100/50" />
              </div>
            </Card>
            <Card className="p-4 bg-white/70">
              <SectionHeader icon={<Wrench className="w-5 h-5 text-blue-500" />} title="常用工具" />
              <div className="grid grid-cols-2 gap-3">
                <ToolItem label="代码" subLabel="代码生成" bgColor="bg-blue-100/50" />
                <ToolItem label="文档" subLabel="文档助手" bgColor="bg-orange-100/50" />
                <ToolItem label="图片" subLabel="图片处理" bgColor="bg-green-100/50" />
                <ToolItem label="数据" subLabel="数据分析" bgColor="bg-purple-100/50" />
              </div>
            </Card>
          </div>
          
          {/* 热门知识库 */}
          <div className="col-span-2">
            <Card className="p-4 bg-white/70">
              <SectionHeader icon={<Database className="w-5 h-5 text-green-500" />} title="热门知识库" />
              {/* This can be populated with data later */}
              <div className="text-sm text-gray-500">热门知识库内容即将上线...</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};