import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import toast from 'react-hot-toast';

const GameContext = createContext();

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within GameProvider');
  }
  return context;
};

const COLORS = ['Red', 'Blue', 'Green', 'Yellow'];
const VALUES = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
const SPECIAL_CARDS = ['DrawTwo', 'Reverse', 'Skip'];

export const GameProvider = ({ children }) => {
  const [players, setPlayers] = useState([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [deck, setDeck] = useState([]);
  const [discardPile, setDiscardPile] = useState([]);
  const [playerHands, setPlayerHands] = useState({});
  const [validColor, setValidColor] = useState(null);
  const [validValue, setValidValue] = useState(null);
  const [gameDirection, setGameDirection] = useState(1); // 1 clockwise, -1 counter-clockwise
  const [gameStarted, setGameStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [pendingWildCard, setPendingWildCard] = useState(null);

  const initializeDeck = useCallback(() => {
    const newDeck = [];
    
    // Number and special cards
    COLORS.forEach(color => {
      newDeck.push({ color, value: 'Zero', id: `${color}-Zero-0` });
      
      for (let i = 1; i < VALUES.length; i++) {
        newDeck.push({ color, value: VALUES[i], id: `${color}-${VALUES[i]}-1` });
        newDeck.push({ color, value: VALUES[i], id: `${color}-${VALUES[i]}-2` });
      }

      SPECIAL_CARDS.forEach((special, idx) => {
        newDeck.push({ color, value: special, id: `${color}-${special}-1` });
        newDeck.push({ color, value: special, id: `${color}-${special}-2` });
      });
    });

    // Wild cards
    for (let i = 0; i < 4; i++) {
      newDeck.push({ color: 'Wild', value: 'Wild', id: `Wild-Wild-${i}` });
      newDeck.push({ color: 'Wild', value: 'WildFour', id: `Wild-WildFour-${i}` });
    }

    // Shuffle deck
    for (let i = newDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
    }

    return newDeck;
  }, []);

  const startGame = useCallback((playerNames) => {
    const shuffledDeck = initializeDeck();
    const hands = {};
    
    // Deal 7 cards to each player
    playerNames.forEach((name, index) => {
      hands[name] = shuffledDeck.splice(0, 7);
    });

    // Draw initial card for discard pile (ensure it's not an action card)
    let topCard;
    do {
      topCard = shuffledDeck.pop();
    } while (
      topCard.value === 'Wild' ||
      topCard.value === 'WildFour' ||
      topCard.value === 'DrawTwo' ||
      topCard.value === 'Skip' ||
      topCard.value === 'Reverse'
    );

    setPlayers(playerNames);
    setPlayerHands(hands);
    setDeck(shuffledDeck);
    setDiscardPile([topCard]);
    setValidColor(topCard.color);
    setValidValue(topCard.value);
    setCurrentPlayerIndex(0);
    setGameDirection(1);
    setGameStarted(true);
    setWinner(null);
    
    toast.success(`Game started! ${playerNames[0]}'s turn`);
  }, [initializeDeck]);

  const drawCard = useCallback(() => {
    if (deck.length === 0) {
      if (discardPile.length > 1) {
        const topCard = discardPile[discardPile.length - 1];
        const newDeck = [...discardPile.slice(0, -1)];
        
        // Shuffle
        for (let i = newDeck.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }
        
        setDeck(newDeck);
        setDiscardPile([topCard]);
        toast('Deck reshuffled!', { icon: '🔄' });
        return newDeck.pop();
      }
      toast.error('No more cards!');
      return null;
    }
    return deck.pop();
  }, [deck, discardPile]);

  const canPlayCard = useCallback((card) => {
    if (card.color === 'Wild') return true;
    return card.color === validColor || card.value === validValue;
  }, [validColor, validValue]);

  const nextPlayer = useCallback(() => {
    setCurrentPlayerIndex(prev => {
      const next = (prev + gameDirection + players.length) % players.length;
      toast(`${players[next]}'s turn`, { icon: '👤' });
      return next;
    });
  }, [gameDirection, players]);

  const handleSpecialCard = useCallback((card) => {
    const nextIdx = (currentPlayerIndex + gameDirection + players.length) % players.length;
    const nextPlayerName = players[nextIdx];

    switch (card.value) {
      case 'Skip':
        toast(`${nextPlayerName} was skipped!`, { icon: '⏭️' });
        // Skip means the next player loses their turn
        // So we need to move past them to the player after
        //nextPlayer(); // This moves to the player after the skipped one
        break;

      case 'Reverse':
        setGameDirection(prev => -prev);
        toast('Direction reversed!', { icon: '🔄' });
        // In 2-player game, don't advance (you play again)
        // In 3+ player games, advance to next player in new direction
        if (players.length > 2) {
          nextPlayer();
        }
        // For 2 players, don't call nextPlayer() - current player keeps turn
        break;

      case 'DrawTwo':
        setPlayerHands(prev => ({
          ...prev,
          [nextPlayerName]: [...prev[nextPlayerName], drawCard(), drawCard()]
        }));
        toast(`${nextPlayerName} drew 2 cards!`, { icon: '+2' });
        // The player who drew cards also loses their turn
        nextPlayer();
        break;

      case 'WildFour':
        setPlayerHands(prev => ({
          ...prev,
          [nextPlayerName]: [...prev[nextPlayerName], drawCard(), drawCard(), drawCard(), drawCard()]
        }));
        toast(`${nextPlayerName} drew 4 cards!`, { icon: '+4' });
        // The player who drew cards also loses their turn
        nextPlayer();
        break;
    }
  }, [currentPlayerIndex, gameDirection, players, nextPlayer, drawCard]);

  const playCard = useCallback((card, declaredColor = null) => {
    const currentPlayer = players[currentPlayerIndex];
    
    if (!canPlayCard(card)) {
      toast.error('Cannot play that card!');
      return false;
    }

    // Remove card from hand
    setPlayerHands(prev => ({
      ...prev,
      [currentPlayer]: prev[currentPlayer].filter(c => c.id !== card.id)
    }));

    // Add to discard pile
    setDiscardPile(prev => [...prev, card]);
    setValidValue(card.value);
    
    if (card.color === 'Wild') {
      if (!declaredColor) {
        setPendingWildCard(card);
        setShowColorPicker(true);
        return true;
      }
      setValidColor(declaredColor);
    } else {
      setValidColor(card.color);
    }

    // Check for winner
    if (playerHands[currentPlayer].length === 1) { // Will be 0 after removal
      setWinner(currentPlayer);
      setGameStarted(false);
      toast.success(`🎉 ${currentPlayer} wins!`);
      return true;
    }

    // Handle special cards
    if (['Skip', 'Reverse', 'DrawTwo', 'WildFour'].includes(card.value)) {
      handleSpecialCard(card);
    } else {
      nextPlayer();
    }

    return true;
  }, [players, currentPlayerIndex, canPlayCard, playerHands, nextPlayer, handleSpecialCard]);

  const playerDrawCard = useCallback(() => {
    const currentPlayer = players[currentPlayerIndex];
    const newCard = drawCard();
    
    if (newCard) {
      setPlayerHands(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], newCard]
      }));
      setDeck(prev => prev.slice(0, -1));
      toast(`${currentPlayer} drew a card`, { icon: '🃏' });
      nextPlayer();
    }
  }, [players, currentPlayerIndex, drawCard, nextPlayer]);

  const selectWildColor = useCallback((color) => {
    setValidColor(color);
    setShowColorPicker(false);
    
    if (pendingWildCard) {
      handleSpecialCard(pendingWildCard);
      setPendingWildCard(null);
    } else {
      nextPlayer();
    }
  }, [pendingWildCard, handleSpecialCard, nextPlayer]);

  const value = {
    players,
    currentPlayerIndex,
    deck,
    discardPile,
    playerHands,
    validColor,
    validValue,
    gameDirection,
    gameStarted,
    winner,
    showColorPicker,
    startGame,
    playCard,
    playerDrawCard,
    canPlayCard,
    selectWildColor,
    getCurrentPlayer: () => players[currentPlayerIndex],
    getTopCard: () => discardPile[discardPile.length - 1],
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
