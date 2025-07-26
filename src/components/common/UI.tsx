import React from 'react';

interface CommonProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}

export function Title({ children, style, className }: CommonProps) {
  return (
    <h2
      style={{ color: '#1C1C1C', fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'left', ...style }}
      className={className}
    >
      {children}
    </h2>
  );
}

interface ContainerProps extends CommonProps {
  container?: boolean;
}

export function Container({ children, style, className, container = true }: ContainerProps) {
  const containerClass = container ? 'myContainer' : '';

  return (
    <div
      style={{
        width: '100%',
        boxSizing: 'border-box',
        ...style
      }}
      className={`${className} ${containerClass}`}
    >
      {children}
    </div>
  );
}