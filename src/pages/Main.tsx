import { FC, useEffect, useState } from 'react'
import './Main.scss'
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/userSlice';
import { addUserToFirebase, getUserById, updateInviteInFirebase, updateSubscriptionInFirebase, updateUserPointsInFirebase } from '../firebase/firebaseServices';
import { User } from '../interfaces/user';
import { updateSubscription } from '../features/userActions';

const Main: FC = () => {
    const navigate = useNavigate();
    const user = useSelector((state: any) => state.user);
    const [response, setResponse] = useState('');
    const dispatch = useDispatch();

    const subsTasks = [
        {
            title: "Instagram",
            totalBalance: 100,
            icon: '/instagram.png',
            link: 'https://www.instagram.com/spursofficial/'
        },
        {
            title: "TikTok",
            totalBalance: 100,
            icon: '/TikTok.png',
            link: 'https://www.tiktok.com/@spursofficial?lang=en'
        },
        {
            title: "YouTube",
            totalBalance: 100,
            icon: '/youTube.png',
            link: 'https://www.youtube.com/@TottenhamHotspur'
        },
    ]
    const videoTasks = [
        {
            title: "Watch video",
            totalBalance: 100,
            icon: '/instagram.png',
        },
        {
            title: "Watch video",
            totalBalance: 100,
            icon: '/TikTok.png',
        },
        {
            title: "Watch video",
            totalBalance: 100,
            icon: '/youTube.png',
        },
    ]
    const getUserData = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/getUserData');

            if (res.ok) {
                const data = await res.json();
                console.log(data);
                const existingUser = await getUserById(data.userId);

                if (existingUser) {
                    dispatch(setUser({
                        id: existingUser.id,
                        userName:existingUser.userName,
                        points: existingUser.points,
                        lastMining: existingUser.lastMining,
                        invitedFriends: existingUser.invitedFriends,
                        youTubeSubs: existingUser.youTubeSubs,
                        tikTokSubs: existingUser.tikTokSubs,
                        instagramSubs: existingUser.instagramSubs
                    }));


                } else {
                    const newUser = {
                        id: data.userId,
                        userName: data.userName,
                        invitedFriend:[],
                        points: 0,
                        lastMining: undefined,
                        youTubeSubs: false,
                        tikTokSubs: false,
                        instagramSubs: false
                    };

                    dispatch(setUser(newUser));

                    await addUserToFirebase(newUser);
                    const inviterId = data.invited;

                    if (inviterId) {
                        console.log('test')
                        const inviter = await getUserById(inviterId);

                        if (inviter) {
                            const updatedInviter = {
                                id: inviter.id,
                                invitedFriends: [...(inviter.invitedFriends || []), data.userId]
                            };
                            await updateInviteInFirebase(updatedInviter);

                            console.log('Inviter updated:', updatedInviter);
                        }
                    }

                }
            } else {
                const errorData = await res.json();
                setResponse(`Ошибка: ${errorData.error}`);
            }
        } catch (error: any) {
            console.log('Ошибка подключения:', error);
            setResponse(`Ошибка подключения: ${error.message}`);
        }
    };

    const handleSubscribe = async (platform: string, link: string) => {
        try {
          // Открываем ссылку в новом окне
          window.open(link, '_blank');
      
          // Устанавливаем обновления подписки в зависимости от платформы
          let updatedSubscription: { [key: string]: boolean } = {};
          let pointsToAdd = 0;
      
          switch (platform) {
            case 'YouTube':
              updatedSubscription = { youTubeSubs: true };
              pointsToAdd = 100; // Добавляем 100 очков за подписку на YouTube
              break;
      
            case 'TikTok':
              updatedSubscription = { tikTokSubs: true };
              pointsToAdd = 100; // Добавляем 100 очков за подписку на TikTok
              break;
      
            case 'Instagram':
              updatedSubscription = { instagramSubs: true };
              pointsToAdd = 100; // Добавляем 100 очков за подписку на Instagram
              break;
      
            default:
              console.error('Unknown platform');
              return;
          }
      
          const updatedUser = { 
            ...user, 
            points: user.points + pointsToAdd,
            ...updatedSubscription 
          };
      
          await updateSubscriptionInFirebase(user.id, updatedSubscription);
          await updateUserPointsInFirebase(user.id, updatedUser.points);
      
          dispatch(setUser(updatedUser));
      
        } catch (error) {
          console.error('Error updating subscription and points:', error);
        }
      };
      
      

    useEffect(() => {
        getUserData()
    }, []);

    return (
        <div className='main-container'>
            <div className='info'>
                <div className='img'></div>
                <div className='score'>{user.points}</div>
                <div className='currency'>$Glorys</div>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: '6px',
                        display: 'flex',
                        textTransform: 'none',
                        marginBottom: '20px',
                    }}
                    onClick={() => navigate('/airdrop')}
                >
                    <div className="ton-img"></div>
                    Withdraw to wallet
                </Button>
            </div>
            <div className='tasks'>
    <h4>Subscribe Tasks</h4>
    {subsTasks.map((data) => {
        // Определяем, подписан ли пользователь на платформу
        const isSubscribed =
            (data.title === 'YouTube' && user.youTubeSubs) ||
            (data.title === 'TikTok' && user.tikTokSubs) ||
            (data.title === 'Instagram' && user.instagramSubs);

        // Показываем только если пользователь не подписан
        if (isSubscribed) return null;

        return (
            <div className='task-col' key={data.title}>
                <div className='task-title'>
                    <div className='task-img'>
                        <img src={data.icon} alt={data.title} />
                    </div>

                    <div className='task-info'>
                        <span>{data.title}</span>
                        <span className='task-price'>+{data.totalBalance} $Glorys</span>
                    </div>
                </div>
                <Button
                    sx={{
                        borderRadius: '19px',
                        display: 'flex',
                        textTransform: 'none',
                        marginBottom: '20px',
                        background: "rgb(31 32 35)",
                        color: "rgb(221, 219, 219)",
                        fontWeight: "700",
                    }}
                    onClick={() => handleSubscribe(data.title, data.link)}
                >
                    subscribe
                </Button>
            </div>
        );
    })}
</div>
            <div className='tasks'>
                <h4>Video Tasks</h4>
                {videoTasks.map((data) => (
                    <div className='task-col'>
                        <div className='task-title'>
                            <div className='task-img'>
                                <img src={data.icon} alt={data.title} />
                            </div>

                            <div className='task-info'>
                                <span>{data.title}</span>
                                <span className='task-price'>+{data.totalBalance} $Glorys</span></div>
                        </div>
                        <Button
                            sx={{
                                borderRadius: '19px',
                                display: 'flex',
                                textTransform: 'none',
                                marginBottom: '20px',
                                background: "rgb(31 32 35)",
                                color: "rgb(221, 219, 219)",
                                fontWeight: "700"
                            }}>watch
                        </Button>
                    </div>

                ))}
            </div>
            <Button onClick={getUserData}>test</Button>
        </div>
    )
}

export default Main

function setError(arg0: string) {
    throw new Error('Function not implemented.');
}
