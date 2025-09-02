
import * as React from "react";

export const useClickEffect = () => {
  const [effects, setEffects] = React.useState<
    { id: number; x: number; y: number }[]
  >([]);

  const createClickEffect = (e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const newEffect = { id: Date.now(), x, y };
    setEffects((prev) => [...prev, newEffect]);
  };

  const handleAnimationEnd = (id: number) => {
    setEffects((prev) => prev.filter((effect) => effect.id !== id));
  };

  const effectsContainer = (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {effects.map(({ id, x, y }) => (
        <div
          key={id}
          className="absolute w-1 h-1 bg-purple-400 rounded-full animate-ripple"
          style={{ left: x, top: y }}
          onAnimationEnd={() => handleAnimationEnd(id)}
        />
      ))}
      <style>{`
        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.6;
          }
          100% {
            transform: scale(50);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s linear;
        }
      `}</style>
    </div>
  );

  return { createClickEffect, effectsContainer };
};
