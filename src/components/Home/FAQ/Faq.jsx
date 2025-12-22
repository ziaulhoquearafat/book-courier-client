import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
  FaBook,
  FaUser,
  FaShoppingCart,
  FaCreditCard,
  FaTruck,
  FaHeadset,
  FaLock
} from "react-icons/fa";

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      id: 1,
      question: "How do I create an account on BookCourier?",
      answer: "Creating an account is simple! Click on the 'Register' button in the top navigation, fill in your basic information (name, email, password), and verify your email. Once registered, you can start browsing and ordering books immediately.",
      icon: <FaUser className="text-blue-500" />,
      category: "Account"
    },
    {
      id: 2,
      question: "How do I log in to my account?",
      answer: "Click the 'Login' button in the navigation bar. Enter your registered email and password. If you've forgotten your password, click 'Forgot Password' to reset it. For security, we recommend enabling two-factor authentication.",
      icon: <FaLock className="text-green-500" />,
      category: "Account"
    },
    {
      id: 3,
      question: "How do I place a book order?",
      answer: "Browse our collection using the search and filter options. Click on any book to view details, then click 'Order Now'. Complete the checkout process by providing delivery information and payment details. You'll receive a confirmation email with tracking information.",
      icon: <FaShoppingCart className="text-purple-500" />,
      category: "Orders"
    },
    {
      id: 4,
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards (Visa, MasterCard, American Express), PayPal, and digital wallets. All payments are processed securely through encrypted gateways. For orders over $50, we also offer installment payment options.",
      icon: <FaCreditCard className="text-indigo-500" />,
      category: "Payment"
    },
    {
      id: 5,
      question: "How long does delivery take?",
      answer: "Standard delivery takes 2-3 business days within the city. Express delivery (24-48 hours) is available for urgent orders. Rural areas may take 4-5 business days. You can track your order status in real-time through your dashboard.",
      icon: <FaTruck className="text-orange-500" />,
      category: "Delivery"
    },
    {
      id: 6,
      question: "Can I return or exchange a book?",
      answer: "Yes! We offer a 14-day return policy for unused books in their original condition. Contact our support team to arrange pickup. Exchanges are processed within 3-5 business days. Digital books are not eligible for returns unless there's a technical issue.",
      icon: <FaBook className="text-red-500" />,
      category: "Returns"
    },
    {
      id: 7,
      question: "How can I contact customer support?",
      answer: "You can reach us through multiple channels: email (support@bookcourier.com), phone (24/7 helpline), live chat on our website, or through the contact form. Our average response time is under 2 hours during business hours.",
      icon: <FaHeadset className="text-teal-500" />,
      category: "Support"
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
            <FaQuestionCircle className="text-xl" />
            <span className="font-semibold">Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Got Questions?
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> We've Got Answers</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to the most common questions about BookCourier. Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {["All", "Account", "Orders", "Payment", "Delivery", "Returns", "Support"].map((category, index) => (
            <motion.button
              key={category}
              variants={fadeInUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-white hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-full border border-gray-200 hover:border-blue-300 transition-all duration-200 shadow-sm"
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex items-center justify-center">
                    {faq.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {faq.question}
                    </h3>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                      {faq.category}
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 text-gray-500"
                >
                  {openIndex === index ? <FaChevronUp /> : <FaChevronDown />}
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-gray-100 bg-gradient-to-r from-gray-50 to-blue-50">
                      <p className="text-gray-700 leading-relaxed pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaHeadset className="text-2xl text-blue-200" />
            <span className="text-xl font-semibold">Still Have Questions?</span>
          </div>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Our support team is here to help! Reach out to us through any of our contact channels.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/all-books'}
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-6 rounded-xl transition-all duration-200"
            >
              Browse Books
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { number: "10K+", label: "Questions Answered", icon: <FaQuestionCircle className="text-blue-500" /> },
            { number: "24/7", label: "Support Available", icon: <FaHeadset className="text-green-500" /> },
            { number: "<2hrs", label: "Average Response", icon: <FaBook className="text-purple-500" /> },
            { number: "98%", label: "Satisfaction Rate", icon: <FaUser className="text-orange-500" /> }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 bg-white rounded-xl shadow-lg border border-gray-100"
            >
              <div className="text-2xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Faq;
