import React from 'react';

interface TitleProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export default function Title({ children, style, className }: TitleProps) {
  return (
    <h2
      style={{ color: '#1C1C1C', fontSize: '1.5rem', textAlign: 'left', ...style }}
      className={className}
    >
      {children}
    </h2>
  );
}