import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'status' | 'metric';
  statusColor?: 'blue' | 'orange' | 'green' | 'gray' | 'red';
  hover?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  statusColor,
  hover = true,
}) => {
  const baseStyles = 'bg-white rounded-lg border transition-all duration-300';
  
  const variants = {
    default: 'border-gray-200 shadow-sm',
    status: 'border-gray-200 shadow-sm',
    metric: 'border-gray-100 shadow-md',
  };
  
  const hoverStyles = hover ? 'hover:shadow-lg hover:-translate-y-1' : '';
  
  const statusBorderColors = {
    blue: 'border-l-4 border-l-blue-400',
    orange: 'border-l-4 border-l-primary',
    green: 'border-l-4 border-l-green-500',
    gray: 'border-l-4 border-l-gray-300',
    red: 'border-l-4 border-l-red-500',
  };

  return (
    <div
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${hoverStyles}
        ${statusColor ? statusBorderColors[statusColor] : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
