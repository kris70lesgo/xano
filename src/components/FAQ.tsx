'use client';

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-bold text-dark group-hover:text-primary transition-colors">{question}</span>
        {isOpen ? <Minus className="text-primary shrink-0" /> : <Plus className="text-gray-400 shrink-0" />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-gray-600 leading-relaxed pr-8">{answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-serif font-bold text-center text-dark mb-12">Frequently Asked Questions</h2>

        <div className="space-y-2">
          <FAQItem
            question="How does Tendr extract job details?"
            answer="Simply forward the RFQ email to our AI inbox. Our system uses advanced NLP to extract project scope, materials, location, timeline, budget, and customer details instantly."
          />
          <FAQItem
            question="What if the AI pricing suggestion is wrong?"
            answer="You review and approve before sending. You can easily adjust pricing based on your cost structure, profit margins, and market conditions. The AI learns from your adjustments."
          />
          <FAQItem
            question="Is my data secure?"
            answer="Yes. All customer data is encrypted and stored securely. We never share your data with third parties. Your proposals, pricing history, and customer information are yours alone."
          />
          <FAQItem
            question="Can I integrate with my email?"
            answer="Yes! We support Gmail and Outlook integrations. You can forward RFQs directly or we can monitor your email inbox automatically for you."
          />
        </div>
      </div>
    </section>
  );
};

export default FAQ;
