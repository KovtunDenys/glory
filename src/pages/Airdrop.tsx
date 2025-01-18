import { FC, useEffect, useState } from 'react'
import './Airdrop.scss'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import { useSelector } from 'react-redux';

const Airdrop: FC = () => {

    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const user = useSelector((state: any) => state.user); 

    const qualifications = [
        {
            title: "Make TON Transactions",
            totalBalance: 0,
            icon: '/ton.png',
        },
        {
            title: "Tasks Rewards",
            totalBalance: 0,
            icon: '/coin.webp',
        },
        {
            title: "Mining Rewards",
            totalBalance: 0,
            icon: '/earn.svg',
        },
        {
            title: "Referral Rewards",
            totalBalance: user.invitedFriends.length,
            icon: '/invite.svg',
        }
    ]

    useEffect(() => {
        const checkWalletConnection = () => {
          if (tonConnectUI.account?.address) {
            console.log('Кошелек подключен', tonConnectUI.account);
            console.log('Адрес кошелька:', tonConnectUI.account.address);
          } else {
            console.log('Кошелек не подключен');
          }
        };
        checkWalletConnection();
    
        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
          if (wallet?.account?.address) {
            console.log('Кошелек подключен', tonConnectUI);
            console.log('Адрес кошелька:', wallet.account.address);
          } else {
            console.log('Кошелек не подключен');
          }
        });
        return () => {
          unsubscribe();
        };
      }, [tonConnectUI]);

    return (
        <div className='main-airdrop'>
            <div className='header-airdrop'>
                <div className='img-air-logo'></div>
                <TonConnectButton></TonConnectButton>
                <Button
                    sx={{
                        borderRadius: '43px',
                        display: 'flex',
                        alignItems: 'center',
                        textTransform: 'none',
                        marginBottom: '20px',
                        backgroundColor: 'rgb(31 32 35)',
                        color: "white",
                        padding: '7px 25px',
                        marginTop: '20px'
                    }}
                >
                    <Box
                        component="img"
                        src="/withdraw.svg"
                        alt="icon"
                        sx={{
                            width: 20,
                            height: 20,
                            marginRight: 1,
                        }}
                    />
                    Withdraw to wallet
                </Button>
            </div>
            <div className='airdrop-info'>
                <div>
                    <h3>Airdrop Qualifiers</h3>
                    <p>Listing and launching soon, all activities are important for qualification!</p>
                </div>

            </div>
            <div>
                {qualifications.map((data, index) => (
                    <div key={index} className='stat-col'>
                        <div className='stat-title'>
                            <img src={data.icon} alt={data.title} />
                            <span>{data.title}</span>
                        </div>
                        <div className='stat-balance'>
                            <span>{data.totalBalance}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Airdrop