# ERC-20 Token DApp

A beginner-friendly ERC-20 token project with:
- a Solidity smart contract
- a Hardhat deployment setup
- a React frontend that connects to MetaMask
- ERC-20 token transfer support on a public testnet

## Project structure

- `contracts/` - smart contracts
- `scripts/` - deployment scripts
- `frontend/` - React app

## Quick start

### 1. Install dependencies

```bash
npm install
cd frontend && npm install
```

### 2. Create environment file

Create a `.env` file in the project root:

```bash
SEPOLIA_RPC_URL=your_rpc_url_here
PRIVATE_KEY=your_wallet_private_key_here
ETHERSCAN_API_KEY=your_etherscan_api_key_here
```

If you use Base Sepolia instead, replace the RPC URL with a Base Sepolia RPC endpoint.

### 3. Compile the contract

```bash
npm run compile
```

### 4. Deploy the contract

```bash
npm run deploy:sepolia
```

After deployment, copy the printed contract address.

### 5. Configure the frontend

In `frontend/.env`, set:

```bash
VITE_TOKEN_ADDRESS=your_deployed_contract_address
VITE_CHAIN_ID=11155111
VITE_NETWORK_NAME=Sepolia
```

For Base Sepolia, use chain id `84532`.

### 6. Run the frontend

```bash
cd frontend
npm run dev
```

## What works right now

- ERC-20 token contract using OpenZeppelin
- deploy script for testnets
- MetaMask wallet connection
- shows connected address
- shows selected network
- token transfer form

## What still needs real deployment setup

- adding your own RPC URL and private key
- deploying to a public testnet
- copying deployed contract address into the frontend
- deploying the frontend to Vercel or Netlify

## Token details

Default token name: `Beginner Token`
Default token symbol: `BGT`
Initial supply: `1000000` tokens minted to deployer
