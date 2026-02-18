"use client";
import { motion } from "framer-motion";

const SpotlightCard = ({ name, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="card-spotlight w-full cursor-pointer relative mb-8 overflow-hidden rounded-xl h-[200px] flex flex-col justify-center items-center bg-gradient-to-br from-primary via-accent to-primary/80 shadow-lg hover:shadow-primary/30"
      whileHover={{
        scale: 1.05,
        rotate: Math.random() > 0.5 ? -5 : 5
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 10
      }}
    >
      <div className="absolute inset-0 bg-black/30" />
      
      <h2 className="text-2xl font-bold text-white relative z-10">{name}</h2>
      <button
        className="mt-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-colors relative z-10 text-white"
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
      >
        See More
      </button>
    </motion.div>
  );
};

export default SpotlightCard;
