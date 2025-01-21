/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Link } from "react-router"
import Footer from "../../components/Footer";

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

      const faqs = [
    {
      question: "What is included in my subscription plan?",
      answer:
        "Your subscription plan includes features such as student management, attendance tracking, grading and reporting, teacher management, and more. For a detailed breakdown of your plan, please refer to the Pricing and Plan page.",
    },
    {
      question: "Can I upgrade or downgrade my subscription plan?",
      answer: "Yes, you can upgrade or downgrade your plan at any time based on your school's needs. Changes will take effect immediately, and any price adjustments will be reflected in your next billing cycle.",
    },
    {
      question: "What happens if I miss a payment?",
      answer: "If a payment is missed, you will be notified via email and given a grace period to update your payment details. During this period, your access to some features may be limited until the payment is resolved.",
    },
    {
      question: "How secure is the data stored in the system?",
      answer: "We prioritize data security and compliance with industry standards. All data is encrypted and securely stored, with regular backups and strict access controls to ensure the safety of your school’s information.",
    },
    {
      question: "Can I cancel my subscription at any time?",
      answer: "Yes, you can cancel your subscription at any time from the account settings. Once canceled, you will still have access to the system until the end of your current billing period",
    },
  ];

  const toggleFAQ = (index: any) => {
    setOpenIndex(openIndex === index ? null : index);
  };

    const filteredFaqs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="border p-5 md:p-10">
      <div className="bg-helpBg bg-cover bg-top md:h-[40vh] p-10 md:p-16">
        <h1 className="text-4xl font-semibold text-black">Help Center</h1>

        <div className="flex items-center gap-5 my-7">
          <Link to="/faq" className="underline text-primary-light font-semibold">FAQ</Link>
          <Link to="/help" className="underline text-primary-light font-semibold">Contact Support</Link>
        </div>

        <p>How can we help you?</p>

        <div className="mt-5 md:w-[30%] relative">
          <img src="/search-icon.svg" className="absolute left-4 top-3.5" alt="" />
          <input type="text" placeholder="Search FAQs" className="outline-primary-light rounded-md px-14 py-4 text-sm w-full" value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      </div>


      <div className="mt-10 md:mt-20">
        <h1 className="text-4xl font-semibold text-center">Frequently Asked Questions</h1>

        <div className="md:max-w-4xl mx-auto mt-10 md:p-6 flex flex-col gap-3">
          {filteredFaqs.map((faq, index) => (
            <div key={index} className="border rounded-md p-3">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center text-gray-800 font-medium focus:outline-none"
              >
                <span>{faq.question}</span>
                <span
                  className={`ml-4 transform transition-transform ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                >
                  +
                </span>
              </button>
              {openIndex === index && (
                <p className="mt-2 text-gray-600 text-sm">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

    <Footer />
    </>
  )
}

export default Help