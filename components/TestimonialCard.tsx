import React from 'react';

interface TestimonialCardProps {
  name: string;
  title: string;
  quote: string;
}

const TestimonialCard = ({ name, title, quote }: TestimonialCardProps) => (
  <div className="flex flex-col items-center text-center px-4 py-8">
    <div className="text-4xl mb-4 text-[#ff5722]">&ldquo;&rdquo;</div>
    <blockquote className="text-xl italic text-gray-800 mb-6 max-w-xl">{quote}</blockquote>
    <div className="font-bold text-[#111] text-lg mb-1">{name}</div>
    <div className="text-sm text-gray-500">{title}</div>
  </div>
);

export default TestimonialCard; 