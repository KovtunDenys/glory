import { FC } from 'react'
import './Footer.scss'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';


const pages = [
    { name: 'Home', icon: <HomeIcon />, path:"/" },
    { name: 'Mine', icon: <MonetizationOnIcon />, path:"/mining" },
    { name: 'Invite', icon: <PeopleIcon />, path:"/friends" },
    { name: 'Leaders', icon: <EmojiEventsIcon />, path:"/leaderboard" }
  ];

const Footer: FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  sx={{
                    my: 2,
                    color: 'white',
                    display: 'flex',
                    flexDirection: 'column', 
                    alignItems: 'center',
                  }}
                  href={`${page.path}`}
                >
                  {page.icon}
                  <Typography sx={{ mt: 1 }}>{page.name}</Typography>
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

    )
}

export default Footer