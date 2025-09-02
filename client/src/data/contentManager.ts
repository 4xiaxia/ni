
import {
  Bot,
  BrainCircuit,
  Code,
  Database,
  FlaskConical,
  Globe,
  GraduationCap,
  MessageSquare,
  PenTool,
  Share2,
  Sigma,
  Sparkles,
} from "lucide-react";

const KNOWLEDGE_BASES_KEY = "ai4free_knowledge_bases";

const defaultKnowledgeBases = [
  {
    id: "chatgpt",
    name: "ChatGPT 3.5",
    description: "通用对话模型",
    url: "https://chat.openai.com",
    icon: MessageSquare,
  },
  {
    id: "claude",
    name: "Claude Sonnet",
    description: "注重安全和创造力的模型",
    url: "https://claude.ai",
    icon: PenTool,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "对话式搜索引擎",
    url: "https://www.perplexity.ai/",
    icon: Globe,
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Google 的多模态模型",
    url: "https://gemini.google.com/",
    icon: Sparkles,
  },
  {
    id: "kimi",
    name: "Kimi Chat",
    description: "支持长文本的智能助手",
    url: "https://kimi.moonshot.cn/",
    icon: BrainCircuit,
  },
  {
    id: "coze",
    name: "Coze",
    description: "字节跳动旗下 AI Bot 平台",
    url: "https://www.coze.com/home",
    icon: Bot,
  },
];

export const getKnowledgeBases = () => {
  try {
    const storedBases = localStorage.getItem(KNOWLEDGE_BASES_KEY);
    if (storedBases) {
      const parsed = JSON.parse(storedBases);
      // 重新附加图标函数
      return parsed.map((item) => {
        const defaultItem = defaultKnowledgeBases.find((d) => d.id === item.id);
        return { ...item, icon: defaultItem ? defaultItem.icon : Bot };
      });
    }
  } catch (error) {
    console.error("Failed to parse knowledge bases from localStorage", error);
  }
  return defaultKnowledgeBases;
};

export const saveKnowledgeBases = (bases) => {
  try {
    // 存储前移除图标函数
    const storableBases = bases.map(({ icon, ...rest }) => rest);
    localStorage.setItem(KNOWLEDGE_BASES_KEY, JSON.stringify(storableBases));
  } catch (error) {
    console.error("Failed to save knowledge bases to localStorage", error);
  }
};
