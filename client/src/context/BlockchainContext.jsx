import React, { useState, useEffect } from 'react';
import { abi, contractAddress } from '../config.json';
import { ethers } from 'ethers';

export const BlockchainContext = React.createContext('');

export const BlockchainProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [renterExists, setRenterExists] = useState('');
  const [renter, setRenter] = useState('');

  const provider = new ethers.BrowserProvider(window.ethereum);
  //const signer = provider.getSigner();

  const address = contractAddress;
  const contractAbi = abi;
  const contractProvider = new ethers.Contract(address, contractAbi, provider);
  //const contractSigner = new ethers.Contract(address, contractAbi, signer);
  console.log('context');
  const connectWallet = async () => {
    console.log('connectWallet');
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const accounts = await provider.send('eth_requestAccounts', []);
      console.log('Test');
      console.log(accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error('No ethereum object');
    }
  };

  const checkIfWalletConnected = async () => {
    try {
      if (!window.ethereum) return alert('Please install Metamask');

      const accounts = await provider.send('eth_accounts');

      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log('No accounts found');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getBalance = async () => {
    try {
      const balanceOf = await contractProvider.balanceOf();
      setBalance(balanceOf);
      console.log(balance);
    } catch (error) {
      console.log(error);
    }
  };

  const checkRenterExists = async () => {
    try {
      const renter = await contractProvider.renterExists();
      setRenterExists(renter);
      if (renter) {
        await getRenter();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRenter = async () => {
    try {
      const renter = await contractProvider.getRenter();
      setRenter(renter);
    } catch (error) {
      console.log(error);
    }
  };

  const addRenter = async () => {
    try {
      //console.log(signer);
      const signer = await provider.getSigner();
      const contractSigner = new ethers.Contract(address, contractAbi, signer);
      const newRenter = await contractSigner.addRenter();
      await newRenter.wait();
      checkRenterExists();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfWalletConnected();
    checkRenterExists();
  }, [currentAccount]);

  return (
    <BlockchainContext.Provider value={{ connectWallet, currentAccount, renterExists, addRenter }}>
      {children}
    </BlockchainContext.Provider>
  );
};
