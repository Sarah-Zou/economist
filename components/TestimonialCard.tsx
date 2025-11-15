import React from 'react';

interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
}

const TestimonialCard = ({ name, title, quote }: TestimonialCardProps) => (
  <div className="flex flex-col items-center text-center px-4 py-8">
    <div className="text-4xl mb-4 text-[#ff5722]">&ldquo;&rdquo;</div>
    <blockquote className="text-lg sm:text-xl italic text-[#1f2933] mb-6 max-w-xl leading-[1.65]">{quote}</blockquote>
    <div className="font-bold text-[#1f2933] text-lg mb-1">{name}</div>
    <div className="text-sm text-[#3b4652]">{title}</div>
  </div>
);

export default TestimonialCard; 