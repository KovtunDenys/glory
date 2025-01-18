import { FC, useEffect, useState } from 'react'
import './Leaders.scss'
import { List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { getAllUsers } from '../firebase/firebaseServices'; 

const Leaders: FC = () => {
  const [leaders, setLeaders] = useState<{ userName: string, points: number }[]>([]);

  useEffect(() => {
    const fetchLeaders = async () => {
      try {
        const allUsers = await getAllUsers(); 
        const sortedLeaders = allUsers
          .sort((a, b) => b.points - a.points)
          .slice(0, 5); 
        
        setLeaders(sortedLeaders);
      } catch (error) {
        console.error('Error fetching leaders:', error);
      }
    };

    fetchLeaders();
  }, []);

  return (
    <div className="leaders-container">
      <div className="title">
        <Typography variant="h4" align="center" sx={{ color: '#e6e6e6' }}>Leaders</Typography>
      </div>

      <img src="/ranks.svg" alt="Rank Image" className="rank-image"/>

      <List>
        {leaders.map((leader, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <Typography variant="h6" color="primary" sx={{ color: '#e6e6e6' }}>{index + 1}</Typography>
            </ListItemIcon>
            <ListItemText 
              primary={<Typography sx={{ color: '#e6e6e6', fontSize: 22, fontStyle:"italic"}}>{leader.userName} ({leader.points})</Typography>} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
}

export default Leaders;
