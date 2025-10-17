import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';

const UnoCard = ({ card, onClick, isPlayable, className = '' }) => {
  const cardImage = `/cards/${card.color}_${card.value}.png`;

  return (
    <motion.div
      whileHover={isPlayable ? { scale: 1.05, y: -10 } : {}}
      whileTap={isPlayable ? { scale: 0.95 } : {}}
      className={`relative select-none-game ${className}`}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      style={{ touchAction: 'manipulation' }}
    >
      <div className={`
        w-20 h-28 sm:w-24 sm:h-36 md:w-28 md:h-40 lg:w-32 lg:h-48 
        rounded-lg shadow-card overflow-hidden
        ${isPlayable ? 'ring-2 sm:ring-4 ring-green-400 ring-opacity-75 shadow-lg shadow-green-400/50 cursor-pointer' : ''}
        ${!isPlayable ? 'opacity-50 cursor-not-allowed grayscale-[20%]' : ''}
        transition-all duration-200 border-2 border-white/10
      `}>
        <img 
          src={cardImage} 
          alt={`${card.color} ${card.value}`}
          className="w-full h-full object-cover select-none"
          draggable="false"
          onError={(e) => {
            e.target.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"/>';
            e.target.style.background = '#333';
          }}
        />
      </div>
      
      {/* Playable indicator badge for better UX */}
      {isPlayable && (
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-white text-xs sm:text-sm font-bold">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
};

export default UnoCard;
