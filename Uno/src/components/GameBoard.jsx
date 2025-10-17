import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Shuffle } from 'lucide-react';

const GameBoard = () => {
  const { deck, getTopCard, playerDrawCard, getCurrentPlayer, gameDirection } = useGame();
  const topCard = getTopCard();
  
  const topCardImage = topCard 
    ? `/cards/${topCard.color}_${topCard.value}.png`
    : null;
  const cardBackImage = '/cards/N.png';

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      {/* Card Piles Container */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 md:gap-16 py-8">
        {/* Draw Pile */}
        <motion.div
          className="relative cursor-pointer group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={playerDrawCard}
        >
          <div className="w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-60 rounded-xl shadow-card-hover overflow-hidden bg-gray-800">
            <img 
              src={cardBackImage} 
              alt="Draw Pile"
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors duration-200 rounded-xl flex items-center justify-center">
            <Shuffle className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 sm:w-12 sm:h-12" />
          </div>
        </motion.div>

        {/* Discard Pile */}
        <AnimatePresence mode="wait">
          {topCard && (
            <motion.div
              key={topCard.id}
              className="w-24 h-36 sm:w-32 sm:h-48 md:w-40 md:h-60 rounded-xl shadow-card-hover overflow-hidden"
              initial={{ opacity: 0, rotate: -180, scale: 0 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <img 
                src={topCardImage} 
                alt={`${topCard.color} ${topCard.value}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GameBoard;
