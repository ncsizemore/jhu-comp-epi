'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface ClickableProjectCardProps {
  href: string;
  children: ReactNode;
}

export default function ClickableProjectCard({ href, children }: ClickableProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(href);
  };

  return (
    <div
      onClick={handleClick}
      className="group relative bg-white/95 backdrop-blur-sm rounded-2xl border border-gray-200/50 overflow-hidden hover:shadow-xl hover:shadow-gray-900/10 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
    >
      {children}
    </div>
  );
}
