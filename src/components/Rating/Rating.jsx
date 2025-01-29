import { useState, useEffect, useRef } from "react";
import "./Rating.css";
import { toast } from "react-toastify";

const Rating = ({ onRate }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const toastShown = useRef(false); // Evita que React sobrescriba el toast

  const handleRate = (value, e) => {
    e.stopPropagation(); // Bloquea que se abra el juego
    e.preventDefault(); // Evita cualquier otro comportamiento inesperado

    setRating(value);
    setShowMessage(true);
    if (onRate) onRate(value);

    if (!toastShown.current) {
      toast.success(`💖 Thank you for rating ${value} hearts!`, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
      });
      toastShown.current = true; // Evita múltiples toasts
    }

    // Ocultar mensaje después de 3 segundos
    setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <div className="rating-container" onClick={(e) => e.stopPropagation()}>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((heart) => (
          <img
            key={heart}
            src="/heart.png"
            alt={`${heart} hearts`}
            className={`heart-icon ${heart <= (hover || rating) ? "filled" : ""}`}
            onClick={(e) => handleRate(heart, e)}
            onMouseEnter={() => setHover(heart)}
            onMouseLeave={() => setHover(0)}
          />
        ))}
      </div>
      {showMessage && <p className="thanks-message">💖 Thanks for your rating!</p>}
    </div>
  );
};

export default Rating;
