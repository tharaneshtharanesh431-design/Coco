'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/utils/cn';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

    const navLinks = [
      { name: 'About', path: '/about' },
      { name: 'Products', path: '/products' },
      { name: 'Quality', path: '/quality' },
      { name: 'Process', path: '/process' },
      { name: 'Global Markets', path: '/global-markets' },
      { name: 'Resources', path: '/resources' },
      { name: 'Contact', path: '/contact' },
    ];

  const navbarClasses = cn(
    'fixed w-full z-50 transition-all duration-700 ease-[0.25,1,0.5,1]',
    isHome 
      ? (isScrolled ? 'bg-ivory/95 backdrop-blur-md py-6 shadow-[0_2px_20px_rgba(0,0,0,0.03)] border-b border-teal-900/5' : 'bg-transparent py-10')
      : 'bg-ivory/95 backdrop-blur-md py-6 border-b border-teal-900/5'
  );

  const textClasses = cn(
    'font-sans text-[11px] tracking-[0.2em] uppercase transition-colors font-medium italic duration-500',
    (isHome && !isScrolled) ? 'text-white/80 hover:text-white' : 'text-teal-900/70 hover:text-teal-950'
  );

  return (
    <nav className={navbarClasses}>
      <div className="container mx-auto px-8 lg:px-16 max-w-[1600px] flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="z-50 relative">
          <Logo 
            theme={(isHome && !isScrolled) ? 'light' : 'dark'} 
            variant="full" 
            className="transition-transform duration-700 hover:scale-[1.02]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path} className={textClasses}>
              {link.name}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center">
          <Link href="/quote" className="group">
             <Button variant="text" className={cn(
               (isHome && !isScrolled) ? "text-white border-white/40 hover:text-emerald-300 hover:border-emerald-300" : "text-teal-950 border-teal-900/30 hover:text-emerald-700 hover:border-emerald-700"
             )} withArrow>
               Request Quote
             </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={cn("lg:hidden relative z-50 transition-colors duration-500", 
            (isHome && !isScrolled && !isMobileMenuOpen) ? "text-white" : "text-teal-950"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {isMobileMenuOpen ? <X size={32} strokeWidth={1} /> : <Menu size={32} strokeWidth={1} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        id="mobile-menu"
        className={cn(
        "lg:hidden fixed inset-0 bg-ivory z-40 transition-transform duration-700 ease-[0.22,1,0.36,1] flex flex-col pt-32 pb-12 px-10 overflow-y-auto",
        isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-10 my-auto">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.path} 
              className="text-teal-950 font-serif italic text-4xl tracking-tight hover:text-emerald-700 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-12">
            <Link 
              href="/quote" 
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Button variant="text" className="text-teal-950 border-teal-900/30 hover:text-emerald-700 text-sm" withArrow>
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
