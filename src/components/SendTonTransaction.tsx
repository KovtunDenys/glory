import { FC, useState } from 'react';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'; 
import { updateUserPointsInFirebase } from '../firebase/firebaseServices'; 
import { addPoints } from '../features/userSlice';

interface SendTonTransactionProps {
  amount: string;
  pointNumber: number;
  closeModal: () => void;
}

const SendTonTransaction: FC<SendTonTransactionProps> = ({ amount, pointNumber, closeModal }) => {
  const [tonConnectUI] = useTonConnectUI();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch(); 

  const user = useSelector((state: any) => state.user); 
  const userId = user?.id;  

  const checkWalletConnection = async () => {
    try {
      if (!tonConnectUI.wallet || !tonConnectUI.wallet.account.address) {
        throw new Error("Wallet is not connected.");
      }
      setError(null); 
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error connecting to the wallet.");
    }
  };

  const handleTransaction = async () => {
    closeModal();  
    try {
      if (!tonConnectUI.wallet || !tonConnectUI.wallet.account.address) {
        setError("Wallet is not connected.");
        return;
      }

      const myTransaction = {
        validUntil: Math.floor(Date.now() / 1000) + 360, 
        messages: [
          {
            address: "jettonWalletContract", 
            amount: amount, 
          }
        ]
      };

      const transactionResult = await tonConnectUI.sendTransaction(myTransaction);

      if (transactionResult) {
        console.log('Transaction was successful:', transactionResult);
        
        const newPoints = pointNumber;  
        await updateUserPointsInFirebase(userId, newPoints); 

        dispatch(addPoints({ points: pointNumber }));
        setError(null); 
      } else {
        setError("Error sending the transaction.");
      }

    } catch (e) {
      setError("Error sending the transaction.");
      console.error(e);
    }
  };

  const isWalletConnected = tonConnectUI.wallet && tonConnectUI.wallet.account.address;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <img src="/logo.jpg" alt="" style={{
        width: '56px',
        borderRadius: '50%',
      }} />
      <h2>Ton Transaction</h2>
      <span style={{ margin: '10px', color: 'gold' }}>{amount} Tone</span>
      <span style={{ margin: '10px' }}>+{pointNumber} $Glorys</span>

      {error && <span style={{ color: 'red', margin: '10px' }}>{error}</span>}

      {!isWalletConnected ? (
        <div onClick={closeModal}><TonConnectButton style={{margin:'20px'}}></TonConnectButton></div>
      ) : (
        <Button
          sx={{
            borderRadius: '16px',
            display: 'flex',
            textTransform: 'none',
            marginBottom: '20px',
            padding: '10px 20px',
            fontSize: '20px',
            width: '70%',
            bgcolor: '#1565c0',
            color: 'white',
          }}
          onClick={handleTransaction}
        >
          Send
        </Button>
      )}
    </div>
  );
};

export default SendTonTransaction;
