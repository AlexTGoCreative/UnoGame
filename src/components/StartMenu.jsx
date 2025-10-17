import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '../context/GameContext';
import { Users, Play, Plus, Minus, Sparkles, GamepadIcon } from 'lucide-react';

const StartMenu = () => {
  const { startGame } = useGame();
  const [playerNames, setPlayerNames] = useState(['You', 'Bot 1']);
  const [showSetup, setShowSetup] = useState(false);
  const [showRules, setShowRules] = useState(false);

  const addPlayer = () => {
    if (playerNames.length < 4) {
      setPlayerNames([...playerNames, `Bot ${playerNames.length}`]);
    }
  };

  const removePlayer = () => {
    if (playerNames.length > 2) {
      setPlayerNames(playerNames.slice(0, -1));
    }
  };

  const updatePlayerName = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };

  const handleBlur = (index) => {
    // Only set default name on blur if the field is empty
    if (!playerNames[index] || playerNames[index].trim() === '') {
      const newNames = [...playerNames];
      newNames[index] = `Player ${index + 1}`;
      setPlayerNames(newNames);
    }
  };

  const handleStart = () => {
    startGame(playerNames);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto relative">
      {/* Animated background elements - UNO colored cards */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 left-10 w-24 h-36 bg-red-600 rounded-2xl opacity-20 blur-sm transform rotate-12"
          animate={{ 
            y: [0, 50, 0],
            rotate: [12, 25, 12],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-36 bg-yellow-500 rounded-2xl opacity-20 blur-sm transform -rotate-12"
          animate={{ 
            y: [0, -40, 0],
            rotate: [-12, -25, -12],
          }}
          transition={{ duration: 7, repeat: Infinity, delay: 0.5 }}
        />
        <motion.div
          className="absolute bottom-32 left-32 w-24 h-36 bg-blue-600 rounded-2xl opacity-20 blur-sm transform rotate-45"
          animate={{ 
            y: [0, 30, 0],
            rotate: [45, 60, 45],
          }}
          transition={{ duration: 9, repeat: Infinity, delay: 1 }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-24 h-36 bg-green-500 rounded-2xl opacity-20 blur-sm transform -rotate-6"
          animate={{ 
            y: [0, -30, 0],
            rotate: [-6, -20, -6],
          }}
          transition={{ duration: 10, repeat: Infinity, delay: 1.5 }}
        />
      </div>

      <motion.div
        className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 max-w-2xl w-full relative z-10 border-4 border-white"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        >
          {/* CSS UNO Logo */}
          <div className="mx-auto mb-6 flex justify-center">
            <motion.div
              className="relative"
              animate={{ 
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* UNO Text with gradient background */}
              <div className="bg-gradient-to-r from-red-600 via-yellow-500 to-blue-600 p-1.5 rounded-3xl shadow-2xl transform -rotate-3">
                <div className="bg-white px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-8 rounded-3xl">
                  <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter">
                    <span className="inline-block text-red-600 transform -rotate-6 hover:rotate-0 transition-transform duration-300">U</span>
                    <span className="inline-block text-yellow-500 transform rotate-3 hover:rotate-0 transition-transform duration-300">N</span>
                    <span className="inline-block text-blue-600 transform -rotate-3 hover:rotate-0 transition-transform duration-300">O</span>
                  </h1>
                </div>
              </div>
              
              {/* Decorative elements */}
              <motion.div
                className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-2 -left-2 w-6 h-6 bg-red-500 rounded-full"
                animate={{ scale: [1, 1.3, 1], rotate: [0, -180, -360] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />
            </motion.div>
          </div>
          
          <motion.p 
            className="text-gray-700 mt-2 text-base sm:text-lg md:text-xl font-bold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            The Classic Card Game
          </motion.p>
        </motion.div>

        {!showSetup ? (
          <motion.div
            className="space-y-4 md:space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <motion.button
              onClick={() => setShowSetup(true)}
              className="w-full bg-red-600 text-white font-black py-5 px-6 sm:px-8 rounded-2xl text-xl sm:text-2xl shadow-lg hover:shadow-2xl transition-all duration-200 relative overflow-hidden group border-4 border-red-700"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-3 tracking-wide">
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
                START NEW GAME
              </span>
            </motion.button>

            <motion.button
              onClick={() => setShowRules(true)}
              className="w-full bg-blue-600 text-white font-black py-5 px-6 sm:px-8 rounded-2xl text-xl sm:text-2xl shadow-lg hover:shadow-2xl transition-all duration-200 relative overflow-hidden group border-4 border-blue-700"
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="absolute inset-0 bg-blue-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-3 tracking-wide">
                <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                GAME RULES
              </span>
            </motion.button>

            <motion.div
              className="mt-8 p-6 bg-yellow-400 rounded-2xl border-4 border-yellow-500 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-start gap-3">
                <Sparkles className="w-7 h-7 text-yellow-800 flex-shrink-0 mt-1" />
                <div className="text-sm text-gray-900">
                  <p className="font-black mb-2 text-yellow-900 text-lg">QUICK TIPS</p>
                  <ul className="space-y-1.5 text-sm sm:text-base font-semibold">
                    <li>🎯 Match the color or number to play</li>
                    <li>⚡ Use action cards strategically</li>
                    <li>🃏 Draw a card if you can't play</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 flex items-center gap-3 tracking-tight">
                    <GamepadIcon className="w-8 h-8 md:w-10 md:h-10 text-red-600" />
                    SETUP PLAYERS
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 font-semibold">Add 2-4 players to start the game</p>
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={removePlayer}
                    disabled={playerNames.length <= 2}
                    className="p-3 sm:p-4 bg-red-600 text-white rounded-xl hover:bg-red-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg border-2 border-red-700 font-bold"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                  <motion.button
                    onClick={addPlayer}
                    disabled={playerNames.length >= 4}
                    className="p-3 sm:p-4 bg-green-600 text-white rounded-xl hover:bg-green-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg border-2 border-green-700 font-bold"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>
                </div>
              </div>

              <div className="space-y-4">
                {playerNames.map((name, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => updatePlayerName(index, e.target.value)}
                      onBlur={() => handleBlur(index)}
                      placeholder={`Player ${index + 1} Name`}
                      className="w-full px-4 py-4 sm:py-5 border-4 border-gray-300 rounded-2xl focus:border-gray-900 focus:outline-none text-base sm:text-xl font-bold transition-all shadow-md"
                    />
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button
                onClick={() => setShowSetup(false)}
                className="flex-1 bg-gray-800 text-white font-black py-4 sm:py-5 px-6 rounded-2xl hover:bg-gray-900 transition-all text-lg sm:text-xl shadow-lg border-4 border-gray-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ← BACK
              </motion.button>
              <motion.button
                onClick={handleStart}
                className="flex-1 bg-green-600 text-white font-black py-4 sm:py-5 px-6 rounded-2xl hover:bg-green-700 transition-all text-lg sm:text-xl shadow-lg border-4 border-green-700 relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="absolute inset-0 bg-green-700 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative">START GAME →</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>

      {/* Rules Modal */}
      {showRules && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setShowRules(false)}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative border-4 border-gray-200 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 text-center">
              🎮 UNO GAME RULES
            </h2>
            
            <div className="space-y-6 text-gray-800">
              <section>
                <h3 className="text-xl font-black text-red-600 mb-3">📋 OBJECTIVE</h3>
                <p className="text-base font-semibold">Be the first player to get rid of all your cards!</p>
              </section>

              <section>
                <h3 className="text-xl font-black text-blue-600 mb-3">🎯 HOW TO PLAY</h3>
                <ul className="space-y-2 text-sm sm:text-base font-semibold">
                  <li>• Match the top card by <strong>color</strong> or <strong>number</strong></li>
                  <li>• Click a card in your hand to play it</li>
                  <li>• If you can't play, click the draw pile to draw a card</li>
                  <li>• Play continues clockwise around the table</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-black text-yellow-600 mb-3">⚡ ACTION CARDS</h3>
                <ul className="space-y-2 text-sm sm:text-base font-semibold">
                  <li><strong className="text-red-600">Skip:</strong> Next player loses their turn</li>
                  <li><strong className="text-blue-600">Reverse:</strong> Changes direction of play</li>
                  <li><strong className="text-green-600">Draw Two:</strong> Next player draws 2 cards and loses their turn</li>
                  <li><strong className="text-purple-600">Wild:</strong> Change the current color</li>
                  <li><strong className="text-purple-800">Wild Draw Four:</strong> Change color & next player draws 4 cards</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-black text-green-600 mb-3">💡 PRO TIPS</h3>
                <ul className="space-y-2 text-sm sm:text-base font-semibold">
                  <li>• Save Wild cards for strategic moments</li>
                  <li>• Watch what colors opponents are playing</li>
                  <li>• Use action cards to disrupt other players</li>
                </ul>
              </section>
            </div>

            <motion.button
              onClick={() => setShowRules(false)}
              className="mt-8 w-full bg-red-600 text-white font-black py-4 px-6 rounded-2xl text-lg sm:text-xl shadow-lg hover:bg-red-700 transition-all border-4 border-red-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              GOT IT!
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default StartMenu;
