import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import UnoCard from './UnoCard';
import { useGame } from '../context/GameContext';

const PlayerHand = ({ playerName, isCurrentPlayer }) => {
  const { playerHands, canPlayCard, playCard, showColorPicker } = useGame();
  const cards = playerHands[playerName] || [];
  const handRef = useRef(null);
  const [handWidth, setHandWidth] = useState(0);

  useEffect(() => {
    if (handRef.current) {
      setHandWidth(handRef.current.offsetWidth);
    }
    
    const handleResize = () => {
      if (handRef.current) {
        setHandWidth(handRef.current.offsetWidth);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (card) => {
    if (!isCurrentPlayer || showColorPicker) return;
    
    if (canPlayCard(card)) {
      playCard(card);
    }
  };

  // CodePen algorithm constants
  const a = -0.02;
  const h = 5;
  const k = 0.5;
  const diff = 0.1;
  const multi = 1.6;

  const getypos = (xpos) => {
    return a * Math.pow((xpos - h), 2) + k;
  };

  const getrotation = (xpos) => {
    const ypos = getypos(xpos);
    if (xpos < h) {
      const newx = xpos + diff;
      const newy = getypos(newx);
      const adjacent = newx - xpos;
      const opposite = newy - ypos;
      let angle = Math.atan(opposite / adjacent);
      angle *= 180;
      angle /= Math.PI;
      angle = 0 - angle;
      return angle * multi;
    } else if (xpos > h) {
      const newx = xpos - diff;
      const newy = getypos(newx);
      const adjacent = newx - xpos;
      const opposite = newy - ypos;
      let angle = Math.atan(opposite / adjacent);
      angle *= 180;
      angle /= Math.PI;
      angle = 0 - angle;
      return angle * multi;
    } else {
      return 0;
    }
  };

  const calculateCardPosition = (index, total) => {
    const cardWidth = 200; // 2.5 * 80
    const currentHandWidth = handWidth || (typeof window !== 'undefined' ? window.innerWidth * 0.6 : 1200);
    const handHeight = 400; // 5 * 80
    
    let left = cardWidth * index / 2;
    const totalwidth = total * (cardWidth / 2) + cardWidth / 2;
    
    if (totalwidth > currentHandWidth) {
      const overflow = totalwidth - currentHandWidth;
      const shift = overflow / (total - 1);
      left -= shift * index;
    }
    
    const leftdif = (currentHandWidth - Math.min(totalwidth, currentHandWidth)) / 2;
    left += leftdif;
    
    const center = left + cardWidth / 2;
    const xpos = center / currentHandWidth * 10;
    const ypos = getypos(xpos);
    const rot = getrotation(xpos);
    const bottom = (ypos / k) * (handHeight / 4);
    
    return { left, bottom, rot };
  };

  return (
    <div 
      ref={handRef}
      className="absolute left-[20%] w-[60%] bottom-[-40px] sm:bottom-[-30px] h-[400px]"
      style={{ userSelect: 'none' }}
    >
      {cards.map((card, index) => {
        const { left, bottom, rot } = calculateCardPosition(index, cards.length);
        const isPlayableCard = isCurrentPlayer && canPlayCard(card) && !showColorPicker;
        
        return (
          <motion.div
            key={card.id}
            className="absolute"
            style={{
              left: `${left}px`,
              bottom: `${bottom}px`,
              transform: `rotate(${rot}deg)`,
              transformOrigin: 'bottom center',
              zIndex: index + 1,
              transition: '0.5s left ease, 0.5s bottom ease, 0.3s transform ease',
            }}
            initial={{ opacity: 0, bottom: -100 }}
            animate={{ 
              opacity: 1,
              bottom: `${bottom}px`
            }}
            whileHover={isPlayableCard ? {
              bottom: bottom + 60,
              scale: 1.05,
              zIndex: 999,
              transition: { duration: 0.2 }
            } : {}}
            transition={{ 
              delay: index * 0.05,
            }}
          >
            <UnoCard
              card={card}
              onClick={() => handleCardClick(card)}
              isPlayable={isPlayableCard}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default PlayerHand;
