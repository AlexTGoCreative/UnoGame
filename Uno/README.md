# 🎮 UNO Card Game - React Edition# React + Vite



A modern, beautiful implementation of the classic UNO card game built with React, featuring stunning animations, AI opponents, and a fully responsive design.This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.



![UNO Game](https://img.shields.io/badge/React-19.1.1-blue?logo=react)Currently, two official plugins are available:

![Vite](https://img.shields.io/badge/Vite-7.1.7-646CFF?logo=vite)

![TailwindCSS](https://img.shields.io/badge/Tailwind-4.1.14-38B2AC?logo=tailwind-css)- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh

![License](https://img.shields.io/badge/License-Educational-green)- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



## ✨ Features## React Compiler



### 🎯 Complete UNO ExperienceThe React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

- **Full UNO card deck** (108 cards with proper distribution)

- **2-4 players** support (1 human + AI opponents)## Expanding the ESLint configuration

- **All special cards**: Skip, Reverse, Draw Two, Wild, Wild Draw Four

- **Smart AI opponents** with strategic gameplayIf you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

- **Proper game rules** and win condition detection

### 🎨 Modern Design
- **CSS-based UNO logo** with colorful animations
- **Vibrant gradient backgrounds** matching UNO colors (Red, Yellow, Blue, Green)
- **Fan-style card hand** with smooth animations
- **Responsive design** for mobile, tablet, and desktop
- **Interactive game rules modal** with comprehensive instructions
- **Real-time toast notifications** for game events

### 🚀 Technical Highlights
- **React 19.1** with modern hooks and context
- **Framer Motion** for smooth animations
- **Tailwind CSS 4** for utility-first styling
- **Vite** for lightning-fast development
- **Zero backend dependencies** - all game logic runs client-side

## 🎮 How to Play

### Objective
Be the first player to get rid of all your cards!

### Game Rules
1. **Match cards** by color, number, or symbol
2. **Click a card** in your hand to play it
3. **Click the draw pile** if you can't play
4. **Wild cards** let you choose the next color
5. **First to empty their hand wins!**

### Special Cards
- **Skip (🚫)** - Next player loses their turn
- **Reverse (🔄)** - Reverses direction of play
- **Draw Two (+2)** - Next player draws 2 cards and loses turn
- **Wild (🌈)** - Change the current color
- **Wild Draw Four (+4)** - Change color & next player draws 4 cards

## 🚀 Quick Start

### Prerequisites
- **Node.js** 20 or higher
- **npm** or **yarn**

### Installation

```bash
# Clone the repository
git clone https://github.com/AlexTGoCreative/UnoGame.git
cd UnoGame/Uno/uno-react

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
# Create optimized production build
npm run build

# Preview production build locally
npm run preview
```

## 📁 Project Structure

```
uno-react/
├── public/
│   └── cards/              # UNO card images (PNG files)
├── src/
│   ├── components/
│   │   ├── ColorPicker.jsx     # Wild card color selection modal
│   │   ├── GameBoard.jsx       # Draw pile and discard pile
│   │   ├── OpponentDisplay.jsx # Opponent cards display
│   │   ├── PlayerHand.jsx      # Player's card hand with fan layout
│   │   ├── StartMenu.jsx       # Landing page and player setup
│   │   └── UnoCard.jsx         # Individual card component
│   ├── context/
│   │   └── GameContext.jsx # Global game state management
│   ├── App.jsx            # Main app component with game logic
│   ├── index.css          # Global styles and Tailwind config
│   └── main.jsx           # React app entry point
├── netlify.toml           # Netlify deployment configuration
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
└── vite.config.js         # Vite build configuration
```

## 🎨 Design Features

### CSS UNO Logo
- Custom CSS-designed logo with animated letters
- Each letter in UNO brand colors (Red, Yellow, Blue)
- Playful rotation animations and hover effects
- Floating decorative circles

### Start Menu
- Bold, colorful design matching UNO aesthetic
- Animated card-shaped background elements
- Player name customization (2-4 players)
- Interactive game rules modal
- Quick tips section

### Game Page
- Fan-style card hand using parabolic curve algorithm
- Absolute positioning for optimal layout
- Current player indicator
- Smooth card animations
- Winner celebration modal
- Mobile-responsive controls

## 🌐 Deployment

### Deploy to Netlify

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Netlify**
   - Go to [Netlify](https://netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Select the `uno-react` folder as base directory

3. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - (Or use the included `netlify.toml` for automatic configuration)

4. **Deploy!**
   - Click "Deploy site"
   - Your UNO game will be live in minutes!

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🛠️ Technologies Used

- **[React](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon set
- **[React Hot Toast](https://react-hot-toast.com/)** - Toast notifications

## 📱 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Future Enhancements

- [ ] Online multiplayer support with WebSockets
- [ ] Player statistics and match history
- [ ] Custom card themes and skins
- [ ] Sound effects and background music
- [ ] Tournament mode
- [ ] Configurable AI difficulty levels
- [ ] Achievement system
- [ ] Dark mode toggle

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📝 License

This is an educational project. UNO is a registered trademark of Mattel, Inc.

## 👨‍💻 Author

**Alexandru Tulbure**
- GitHub: [@AlexTGoCreative](https://github.com/AlexTGoCreative)

---

**Ready to play? Start the development server and enjoy the game! 🎉**

Made with ❤️ and React
