
import * as React from 'react';
import { getKnowledgeBases, saveKnowledgeBases, KnowledgeBase } from '@/data/contentManager';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

export const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');
  // NOTE: changed from any[] -> KnowledgeBase[] for stronger typing (2025-09-03)
  const [knowledgeBases, setKnowledgeBases] = React.useState<KnowledgeBase[]>([]);

  React.useEffect(() => {
    if (isAuthenticated) {
      setKnowledgeBases(getKnowledgeBases());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('密码错误');
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedBases = [...knowledgeBases];
    updatedBases[index][field] = value;
    setKnowledgeBases(updatedBases);
  };

  const handleNumberChange = (index: number, field: string, value: number) => {
    const updatedBases = [...knowledgeBases];
    updatedBases[index][field] = value;
    setKnowledgeBases(updatedBases);
  };

  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent<FileReader>) => {
      try {
        const result = event.target && event.target.result ? event.target.result : null;
        const text = typeof result === 'string' ? result : '';
        const data = JSON.parse(text);
        setKnowledgeBases(data);
        alert('导入成功！');
      } catch (error) {
        alert('导入失败：文件格式不正确');
      }
    };
    reader.readAsText(file);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(knowledgeBases, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'knowledge-bases.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const handleSaveChanges = () => {
    // Basic validation before saving
    for (let i = 0; i < knowledgeBases.length; i++) {
      const item = knowledgeBases[i];
      // order must be a number
      if (item.order !== undefined && typeof item.order !== 'number') {
        alert(`第 ${i + 1} 项的排序（order）必须为数字`);
        return;
      }
      // iframeStrategy must be present
      if (!item.iframeStrategy) {
        alert(`第 ${i + 1} 项必须选择 iframe 展示策略`);
        return;
      }
      // basic url check
      try {
        // will throw if invalid
        // allow relative urls too
        if (typeof item.url !== 'string' || item.url.trim() === '') {
          alert(`第 ${i + 1} 项的 URL 不合法`);
          return;
        }
      } catch (e) {
        alert(`第 ${i + 1} 项的 URL 不合法`);
        return;
      }
    }

    // Ensure each item has iframeStrategy (default to 'embed' if missing) and save
    const normalized = knowledgeBases.map(item => ({
      ...item,
      iframeStrategy: item.iframeStrategy || 'embed',
    }));
    saveKnowledgeBases(normalized);
    alert('更改已保存！');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-center">管理员登录</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="password">密码</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="请输入密码"
                />
              </div>
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" className="w-full">登录</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">内容管理</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>导出数据</Button>
            <input
              type="file"
              id="import-file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
            <Button variant="outline" onClick={() => document.getElementById('import-file').click()}>
              导入数据
            </Button>
            <Button onClick={handleSaveChanges}>保存全部更改</Button>
          </div>
        </div>

        <div className="space-y-6">
          {knowledgeBases.map((item, index) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor={`name-${index}`}>名称</Label>
                  <Input
                    id={`name-${index}`}
                    value={item.name}
                    onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`description-${index}`}>描述</Label>
                  <Input
                    id={`description-${index}`}
                    value={item.description}
                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`url-${index}`}>链接 (URL)</Label>
                  <Input
                    id={`url-${index}`}
                    value={item.url}
                    onChange={(e) => handleInputChange(index, 'url', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Label>排序 (order)</Label>
                    <Input type="number" value={item.order ?? 0} onChange={(e) => handleNumberChange(index, 'order', Number(e.target.value))} />
                  </div>
                  <div>
                    <Label>标签 (可选)</Label>
                    <select value={item.tag ?? ''} onChange={(e) => handleInputChange(index, 'tag', e.target.value || undefined)} className="w-full">
                      <option value="">（无）</option>
                      <option value="推荐">推荐</option>
                      <option value="免费">免费</option>
                      <option value="热门">热门</option>
                    </select>
                  </div>
                  <div>
                    <Label>首页展示</Label>
                    <div className="mt-1">
                      <input type="checkbox" checked={!!item.showOnHome} onChange={(e) => handleInputChange(index, 'showOnHome', e.target.checked)} /> <span className="ml-2">在首页展示</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>iframe 展示策略</Label>
                    <select value={item.iframeStrategy ?? 'embed'} onChange={(e) => handleInputChange(index, 'iframeStrategy', e.target.value)} className="w-full">
                      <option value="embed">嵌入 (embed)</option>
                      <option value="snapshot">弹窗快照+跳转 (snapshot)</option>
                    </select>
                  </div>
                  <div>
                    <Label>分类 (category)</Label>
                    <Input value={item.category ?? ''} onChange={(e) => handleInputChange(index, 'category', e.target.value)} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
