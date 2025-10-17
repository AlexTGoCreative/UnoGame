import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Crown } from 'lucide-react';

const OpponentDisplay = ({ playerName }) => {
  const { playerHands, currentPlayerIndex, players } = useGame();
  const cards = playerHands[playerName] || [];
  const isCurrentPlayer = players[currentPlayerIndex] === playerName;
  
  const cardBackImage = '/cards/N.png';

  return (
    <motion.div
      className={`
        bg-white/10 backdrop-blur-md p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg border-2
        ${isCurrentPlayer ? 'border-yellow-400 ring-2 ring-yellow-300/50 shadow-yellow-400/30' : 'border-white/20'}
        transition-all duration-300 hover:bg-white/15
      `}
      animate={isCurrentPlayer ? { 
        scale: [1, 1.03, 1],
        boxShadow: ['0 0 0 0 rgba(251, 191, 36, 0)', '0 0 20px 5px rgba(251, 191, 36, 0.3)', '0 0 0 0 rgba(251, 191, 36, 0)']
      } : { scale: 1 }}
      transition={{ duration: 1.5, repeat: isCurrentPlayer ? Infinity : 0 }}
    >
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-2 mb-1">
          {isCurrentPlayer && (
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 1 }}
            >
              <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
            </motion.div>
          )}
          <h4 className="text-white font-bold text-sm sm:text-base md:text-lg truncate max-w-[120px] sm:max-w-none">
            {playerName}
          </h4>
          {isCurrentPlayer && (
            <motion.span
              className="text-lg sm:text-xl"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            >
              ⭐
            </motion.span>
          )}
        </div>
        <div className="inline-flex items-center gap-1 bg-white/20 px-2 py-1 rounded-full">
          <span className="text-white/90 text-xs sm:text-sm font-semibold">{cards.length}</span>
          <span className="text-white/70 text-xs">cards</span>
        </div>
      </div>
      
      <div className="flex justify-center items-center min-h-[60px] sm:min-h-[72px]">
        <div className="flex gap-[-10px]">
          {cards.slice(0, Math.min(cards.length, 5)).map((_, index) => (
            <motion.div
              key={index}
              className="w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 -ml-1.5 sm:-ml-2 first:ml-0"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5, scale: 1.05 }}
            >
              <img 
                src={cardBackImage} 
                alt="Card back"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </motion.div>
          ))}
          {cards.length > 5 && (
            <motion.div 
              className="w-10 h-14 sm:w-12 sm:h-16 md:w-14 md:h-20 -ml-1.5 sm:-ml-2 flex items-center justify-center bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg shadow-md"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="text-white font-bold text-xs sm:text-sm">+{cards.length - 5}</span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OpponentDisplay;
