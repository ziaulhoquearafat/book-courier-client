import { motion } from "framer-motion";
import {
  FaCcMastercard,
  FaCcPaypal,
  FaCcVisa,
  FaCreditCard,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import LogoWhite from "../../../components/Logo/LogoWhite";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
      </div>

      <motion.div
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Logo and Description Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-4 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div>
                <LogoWhite />
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 leading-relaxed mb-8 max-w-md"
            >
              Access any book from partnered libraries without leaving home.
              BookCourier makes borrowing books as simple as a few clicks.
            </motion.p>

            {/* Trustpilot Rating */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4].map((star) => (
                  <svg
                    key={star}
                    className="w-5 h-5 fill-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z" />
                  </svg>
                ))}
                <svg className="w-5 h-5 fill-gray-600" viewBox="0 0 24 24">
                  <path d="m23.363 8.584-7.378-1.127L12.678.413c-.247-.526-1.11-.526-1.357 0L8.015 7.457.637 8.584a.75.75 0 0 0-.423 1.265l5.36 5.494-1.267 7.767a.75.75 0 0 0 1.103.777L12 20.245l6.59 3.643a.75.75 0 0 0 1.103-.777l-1.267-7.767 5.36-5.494a.75.75 0 0 0-.423-1.266z" />
                </svg>
              </div>
              <span className="text-sm text-gray-400">4.8/5 on Trustpilot</span>
            </motion.div>
          </motion.div>

          {/* Navigation Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-white">
              Quick Links
            </h4>
            <div className="space-y-4">
              <motion.a
                href="/about"
                className="block text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-2"
                whileHover={{ x: 8 }}
              >
                About Us
              </motion.a>
              <motion.a
                href="/contact"
                className="block text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-2"
                whileHover={{ x: 8 }}
              >
                Contact Us
              </motion.a>
            </div>
          </motion.div>

          {/* Social Media Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-lg font-semibold mb-6 text-white">Follow Us</h4>
            <div className="flex gap-4">
              <motion.a
                href="https://www.facebook.com/mdziaulhaque.arafat.58/"
                target="_blank"
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFacebookF className="text-white text-sm" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTwitter className="text-white text-sm" />
              </motion.a>
              <motion.a
                href="#"
                className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram className="text-white text-sm" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/ziaul-hoque-arafat/"
                target="_blank"
                className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedinIn className="text-white text-sm" />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="border-t border-gray-700 my-12"
          variants={itemVariants}
        ></motion.div>

        {/* Bottom Section - Copyright and Payment Methods */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col lg:flex-row justify-between items-center gap-6"
        >
          {/* Copyright */}
          <div className="text-center lg:text-left">
            <p className="text-gray-400 text-sm">
              © 2025 BookCourier. All rights reserved. | Designed By Ziaul Hoque
              Arafat
            </p>
          </div>

          {/* Payment Methods */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-400 hidden lg:block">
              We accept:
            </span>
            <div className="flex items-center gap-2">
              <motion.div
                className="w-8 h-6 bg-blue-600 rounded flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <FaCcVisa className="text-white text-5xl" />
              </motion.div>
              <motion.div
                className="w-8 h-6 bg-red-600 rounded flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <FaCcMastercard className="text-white text-5xl" />
              </motion.div>
              <motion.div
                className="w-8 h-6 bg-blue-700 rounded flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <FaCcPaypal className="text-white text-5xl" />
              </motion.div>
              <motion.div
                className="w-8 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
              >
                <FaCreditCard className="text-white text-5xl" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
