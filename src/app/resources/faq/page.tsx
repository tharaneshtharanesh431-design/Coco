import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { FadeIn as ScrollFade } from '@/components/animations/FadeIn';
import { Button } from '@/components/common/Button';

export const metadata: Metadata = {
  title: 'FAQ | VERDECOCO',
  description: 'Frequently asked questions regarding VERDECOCO products, quality standards, and export processes.',
  alternates: {
    canonical: '/resources/faq',
  },
};

type FAQItem = {
  question: string;
  answer: React.ReactNode;
};

type FAQCategory = {
  title: string;
  items: FAQItem[];
};

const faqData: FAQCategory[] = [
  {
    title: 'Products',
    items: [
      {
        question: 'What coconut products does VERDECOCO currently offer?',
        answer: (
          <>
            We currently offer four primary export products: Fresh Coconut, Tender Coconut, Semi-Husked Coconut, and Coconut Copra. 
            <br /><br />
            <Link href="/products" className="text-emerald-700 italic font-serif hover:text-teal-950 transition-colors">Explore our product catalogue →</Link>
          </>
        )
      },
      {
        question: 'What packaging formats are available?',
        answer: 'Depending on the specific product, our export-ready packaging formats include Mesh Bags, PP Bags, Jute Bags, Bulk Bags, Cartons, and Shrink Wrapped configurations.'
      },
      {
        question: 'Where are the products sourced from?',
        answer: 'Our products are sourced from established plantations and farmers across coconut-producing regions in India.'
      }
    ]
  },
  {
    title: 'Quality & Process',
    items: [
      {
        question: 'How are products selected and graded?',
        answer: (
          <>
            Products undergo a hand-selection process directly following the harvest. They are then precisely graded to align with established international requirements.
            <br /><br />
            <Link href="/quality" className="text-emerald-700 italic font-serif hover:text-teal-950 transition-colors">Learn more about our quality approach →</Link>
          </>
        )
      },
      {
        question: 'What does the export preparation involve?',
        answer: 'Export preparation involves selecting the appropriate packaging format and, where applicable (such as with our Semi-Husked Coconuts), retaining a portion of the husk to protect the product during long-distance transit.'
      },
      {
        question: 'Is international shipping documentation managed?',
        answer: (
          <>
            Yes, we manage the necessary international shipping documentation required for export clearance and international freight.
            <br /><br />
            <Link href="/process" className="text-emerald-700 italic font-serif hover:text-teal-950 transition-colors">See our export process →</Link>
          </>
        )
      }
    ]
  },
  {
    title: 'Global Markets & Buyers',
    items: [
      {
        question: 'Which regions does VERDECOCO currently serve?',
        answer: (
          <>
            We supply international commercial buyers across the Middle East, Europe, and Asia.
            <br /><br />
            <Link href="/global-markets" className="text-emerald-700 italic font-serif hover:text-teal-950 transition-colors">View our global markets →</Link>
          </>
        )
      },
      {
        question: 'What types of businesses do you supply?',
        answer: 'Our logistical operations are structured to supply importers, distributors, wholesalers, and commercial buyers.'
      }
    ]
  }
];

// Generate JSON-LD based strictly on the text content of the visible FAQ
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqData.flatMap(category => 
    category.items.map(item => ({
      '@type': 'Question',
      name: item.question,
      // Extract pure string if answer is a string, otherwise provide a factual text representation
      // Since some answers have React nodes (Links), we provide the plain text equivalent for JSON-LD.
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof item.answer === 'string' 
          ? item.answer 
          : item.question.includes('products') 
            ? 'We currently offer four primary export products: Fresh Coconut, Tender Coconut, Semi-Husked Coconut, and Coconut Copra.'
            : item.question.includes('selected and graded')
              ? 'Products undergo a hand-selection process directly following the harvest. They are then precisely graded to align with established international requirements.'
              : item.question.includes('shipping documentation')
                ? 'Yes, we manage the necessary international shipping documentation required for export clearance and international freight.'
                : item.question.includes('regions')
                  ? 'We supply international commercial buyers across the Middle East, Europe, and Asia.'
                  : ''
      }
    }))
  )
};

export default function FAQPage() {
  return (
    <div className="flex flex-col w-full bg-ivory min-h-[70vh] md:min-h-screen pt-28 md:pt-40 pb-12 md:pb-24">
      
      {/* Inject JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-grid max-w-5xl">
        
        <ScrollFade>
          <div className="flex items-center gap-6 mb-8">
            <Link href="/resources" className="font-sans text-[10px] tracking-[0.2em] uppercase text-emerald-700 font-medium italic hover:text-teal-950 transition-colors">
              RESOURCES
            </Link>
            <span className="text-teal-900/30">/</span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-teal-900/50 font-medium italic">
              FAQ
            </span>
          </div>
          
          <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-teal-950 mb-10 tracking-tight break-words">
            Frequently Asked <span className="italic text-emerald-800 font-light">Questions.</span>
          </h1>
          
          <div className="w-24 h-px bg-teal-900/20 mb-16"></div>
        </ScrollFade>

        <div className="space-y-16">
          {faqData.map((category, catIdx) => (
            <ScrollFade key={category.title} delay={catIdx * 0.1}>
              <h2 className="font-sans text-xs tracking-[0.2em] uppercase text-teal-900/50 font-medium mb-8">
                {category.title}
              </h2>
              <div className="border-t border-teal-900/20">
                {category.items.map((item, itemIdx) => (
                  <details 
                    key={itemIdx} 
                    className="group border-b border-teal-900/20"
                  >
                    <summary className="flex justify-between items-start font-serif text-2xl text-teal-950 py-8 cursor-pointer list-none italic hover:text-emerald-800 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 focus-visible:ring-offset-ivory">
                      <span className="pr-4 break-words">{item.question}</span>
                      <span className="relative w-6 h-6 shrink-0 flex items-center justify-center text-emerald-700 transition-transform duration-300 group-open:rotate-45 mt-1">
                        <span className="absolute w-4 h-px bg-current"></span>
                        <span className="absolute h-4 w-px bg-current"></span>
                      </span>
                    </summary>
                    <div className="pb-10 pt-2 text-teal-900/80 font-sans text-sm leading-relaxed tracking-wide max-w-3xl">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </ScrollFade>
          ))}
        </div>

        <ScrollFade className="mt-16 md:mt-24 pt-10 md:pt-16 border-t border-teal-900/10 text-center">
          <h3 className="font-serif text-3xl text-teal-950 mb-8 italic">
            Have a specific requirement?
          </h3>
          <Link href="/quote">
            <Button variant="primary" className="mx-auto" withArrow>
              Request a Quote
            </Button>
          </Link>
        </ScrollFade>

      </div>
    </div>
  );
}
