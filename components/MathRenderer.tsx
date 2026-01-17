
import React, { useEffect, useRef } from 'react';
import renderMathInElement from 'https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.mjs';

interface MathRendererProps {
  content: string;
  className?: string;
}

const MathRenderer: React.FC<MathRendererProps> = ({ content, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Small delay to ensure content is DOM-ready
      renderMathInElement(containerRef.current, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true },
        ],
        throwOnError: false,
      });
    }
  }, [content]);

  return (
    <div 
      ref={containerRef} 
      className={`whitespace-pre-wrap break-words leading-relaxed ${className}`}
      dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br/>') }}
    />
  );
};

export default MathRenderer;
