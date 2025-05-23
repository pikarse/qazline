import React from 'react';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ href, children, className, ...props }) => {
  // This is a simple link component that could be expanded to use a router
  return (
    <a 
      href={href} 
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};