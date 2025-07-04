'use client';
import { useState } from 'react';
import {
  SignInButton,
} from '@clerk/nextjs'

export default function Hamburger() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="lg:hidden">
      {/* Hamburger Icon */}
      <button
        className="text-3xl text-gray-700 hover:text-blue-600 transition-colors duration-200"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        ☰
      </button>

      {/* Slide-down Mobile Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full bg-white shadow-xl z-50 p-6 rounded-b-xl border-b border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold text-gray-800">Menu</span>
            <button
              className="text-3xl text-gray-500 hover:text-red-500 transition"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          <ul className="space-y-5 mb-6">
            <li>
              <a
                href="#my-section"
                onClick={() => setIsOpen(false)}
                className="block text-lg text-gray-600 hover:text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#my-section2"
                onClick={() => setIsOpen(false)}
                className="block text-lg text-gray-600 hover:text-blue-600 px-4 py-2 rounded hover:bg-blue-50 transition"
              >
                How it Works
              </a>
            </li>
          </ul>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <SignInButton>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto text-center text-white bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded shadow transition"
            >
              Get Started
            </button></SignInButton>
            <SignInButton>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full sm:w-auto text-center text-blue-600 border border-blue-600 hover:bg-blue-50 px-5 py-2 rounded shadow-sm transition"
            >
              Sign In
            </button>
            </SignInButton>
          </div>
        </div>
      )}
    </div>
  );
}
