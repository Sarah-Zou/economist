import React from 'react'
import { Mail, Linkedin } from 'lucide-react'

export default function ContactPage() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] py-20">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg mx-auto p-8 md:p-16">
        <h1 className="font-serif-playfair text-4xl font-bold mb-8 text-[#111] text-center">Let's Connect</h1>
        <p className="mb-6 text-gray-700 text-lg text-center">
          Interested in working together, booking me for a speaking event, or just saying hello?
        </p>
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="flex gap-4">
            <a href="mailto:sarahz@rooba.tech" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e64a19] font-medium text-lg" target="_blank" rel="noopener noreferrer">
              <Mail className="w-6 h-6" /> Email
            </a>
            <a href="https://www.linkedin.com/in/drsarah-saas-economist" className="inline-flex items-center gap-2 text-[#ff5722] hover:text-[#e64a19] font-medium text-lg" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6" /> LinkedIn
            </a>
          </div>
        </div>
        <p className="mb-10 text-gray-700 text-center text-base">Or simply fill out the form below:</p>
        <form className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="flex-1 px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="flex-1 px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
            required
          />
          <textarea
            name="message"
            placeholder="Say Hello"
            rows={5}
            className="w-full px-4 py-3 border border-[#f5f5f5] bg-[#fafafa] rounded focus:outline-none focus:ring-2 focus:ring-[#06b6d4] text-[#111]"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#ff5722] text-white font-bold py-3 rounded transition-colors hover:bg-[#e64a19] focus:outline-none focus:ring-2 focus:ring-[#ff5722] tracking-wider text-lg mt-2"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  )
} 