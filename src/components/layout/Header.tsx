'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, Bell, User } from 'lucide-react';

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Proposals', href: '/proposals' },
    { name: 'Calendar', href: '/calendar' },
    { name: 'Pricing Engine', href: '/pricing' },
    { name: 'Settings', href: '/settings' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-40 shadow-sm">
      <div className="max-w-[1600px] mx-auto h-full px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            <Zap className="w-6 h-6 text-primary fill-primary group-hover:rotate-12 transition-transform" />
            <span className="text-xl font-serif font-bold text-dark">TenderFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${pathname === link.href
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-dark'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: User Profile */}
        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-400 hover:text-primary transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full"></span>
          </button>

          <div className="h-8 w-[1px] bg-gray-200 mx-1"></div>

          <div className="flex items-center gap-3 pl-2">
            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <User className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
