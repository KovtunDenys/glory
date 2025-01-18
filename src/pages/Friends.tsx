import './Friends.scss';
import { Button, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserNamesByIds } from '../firebase/firebaseServices';

const Friends: React.FC = () => {
  const user = useSelector((state: any) => state.user); // Типизируйте `state` для лучшей читаемости
  const [friendsName, setFriends] = useState<string[]>([]); // Состояние с типизацией массива строк
  const [error, setError] = useState<string | null>(null); // Состояние для ошибок

  const fetchInviteLink = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/getInviteLink?userId=${user.id}`);
      if (!response.ok) {
        throw new Error('Ошибка при получении ссылки');
      }

      const data = await response.json();
      if (data.inviteLink) {
        window.location.href = `https://t.me/share/url?url=${encodeURIComponent(data.inviteLink)}`;
      } else {
        throw new Error('Ссылка не найдена в ответе сервера');
      }
    } catch (err: any) {
      console.error('Произошла ошибка:', err.message);
    }
  };

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setError(null);
        const userNames = await getUserNamesByIds(user.invitedFriends);
        setFriends(userNames);
      } catch (err: any) {
        setError('Не удалось загрузить имена друзей');
      }
    };

    if (user?.invitedFriends?.length > 0) {
      fetchFriends();
    }
  }, [user.invitedFriends]);

  return (
    <div className="friends-container">
      <Typography variant="h4" gutterBottom className='title'>
        Invite friends & get more $Glorys
      </Typography>

      <Button
        onClick={fetchInviteLink}
        variant="contained"
        sx={{
          borderRadius: '16px',
          display: 'flex',
          textTransform: 'none',
          marginBottom: '20px',
          padding: '10px 20px',
          fontSize: '20px',
          width: '70%',
        }}
      >
        Invite Friend
      </Button>

      {error && <Typography color="error">{error}</Typography>}

      {friendsName.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 360, color: 'white', borderRadius: 5 }}>
          {friendsName.map((name, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: 'primary.main' }}>
                  {name.charAt(0).toUpperCase()}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={name} sx={{
                '& .MuiListItemText-primary': { color: 'white' },

              }} />
            </ListItem>
          ))}
        </List>
      ) : (
        !error && <Typography>No friends found.</Typography>
      )}
    </div>
  );
};

export default Friends;
