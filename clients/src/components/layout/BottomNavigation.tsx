
import * as React from 'react';
import { Home, BookOpen, Cpu, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '../navigation/NavigationProvider';

export const BottomNavigation = () => {
  const { activeTab, setActiveTab } = useNavigation();

  const navItems = [
    { id: 'home', label: '首页', icon: Home },
    { id: 'knowledge', label: '知识库', icon: BookOpen },
    { id: 'tools', label: 'LLM & Agent', icon: Cpu },
    { id: 'trending', label: 'free chat', icon: Cloud },
  ];

  return (
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <div className="bg-transparent backdrop-blur-sm border border-transparent rounded-lg">
        <div className="flex justify-around items-center p-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <Button
                key={item.id}
                variant="ghost"
                size="sm"
                className={`flex flex-col items-center justify-center gap-1 py-3 px-4 h-auto text-xs transition-all duration-200 ${
                  isActive 
                    ? 'bg-accent text-accent-foreground font-medium rounded-md' 
                    : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground'
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="w-4 h-4" />
                <span className="text-center leading-tight">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
