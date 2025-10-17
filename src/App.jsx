import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { GameProvider, useGame } from './context/GameContext';
import StartMenu from './components/StartMenu';
import GameBoard from './components/GameBoard';
import PlayerHand from './components/PlayerHand';
import OpponentDisplay from './components/OpponentDisplay';
import ColorPicker from './components/ColorPicker';
import { Trophy, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GameContent = () => {
  const { 
    gameStarted, 
    winner, 
    players, 
    getCurrentPlayer, 
    playerHands,
    canPlayCard,
    playCard,
    playerDrawCard
  } = useGame();

  // AI player logic
  useEffect(() => {
    if (!gameStarted || winner) return;
    
    const currentPlayer = getCurrentPlayer();
    if (currentPlayer === 'You' || currentPlayer === players[0]) return;

    const aiTimeout = setTimeout(() => {
      const hand = playerHands[currentPlayer] || [];
      const playableCards = hand.filter(card => canPlayCard(card));

      if (playableCards.length > 0) {
        const randomCard = playableCards[Math.floor(Math.random() * playableCards.length)];
        
        if (randomCard.color === 'Wild') {
          const colors = ['Red', 'Blue', 'Green', 'Yellow'];
          const randomColor = colors[Math.floor(Math.random() * colors.length)];
          playCard(randomCard, randomColor);
        } else {
          playCard(randomCard);
        }
      } else {
        playerDrawCard();
      }
    }, 1500);

    return () => clearTimeout(aiTimeout);
  }, [gameStarted, getCurrentPlayer, players, playerHands, winner, canPlayCard, playCard, playerDrawCard]);

  if (!gameStarted && !winner) {
    return <StartMenu />;
  }

  const humanPlayer = players[0];
  const opponents = players.slice(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-yellow-400 to-blue-500 overflow-hidden relative">
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
        <motion.div
          className="absolute top-1/2 left-1/4 w-20 h-32 bg-red-500 rounded-2xl opacity-15 blur-sm transform rotate-30"
          animate={{ 
            y: [0, -25, 0],
            rotate: [30, 45, 30],
          }}
          transition={{ duration: 11, repeat: Infinity, delay: 2 }}
        />
        <motion.div
          className="absolute top-1/3 right-1/4 w-20 h-32 bg-green-600 rounded-2xl opacity-15 blur-sm transform -rotate-20"
          animate={{ 
            y: [0, 40, 0],
            rotate: [-20, -35, -20],
          }}
          transition={{ duration: 9.5, repeat: Infinity, delay: 2.5 }}
        />
      </div>
      
      <Toaster position="top-right" />
      <ColorPicker />

      {/* Winner Modal */}
      <AnimatePresence>
        {winner && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-3xl p-12 text-center shadow-2xl max-w-md"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 150 }}
            >
              <motion.div
                animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Trophy className="w-32 h-32 mx-auto text-yellow-500 mb-4" />
              </motion.div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">🎉 Winner! 🎉</h2>
              <p className="text-2xl text-gray-600 mb-8">{winner} wins the game!</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold py-3 px-8 rounded-xl hover:shadow-lg transition-all inline-flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Play Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
        {/* Current Player */}
        <motion.div 
          className="bg-gradient-to-r from-purple-600 to-pink-600 p-[2px] rounded-xl shadow-lg"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="bg-gray-900/90 backdrop-blur-sm px-1 sm:px-2 py-3 sm:py-4 rounded-xl min-w-[100px] sm:min-w-[150px]">
            <div className="flex items-center gap-4">
              <span className="text-white/70 text-sm sm:text-base font-medium relative left-3">Playing:</span>
              <span className="text-white font-bold text-base sm:text-lg whitespace-nowrap">{getCurrentPlayer()}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Opponents */}
      <div className="absolute top-16 sm:top-20 left-0 right-0 px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-7xl mx-auto">
          {opponents.map(opponent => (
            <OpponentDisplay key={opponent} playerName={opponent} />
          ))}
        </div>
      </div>

      {/* Game Board - Moved higher */}
      <div className="absolute top-[15%] sm:top-[18%] left-1/2 transform -translate-x-1/2">
        <GameBoard />
      </div>

      {/* Player Hand - Fan style at bottom - moved lower */}
      <div className="absolute bottom-0 left-0 right-0">
        <PlayerHand 
          playerName={humanPlayer} 
          isCurrentPlayer={getCurrentPlayer() === humanPlayer}
        />
      </div>
    </div>
  );
};

function App() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

export default App
