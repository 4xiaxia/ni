
import * as React from "react";
import { GridLayout } from "../content/GridLayout";
import { ContentCard } from "../content/ContentCard";

export const KnowledgePage = () => {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-medium text-gray-800 mb-2">知识库</h1>
        <p className="text-gray-600 text-sm">系统化的学习资源分类</p>
      </div>

      <GridLayout>
        <ContentCard
          title="计算机科学"
          description="编程、算法、数据结构"
          layout="two-thirds"
          color="from-blue-50/80 to-indigo-100/50"
        />

        <ContentCard
          title="快速入门"
          description="新手指南"
          layout="one-third"
          color="from-green-50/80 to-teal-100/50"
        />

        <ContentCard
          title="数学与统计"
          description="高等数学、统计学"
          layout="half-left"
          color="from-purple-50/80 to-pink-100/50"
        />

        <ContentCard
          title="物理学"
          description="理论物理、实验"
          layout="half-right"
          color="from-orange-50/80 to-red-100/50"
        />

        <ContentCard
          title="化学"
          description="有机化学基础"
          layout="quarter"
          color="from-teal-50/80 to-cyan-100/50"
        />

        <ContentCard
          title="生物学"
          description="分子生物学"
          layout="quarter"
          color="from-green-50/80 to-lime-100/50"
        />

        <ContentCard
          title="经济学"
          description="宏观微观经济"
          layout="quarter"
          color="from-yellow-50/80 to-orange-100/50"
        />

        <ContentCard
          title="心理学"
          description="认知心理学"
          layout="quarter"
          color="from-pink-50/80 to-rose-100/50"
        />
      </GridLayout>
    </div>
  );
};
