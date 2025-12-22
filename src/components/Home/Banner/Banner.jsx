import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { FaArrowRight, FaBook, FaTruck, FaUsers } from "react-icons/fa";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Books Delivered to Your Doorstep",
      subtitle: "Fast & Reliable Book Courier Service",
      description: "Experience the convenience of getting your favorite books delivered right to your doorstep. No more waiting in queues or traveling to libraries.",
      buttonText: "Start Reading Today",
      buttonLink: "/all-books",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2024&q=80",
      icon: <FaBook className="text-blue-500" />,
      gradient: "from-blue-600 to-purple-600"
    },
    {
      id: 2,
      title: "Pickup from Nearby Libraries",
      subtitle: "Seamless Library Integration",
      description: "Connect with libraries in your area for instant book pickup and delivery. Access thousands of books without leaving your home.",
      buttonText: "Find Libraries",
      buttonLink: "/all-books",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2024&q=80",
      icon: <FaTruck className="text-green-500" />,
      gradient: "from-green-600 to-teal-600"
    },
    {
      id: 3,
      title: "Join Our Reading Community",
      subtitle: "Connect with Fellow Book Lovers",
      description: "Become part of a vibrant community of readers. Share recommendations, discover new authors, and never run out of great books to read.",
      buttonText: "Join Community",
      buttonLink: "/contact",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2024&q=80",
      icon: <FaUsers className="text-purple-500" />,
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
          renderBullet: (index, className) => {
            return `<span class="${className} custom-bullet"></span>`;
          },
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            {/* Background Image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`,
              }}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              {/* Overlay */}
              <motion.div
                className="absolute inset-0 bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
              ></motion.div>
              <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-20`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                transition={{ duration: 1.5, delay: 0.5 }}
              ></motion.div>
            </motion.div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
              <div className="w-full max-w-6xl text-center text-white">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="mb-6"
                >
                  {/* Badge Animation */}
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full mb-4 pt-2 border border-white/20"
                  >
                    <motion.span
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                      className="text-2xl"
                    >
                      {slide.icon}
                    </motion.span>
                    <span className="font-medium">{slide.subtitle}</span>
                  </motion.div>

                  {/* Title Animation */}
                  <motion.h1
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
                  >
                    {slide.title.split(' ').map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.5,
                          delay: 1 + index * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="inline-block mr-3"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </motion.h1>

                  {/* Description Animation */}
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.8,
                      delay: 1.2,
                      type: "spring",
                      stiffness: 100
                    }}
                    className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed mb-6"
                  >
                    {slide.description}
                  </motion.p>

                  {/* Button Animation */}
                  <motion.button
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.5,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(255, 255, 255, 0.2)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = slide.buttonLink}
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold py-4 px-8 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-white/20 inline-flex items-center gap-3 text-lg group"
                  >
                    <span>{slide.buttonText}</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 2
                      }}
                    >
                      <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-200" />
                    </motion.span>
                  </motion.button>

                  {/* Additional Elements Animation */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: 1.8,
                      type: "spring",
                      stiffness: 150
                    }}
                    className="flex justify-center items-center gap-6 mt-8 text-sm text-gray-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                    >
                      <span>✨</span>
                      <span>Free Delivery</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                    >
                      <span>📚</span>
                      <span>10,000+ Books</span>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
                    >
                      <span>🚚</span>
                      <span>24/7 Service</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        whileHover={{
          scale: 1.1,
          backgroundColor: "rgba(255, 255, 255, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        className="swiper-button-prev-custom absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
      >
        <motion.svg
          className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{ scale: 1.1 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </motion.svg>
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        whileHover={{
          scale: 1.1,
          backgroundColor: "rgba(255, 255, 255, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        className="swiper-button-next-custom absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-300 group shadow-lg"
      >
        <motion.svg
          className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          whileHover={{ scale: 1.1 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      </motion.button>

      {/* Custom Pagination */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 2.2 }}
        className="swiper-pagination-custom absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3"
      ></motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, duration: 0.6, type: "spring", stiffness: 200 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center cursor-pointer group"
        >
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.5, 1]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-1 h-3 bg-white rounded-full mt-2 group-hover:bg-blue-300 transition-colors"
          ></motion.div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.5 }}
          className="text-white/70 text-xs mt-2 text-center"
        >
          Scroll Down
        </motion.p>
      </motion.div>

      <style jsx>{`
        .swiper-pagination-custom {
          display: flex;
          gap: 12px;
        }

        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .swiper-pagination-bullet-active {
          background: white;
          transform: scale(1.2);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .custom-bullet {
          display: inline-block;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default Banner;
