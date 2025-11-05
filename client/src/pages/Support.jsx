import { useState } from "react";

const Support = () => {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I create an account?",
      answer:
        "Click the 'Sign Up' button in the top right corner and fill out the registration form with your email, username, and password.",
    },
    {
      question: "How do I add games to my cart?",
      answer:
        "Browse our game collection and click the 'Add to Cart' button on any game you'd like to purchase. You can view your cart by clicking the cart icon in the navigation.",
    },
    {
      question: "How does the wishlist work?",
      answer:
        "Click the heart icon on any game to add it to your wishlist. You can view your saved games by clicking on the 'Wishlist' link in the navigation menu.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and digital wallet payments for a secure checkout experience.",
    },
    {
      question: "How do I download my games?",
      answer:
        "After purchase, you'll receive an email with download links. You can also access your purchased games from your account dashboard.",
    },
    {
      question: "Can I get a refund?",
      answer:
        "Yes! We offer a 14-day refund policy for all digital game purchases. Contact our support team with your order details to process a refund.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page, enter your email address, and we'll send you instructions to reset your password.",
    },
    {
      question: "Are the games compatible with my system?",
      answer:
        "Each game page lists the minimum and recommended system requirements. Make sure your device meets these specifications before purchasing.",
    },
  ];

  const supportCategories = [
    {
      icon: "🛒",
      title: "Orders & Purchases",
      description: "Help with buying games, payment issues, and order tracking",
    },
    {
      icon: "📱",
      title: "Account & Login",
      description: "Account creation, password reset, and profile management",
    },
    {
      icon: "💾",
      title: "Downloads & Installation",
      description: "Game downloads, installation guides, and technical support",
    },
    {
      icon: "💳",
      title: "Billing & Refunds",
      description: "Payment methods, billing questions, and refund requests",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-purple-600 py-12 sm:py-16">
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Support Center
          </h1>
          <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
            Get help with your account, orders, and technical issues. We're here
            to help!
          </p>
        </div>
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Quick Help Categories */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            How can we help you?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4 text-center">{category.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2 text-center">
                  {category.title}
                </h3>
                <p className="text-gray-400 text-center text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Information */}
        <section className="mb-16">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
            <h2 className="text-3xl font-bold text-white text-center mb-8">
              Contact Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Email Support
                </h3>
                <p className="text-gray-400 mb-2">Get help via email</p>
                <a
                  href="mailto:support@gamestore.com"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  support@gamestore.com
                </a>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Live Chat</h3>
                <p className="text-gray-400 mb-2">Chat with our team</p>
                <button className="text-blue-400 hover:text-blue-300 transition-colors">
                  Start Chat
                </button>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Phone Support
                </h3>
                <p className="text-gray-400 mb-2">Call us directly</p>
                <a
                  href="tel:+1-555-0123"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  +1 (000) 000-0000
                </a>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400">
                <span className="font-semibold text-white">Support Hours:</span>{" "}
                Monday - Friday, 9:00 AM - 6:00 PM EST
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border-b border-gray-700 last:border-b-0"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left hover:bg-gray-750 transition-colors focus:outline-none focus:bg-gray-750"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">
                      {faq.question}
                    </h3>
                    <svg
                      className={`w-6 h-6 text-gray-400 transform transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Additional Help */}
        <section className="mt-16 text-center">
          <div className="bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Still need help?
            </h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our support team is ready to
              assist you with any questions or issues.
            </p>
            <button className="bg-white px-8 py-3 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors">
              Contact Support
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Support;
