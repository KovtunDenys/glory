import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from '@ton/core';

import { Buffer } from 'buffer';

global.Buffer = Buffer;

export default function Home() {
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleWalletConnection = useCallback((address: string) => {
    setTonWalletAddress(address);
    setIsLoading(false);
    console.log("Wallet connected:", address); 
  }, []);

  const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    setIsLoading(false);
    console.log("Wallet disconnected"); 
  }, []);

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        if (tonConnectUI.account?.address) {
          handleWalletConnection(tonConnectUI.account.address);
        } else {
          handleWalletDisconnection();
        }
      } catch (error) {
        console.error("Error checking wallet connection:", error);
        handleWalletDisconnection();
      }
    };

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      try {
        if (wallet?.account?.address) {
          handleWalletConnection(wallet.account.address);
        } else {
          handleWalletDisconnection();
        }
      } catch (error) {
        console.error("Error on status change:", error);
        handleWalletDisconnection();
      }
    });

    checkWalletConnection();

    return () => {
      unsubscribe(); 
    };
  }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    try {
      if (tonConnectUI.connected) {
        setIsLoading(true);
        await tonConnectUI.disconnect();
        console.log("Disconnecting wallet...");
      } else {
        await tonConnectUI.openModal();
        console.log("Opening wallet connection modal...");
      }
    } catch (error) {
      console.error("Error during wallet action:", error);
      alert("An error occurred while connecting or disconnecting the wallet.");
    }
  };

  const formatAddress = (address: string) => {
    try {
      const tempAddress = Address.parse(address).toString();
      return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
    } catch (error) {
      console.error("Error formatting address:", error);
      return address;
    }
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-8">TON Connect Demo</h1>
      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
          <button
            onClick={handleWalletAction}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      ) : (
        <button
          onClick={handleWalletAction}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Connect TON Wallet
        </button>
      )}
    </main>
  );
}
