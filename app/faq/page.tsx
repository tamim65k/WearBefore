"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I place an order?",
      answer:
        "Simply browse our products, add items to your cart, and proceed to checkout. Fill in your shipping and payment information to complete your order.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 5-7 business days. Express shipping (2-3 days) and next-day delivery options are also available.",
    },
    {
      question: "Do you offer free shipping?",
      answer: "Yes! We offer free standard shipping on all orders over $100.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy. Items must be unused and in original condition with tags attached.",
    },
    {
      question: "How do I track my order?",
      answer:
        "Once your order ships, you'll receive a tracking number via email. You can also track your order from your account dashboard.",
    },
    {
      question: "Can I cancel or modify my order?",
      answer:
        "You can cancel or modify your order within 1 hour of placing it. After that, please contact customer service for assistance.",
    },
    {
      question: "Do you ship internationally?",
      answer:
        "Yes, we ship to over 100 countries worldwide. International shipping costs and delivery times vary by location.",
    },
    {
      question: "How does the AI Virtual Try-On work?",
      answer:
        "Upload a photo of yourself, select a product, and our AI technology will show you how it looks on you. It's quick, easy, and helps you make better purchase decisions.",
    },
    {
      question: "Are the products authentic?",
      answer:
        "Yes, all our products are 100% authentic. We work directly with brands and authorized distributors.",
    },
    {
      question: "How do I contact customer service?",
      answer:
        "You can reach us through our Contact page, email at support@werebefore.com, or call us at +880 1234-567890.",
    },
    {
      question: "Do you offer gift wrapping?",
      answer:
        "Yes, we offer gift wrapping for $5 per item. Select this option during checkout.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg">
          Find answers to common questions about WereBefore
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b last:border-b-0">
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
            >
              <span className="font-semibold text-left">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-gray-600 mb-6">
          Our customer service team is here to help!
        </p>
        <a
          href="/contact"
          className="inline-block bg-gradient-to-r from-violet-700 to-indigo-600 text-white px-8 py-3 rounded-xl hover:from-violet-600 hover:to-indigo-500 transition-all font-semibold shadow-lg shadow-indigo-900/30"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
