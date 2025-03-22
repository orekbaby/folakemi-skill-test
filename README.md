
# folakemi-skill-test README.md

A comprehensive README including both login and Web3 functionality.

## Project Overview
A responsive Log in page application with functional modal and Web3 metamask wallet integration.

## Features

### Authentication
- User login with form validation
- Password strength requirements
- Responsive design for all device sizes
- Interactive level selection modal (Easy, Medium, Hard)
- Smooth transitions and loading states

### Web3 Integration
- MetaMask wallet connection
- Display of connected wallet address
- Wallet address copy functionality
- Persistent wallet connection
- Comprehensive error handling for wallet interactions
- Points system tied to wallet address

## Technologies Used
- React
- React Router
- Material-UI
- Web3/Ethereum (MetaMask)
- Local Storage for session management

## Installation and Setup
\`\`\`
git clone https://github.com/orekbaby/folakemi-skill-test.git
cd frontend

npm install
npm start
\`\`\`

## Demo
[Live Demo](https://folakemi-card-memory-game.netlify.app/)

## Web3 Implementation Details
The application implements a complete wallet connection flow:

1. **Connection Management**:
   - Automatic reconnection to previously connected wallets
   - Proper disconnection with permission revocation
   - Error handling for common MetaMask scenarios

2. **User Experience**:
   - Toast notifications for connection status
   - Truncated wallet addresses for better UI
   - Copy to clipboard functionality
   - Responsive wallet display across device sizes

3. **State Management**:
   - Context API for global wallet state
   - Persistent storage of wallet address and points

## Future Improvements
- Add support for multiple wallet providers (WalletConnect, Coinbase Wallet)
- Implement network/chain ID validation
- Add account switching detection
- Enhance security with proper signature verification
- Implement actual blockchain interactions for the game
- Add unit and integration tests



