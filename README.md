# Cryptocurrency Dashboard

A modern, responsive cryptocurrency dashboard built with React and TypeScript that displays real-time market data from the CoinGecko API.

## 🚀 Features

### All Coins View
- **Real-time Market Data**: Live cryptocurrency prices, market caps, and trading volumes
- **Advanced Sorting**: Sort by price, market cap, volume, and percentage changes
- **Smart Search**: Search cryptocurrencies by name, symbol, or ID
- **Interactive Table**: Click any coin to view detailed information
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Highlights Section
- **Trending Coins**: Most searched and popular cryptocurrencies
- **Top Gainers**: Best performing coins in the last 24 hours
- **Top Losers**: Worst performing coins in the last 24 hours
- **Highest Volume**: Coins with the highest trading volume
- **Global Market Overview**: Total market cap, trading volume, and Bitcoin dominance

### User Experience
- **Loading States**: Skeleton loaders and spinners for smooth UX
- **Error Handling**: Graceful error handling with retry mechanisms
- **Caching**: Intelligent caching to reduce API calls and improve performance
- **Debounced Search**: Optimized search with 300ms debouncing
- **Favorites**: Star coins to keep track of your favorites

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` and add your CoinGecko API key:
   ```
   REACT_APP_COINGECKO_API_URL=https://api.coingecko.com/api/v3
   REACT_APP_COINGECKO_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔑 API Key Setup

1. Visit [CoinGecko API](https://www.coingecko.com/api/documentations/v3)
2. Sign up for a free account
3. Generate your API key
4. Add the key to your `.env` file

**Note**: The app works without an API key for basic functionality, but rate limits may apply.

## 🏗️ Architecture Overview

### Design Patterns Used

#### 1. **Service Layer Pattern**
- `src/services/api.ts`: Centralized API communication
- Handles all CoinGecko API interactions
- Implements caching and error handling

#### 2. **Custom Hooks Pattern**
- `src/hooks/useCoins.ts`: Manages coin data and pagination
- `src/hooks/useHighlights.ts`: Handles highlights and global data
- Encapsulates state logic and side effects

#### 3. **Component Composition Pattern**
- Reusable UI components with clear interfaces
- Separation of concerns between presentation and logic
- Consistent prop interfaces across components

#### 4. **Adapter Pattern**
- API responses mapped to domain models
- Consistent data structure throughout the app
- Type-safe data transformations

#### 5. **Observer Pattern**
- React's built-in state management
- Efficient re-rendering with proper dependency arrays
- Event-driven updates

### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── CoinTable.tsx   # Main cryptocurrency table
│   ├── HighlightsSection.tsx
│   ├── CoinModal.tsx   # Detailed coin view
│   └── ...
├── hooks/              # Custom React hooks
│   ├── useCoins.ts     # Coin data management
│   └── useHighlights.ts
├── services/           # API and external services
│   └── api.ts         # CoinGecko API service
├── types/             # TypeScript type definitions
│   └── index.ts
├── utils/             # Utility functions
│   └── index.ts
└── App.tsx           # Main application component
```

## 🚀 Performance Optimizations

### Caching Strategy
- **Client-side caching**: 5-minute cache for API responses
- **Memoization**: React.useMemo for expensive calculations
- **Debounced search**: 300ms delay to prevent excessive API calls

### Loading States
- **Skeleton loaders**: Better perceived performance
- **Progressive loading**: Load highlights first, then detailed data
- **Error boundaries**: Graceful error handling

### Bundle Optimization
- **Code splitting**: Ready for lazy loading
- **Tree shaking**: Only import used functions
- **Minimal dependencies**: Lightweight bundle size

## 🔧 Available Scripts

- `npm start`: Start development server
- `npm build`: Build for production
- `npm test`: Run tests
- `npm run eject`: Eject from Create React App

## 🌐 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Deploy the `build` folder to Netlify
3. Add environment variables in Netlify dashboard

### Other Platforms
The app can be deployed to any static hosting service that supports React applications.

## 🔮 Future Improvements

### Short Term
- [ ] Real-time updates with WebSocket
- [ ] Advanced filtering options
- [ ] Portfolio tracking
- [ ] Price alerts
- [ ] Dark mode theme

### Long Term
- [ ] Mobile app with React Native
- [ ] Advanced charting with TradingView
- [ ] Social features and comments
- [ ] AI-powered market insights
- [ ] Multi-language support

## 🐛 Known Limitations

1. **Rate Limiting**: CoinGecko free tier has rate limits
2. **Data Freshness**: Data updates every 5 minutes due to caching
3. **Mobile Optimization**: Some features optimized for desktop
4. **Offline Support**: No offline functionality currently

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [CoinGecko](https://www.coingecko.com) for providing the excellent API
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Lucide React](https://lucide.dev) for the beautiful icons
- [React](https://reactjs.org) for the amazing framework
 
