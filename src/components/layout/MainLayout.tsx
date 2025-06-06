import React from 'react';
import Header from './Header';
import Footer from './Footer';

type MainLayoutProps = {
  children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}