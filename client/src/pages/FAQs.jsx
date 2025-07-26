import React from "react";

const faqs = [
  {
    question: "What is HireScape?",
    answer:
      "HireScape is a job board platform that connects individuals and businesses with skilled professionals for a variety of freelance or one-time jobs.",
  },
  {
    question: "How do I post a job?",
    answer:
      "Simply sign up for an account, navigate to the 'Create Job' section, and fill in the job details including title, description, budget, and deadline.",
  },
  {
    question: "How do I apply for a job?",
    answer:
      "Browse available jobs on the 'Jobs' page and click on a listing to view details. If you're interested, click 'Apply' and submit your proposal.",
  },
  {
    question: "Is there a fee to use HireScape?",
    answer:
      "Creating an account and browsing jobs is free. We may charge a small commission from either the client or professional upon successful job completion.",
  },
  {
    question: "How does payment work?",
    answer:
      "Once a job is completed and approved by the client, funds are securely transferred to the professional’s account through our integrated payment system.",
  },
  {
    question: "Can I edit or delete a posted job?",
    answer:
      "Yes, you can edit or cancel a job anytime from your dashboard under 'My Jobs'.",
  },
  {
    question: "How are users verified?",
    answer:
      "We use a multi-step verification process that includes email confirmation, profile reviews, and optional ID verification for added trust.",
  },
];

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Frequently Asked Questions</h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-5 border border-gray-100">
            <h3 className="text-lg font-semibold text-indigo-600">{faq.question}</h3>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
