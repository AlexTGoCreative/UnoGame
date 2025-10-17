import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Palette, Sparkles } from 'lucide-react';

const ColorPicker = () => {
  const { showColorPicker, selectWildColor } = useGame();

  const colors = [
    { name: 'Red', bg: 'bg-red-500', hover: 'hover:bg-red-600', emoji: '🔴', gradient: 'from-red-400 to-red-600' },
    { name: 'Blue', bg: 'bg-blue-500', hover: 'hover:bg-blue-600', emoji: '🔵', gradient: 'from-blue-400 to-blue-600' },
    { name: 'Green', bg: 'bg-green-500', hover: 'hover:bg-green-600', emoji: '🟢', gradient: 'from-green-400 to-green-600' },
    { name: 'Yellow', bg: 'bg-yellow-400', hover: 'hover:bg-yellow-500', emoji: '🟡', gradient: 'from-yellow-300 to-yellow-500' },
  ];

  return (
    <AnimatePresence>
      {showColorPicker && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl max-w-md w-full relative overflow-hidden"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-50 -z-10" />

            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="mr-3"
              >
                <Palette className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />
              </motion.div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
                Choose a Color
              </h3>
            </div>

            <motion.p 
              className="text-center text-gray-600 mb-6 text-sm sm:text-base"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Select the color for the Wild card
            </motion.p>
            
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {colors.map(({ name, bg, hover, emoji, gradient }, index) => (
                <motion.button
                  key={name}
                  onClick={() => selectWildColor(name)}
                  className={`
                    bg-gradient-to-br ${gradient}
                    text-white font-bold py-6 sm:py-8 px-4 sm:px-6 rounded-2xl
                    text-base sm:text-xl transition-all duration-200
                    transform active:scale-95
                    shadow-lg hover:shadow-2xl
                    flex flex-col items-center justify-center gap-2
                    border-2 border-white/50
                    relative overflow-hidden group
                  `}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <motion.span 
                    className="text-3xl sm:text-4xl relative z-10"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {emoji}
                  </motion.span>
                  <span className="relative z-10 font-extrabold tracking-wide">
                    {name}
                  </span>
                </motion.button>
              ))}
            </div>

            <motion.div
              className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0" />
              <p className="text-xs sm:text-sm text-gray-700">
                Tap any color to continue playing
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ColorPicker;
