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
- Disconnect Button
- Modal that shows the user information
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
```
git clone https://github.com/orekbaby/folakemi-skill-test.git

npm install
npm start
```

## Login Implementation Details
The login page simulates authentication since there is no registered user database. This ensures that the modal functionality can be demonstrated effectively. Here’s how it works:

1. **Form Validation**:
   - Ensures both fields (username and password) are filled before submission.
   - Password is validated with specific security requirements, including length, uppercase, number, and special character checks.

2. **Fake Authentication**:
   - Since there are no registered users, an API call to a non-existent endpoint is attempted.
   - If the request fails (which it will, due to no backend setup), a timeout is triggered after 2 seconds to simulate a successful login.
   - This automatically logs in the user and shows the level selection modal.

3. **User Experience Enhancements**:
   - Displays a toast notification with error handling messages when authentication fails.
   - Uses local storage to mimic session persistence.
   - Smooth modal transitions to guide the user after a simulated login.

4. **Game Mode Selection**:
   - After a successful login (simulated), the user selects a game mode (Easy, Medium, Hard).
   - The selection redirects the user to the appropriate game page.

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

