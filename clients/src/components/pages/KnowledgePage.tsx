import * as React from 'react';
import { useState } from 'react';
import { GridLayout } from '../content/GridLayout';
import { ContentCard } from '../content/ContentCard';
// lightweight debounce to avoid adding lodash dependency
function debounce<T extends (...args: any[]) => void>(fn: T, wait = 300) {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), wait);
  };
}

const knowledgeItems = [
  {
    title: "计算机科学",
    description: "编程、算法、数据结构",
    layout: "two-thirds",
    color: "from-blue-50/80 to-indigo-100/50"
  },
  {
    title: "快速入门",
    description: "新手指南",
    layout: "one-third",
    color: "from-green-50/80 to-teal-100/50"
  },
  {
    title: "数学与统计",
    description: "高等数学、统计学",
    layout: "half-left",
    color: "from-purple-50/80 to-pink-100/50"
  },
  {
    title: "物理学",
    description: "理论物理、实验",
    layout: "half-right",
    color: "from-orange-50/80 to-red-100/50"
  },
  {
    title: "化学",
    description: "有机化学基础",
    layout: "quarter",
    color: "from-teal-50/80 to-cyan-100/50"
  },
  {
    title: "生物学",
    description: "分子生物学",
    layout: "quarter",
    color: "from-green-50/80 to-lime-100/50"
  },
  {
    title: "经济学",
    description: "宏观微观经济",
    layout: "quarter",
    color: "from-yellow-50/80 to-orange-100/50"
  },
  {
    title: "心理学",
    description: "认知心理学",
    layout: "quarter",
    color: "from-pink-50/80 to-rose-100/50"
  }
];
export const KnowledgePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [items, setItems] = useState(knowledgeItems);
  const [password, setPassword] = useState('');

  // 通过后端 API 验证密码（示例）
  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) {
      alert('请输入密码');
      return;
    }
    try {
      const response = await fetch('/api/verify-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: encodeURIComponent(password) })
      });
      const data = await response.json();
      if (data.success) {
        setIsEditing(true);
      } else {
        alert('密码错误');
      }
    } catch (error) {
      alert('验证失败，请重试');
    }
  };

  const debouncedTitleChange = debounce((index: number, newTitle: string) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].title = newTitle;
      return updatedItems;
    });
  }, 300);

  const debouncedDescriptionChange = debounce((index: number, newDescription: string) => {
    setItems(prevItems => {
      const updatedItems = [...prevItems];
      updatedItems[index].description = newDescription;
      return updatedItems;
    });
  }, 300);

  const handleTitleChange = (index: number, newTitle: string) => debouncedTitleChange(index, newTitle);
  const handleDescriptionChange = (index: number, newDescription: string) => debouncedDescriptionChange(index, newDescription);

  const renderTitle = (isEditing: boolean, title: string, index: number) => {
    if (isEditing) {
      return (
        <input
          type="text"
          value={title}
          onChange={(e) => handleTitleChange(index, e.target.value)}
          className="p-1 border rounded"
        />
      );
    }
    return title;
  };

  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-800 mb-2 text-left">知识库</h1>
        <p className="text-gray-600 text-sm text-left">系统化的学习资源分类</p>
        {isEditing && (
          <button
            onClick={() => setIsEditing(false)}
            className="mb-4 p-2 bg-red-500 text-white rounded"
          >
            退出编辑
          </button>
        )}
      </div>

      <GridLayout>
        {items.map((item, index) => (
          <ContentCard
            key={index}
            title={renderTitle(isEditing, item.title, index)}
            description={isEditing ? (
              <input
                type="text"
                value={item.description}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                className="p-1 border rounded"
              />
            ) : item.description}
            layout={item.layout}
            color={item.color}
            className="text-left"
          />
        ))}
      </GridLayout>
    </div>
  );
};