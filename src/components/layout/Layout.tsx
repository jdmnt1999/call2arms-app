import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-github-dark">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-github-dark-secondary border-t border-github-dark-border py-4 text-center text-sm text-github-dark-text">
        <div className="container mx-auto">
          <p>© {new Date().getFullYear()} Call2Arms - GitHub Repository Search PWA</p>
          <p className="mt-1">GitHub APIを利用しています。利用制限などにご注意ください。</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
