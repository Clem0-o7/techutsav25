"use client";
import { motion } from "framer-motion";

const SpotlightCard = ({ name, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      className="card-spotlight w-full cursor-pointer"
      style={{
        position: "relative",
        marginBottom: "30px",
        overflow: "hidden",
        borderRadius: "12px",
        background: "linear-gradient(135deg, #3373B0, #BED4E9)",
        height: "200px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
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
      <div
        className="overlay"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "rgba(0, 0, 0, 0.3)"
        }}
      />
      <h2 className="text-2xl font-bold text-white relative">{name}</h2>
      <button
        className="mt-2 px-4 py-2 bg-white/20 rounded-full text-sm font-medium hover:bg-white/30 transition-colors relative"
        style={{ color: "#ffffff" }}
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
