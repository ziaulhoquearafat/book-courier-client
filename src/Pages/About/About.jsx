import { motion } from "framer-motion";
import {
  FaBook,
  FaBookOpen,
  FaCheckCircle,
  FaClock,
  FaGraduationCap,
  FaHeart,
  FaMicroscope,
  FaRocket,
  FaShieldAlt,
  FaStar,
  FaTruck,
  FaUsers,
} from "react-icons/fa";

const About = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: <FaTruck className="text-blue-500" />,
      title: "Fast Delivery",
      description: "Quick and reliable book delivery to your doorstep",
    },
    {
      icon: <FaClock className="text-green-500" />,
      title: "24/7 Service",
      description: "Round-the-clock support for all your library needs",
    },
    {
      icon: <FaShieldAlt className="text-purple-500" />,
      title: "Secure & Safe",
      description: "Your books and data are protected with enterprise security",
    },
    {
      icon: <FaUsers className="text-orange-500" />,
      title: "Community Focused",
      description: "Building stronger communities through accessible education",
    },
  ];

  const stats = [
    { number: "10,000+", label: "Books Available", icon: <FaBook /> },
    { number: "5,000+", label: "Happy Users", icon: <FaUsers /> },
    { number: "50+", label: "Partner Libraries", icon: <FaBookOpen /> },
    { number: "99%", label: "Satisfaction Rate", icon: <FaStar /> },
  ];

  const userTypes = [
    {
      icon: <FaGraduationCap className="text-blue-500" />,
      title: "Students",
      description: "Access textbooks and study materials anytime, anywhere",
    },
    {
      icon: <FaMicroscope className="text-green-500" />,
      title: "Researchers",
      description: "Get research papers and academic resources delivered",
    },
    {
      icon: <FaBookOpen className="text-purple-500" />,
      title: "Book Lovers",
      description: "Discover and enjoy books from the comfort of home",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg border border-gray-100 mb-8"
            >
              <FaRocket className="text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                About BookCourier
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              Revolutionizing
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}
                Library
              </span>
              <br />
              Access
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
            >
              BookCourier is a library delivery management system where users
              can request book pickup or delivery from their nearby libraries.
              The system helps students, researchers, and readers borrow and
              return books without physically visiting the library.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Empowering Knowledge Access
                </h2>
                <div className="space-y-4 text-gray-600 leading-relaxed">
                  <p>
                    In today's fast-paced world, accessing quality educational
                    resources shouldn't be limited by time or location.
                    BookCourier bridges this gap by providing seamless library
                    services directly to your doorstep.
                  </p>
                  <p>
                    Our platform connects readers, students, and researchers
                    with libraries across the region, making knowledge truly
                    accessible and democratic. Whether you're a student
                    preparing for exams or a researcher exploring new frontiers,
                    we're here to support your journey.
                  </p>
                </div>
              </div>

              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 gap-6"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Easy Ordering
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Fast Delivery
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Secure Payments
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <FaCheckCircle className="text-green-600 text-sm" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    24/7 Support
                  </span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeInUp} className="relative">
              <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      50+
                    </div>
                    <div className="text-sm text-gray-600">Libraries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-600 mb-2">
                      10K+
                    </div>
                    <div className="text-sm text-gray-600">Books</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      5K+
                    </div>
                    <div className="text-sm text-gray-600">Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      99%
                    </div>
                    <div className="text-sm text-gray-600">Satisfaction</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Who We Serve
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              BookCourier serves diverse communities of knowledge seekers
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {userTypes.map((userType, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center group"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-3xl group-hover:scale-110 transition-transform duration-300">
                  {userType.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {userType.title}
                </h3>
                <p className="text-gray-600">{userType.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-8">
              <FaHeart className="text-pink-300" />
              <span className="font-medium">Our Mission</span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Making Knowledge Accessible to Everyone
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
              We believe that access to knowledge should never be limited by
              geography, time, or circumstance. Our mission is to democratize
              education by connecting people with the resources they need to
              learn, grow, and succeed.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
