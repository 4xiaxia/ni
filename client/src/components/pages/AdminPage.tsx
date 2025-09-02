
import * as React from "react";
import { getKnowledgeBases, saveKnowledgeBases } from "@/data/contentManager";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [knowledgeBases, setKnowledgeBases] = React.useState([]);

  React.useEffect(() => {
    if (isAuthenticated) {
      setKnowledgeBases(getKnowledgeBases());
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ircoco000") {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("密码错误");
    }
  };

  const handleInputChange = (index, field, value) => {
    const updatedBases = [...knowledgeBases];
    updatedBases[index][field] = value;
    setKnowledgeBases(updatedBases);
  };

  const handleSaveChanges = () => {
    saveKnowledgeBases(knowledgeBases);
    alert("更改已保存！");
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
              <Button type="submit" className="w-full">
                登录
              </Button>
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
          <Button onClick={handleSaveChanges}>保存全部更改</Button>
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
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`description-${index}`}>描述</Label>
                  <Input
                    id={`description-${index}`}
                    value={item.description}
                    onChange={(e) =>
                      handleInputChange(index, "description", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label htmlFor={`url-${index}`}>链接 (URL)</Label>
                  <Input
                    id={`url-${index}`}
                    value={item.url}
                    onChange={(e) =>
                      handleInputChange(index, "url", e.target.value)
                    }
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
