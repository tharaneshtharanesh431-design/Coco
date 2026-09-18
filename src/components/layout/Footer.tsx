import React from 'react';
import Link from 'next/link';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-teal-950 pt-16 md:pt-32 pb-12 border-t-8 border-emerald-700">
      <div className="container mx-auto px-8 lg:px-16 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-12 md:gap-16 xl:gap-8">
          
          {/* Brand Column */}
          <div className="xl:col-span-5 pr-0 xl:pr-24">
            <Logo theme="light" variant="full" className="mb-10" />
            <p className="text-teal-100/70 max-w-sm mb-12 leading-relaxed text-sm font-light">
              Premium agricultural products from India to the world. We build reliable, long-term supply partnerships with international buyers based on quality, transparency, and trust.
            </p>
            <div className="flex gap-6">
              <span className="font-sans text-[10px] tracking-[0.2em] text-emerald-400 uppercase italic">Mumbai</span>
              <span className="font-sans text-[10px] tracking-[0.2em] text-teal-400/50 uppercase italic">Global Reach</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="xl:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            
            <div className="space-y-8">
              <h4 className="font-sans text-[10px] tracking-[0.2em] text-emerald-400 uppercase italic">Company</h4>
              <ul className="space-y-4">
                <li><Link href="/about" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">About Us</Link></li>
                <li><Link href="/quality" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">Quality Standards</Link></li>
                <li><Link href="/process" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">Export Process</Link></li>
                <li><Link href="/global-markets" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">Global Markets</Link></li>
              </ul>
            </div>

            <div className="space-y-8">
              <h4 className="font-sans text-[10px] tracking-[0.2em] text-emerald-400 uppercase italic">Portfolio</h4>
              <ul className="space-y-4">
                <li><Link href="/products" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">All Products</Link></li>
                <li><Link href="/products/fresh-coconut" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">Fresh Coconut</Link></li>
                <li><Link href="/products/tender-coconut" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">Tender Coconut</Link></li>
                <li><Link href="/products/semi-husked-coconut" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">Semi-Husked</Link></li>
                <li><Link href="/products/coconut-copra" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">Coconut Copra</Link></li>
              </ul>
            </div>

            <div className="space-y-8 col-span-2 md:col-span-1">
              <h4 className="font-sans text-[10px] tracking-[0.2em] text-emerald-400 uppercase italic">Connect</h4>
              <ul className="space-y-4">
                <li><Link href="/quote" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">Request a Quote</Link></li>
                <li><Link href="/contact" className="font-serif italic text-teal-100/80 hover:text-white transition-colors text-lg">Contact Desk</Link></li>
                <li className="pt-4 border-t border-teal-800/50 mt-6 block">
                  <span className="text-teal-400/50 font-sans text-xs block italic mb-1">Email Inquiry</span>
                  <a href="mailto:tharaneeshm2416@gmail.com" className="text-teal-100/80 hover:text-white font-serif italic text-sm transition-colors break-words">tharaneeshm2416@gmail.com</a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 md:mt-32 pt-8 border-t border-teal-900/50 flex flex-col md:flex-row justify-between items-center text-teal-400/40 text-[10px] tracking-[0.1em] font-sans uppercase">
          <p>© {new Date().getFullYear()} VERDECOCO. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8 mt-6 md:mt-0">
            <Link href="/privacy" className="hover:text-teal-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-teal-200 transition-colors">Terms of Trade</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
