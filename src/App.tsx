import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import Friends from './pages/Friends';
import Mining from './pages/Mining';
import Main from './pages/Main';
// import Leaders from './pages/Leaders';
import Airdrop from './pages/Airdrop';
import { Leaderboard, LeaderboardSharp } from '@mui/icons-material';
import { Buffer } from 'buffer';
import Leaders from './pages/Leaders';

if (!window.Buffer) {
    window.Buffer = Buffer;
}

if (!window.Telegram) {
  window.Telegram = {
    WebApp: {
      initData: '',
      initDataUnsafe: {
        user: {
          id: 1,
          is_bot: false,
          first_name: 'Test',
          username: 'testuser',
        },
      },
      ready: () => console.log('Telegram WebApp ready'),
      close: () => console.log('Closing WebApp'),
      sendData: (data: string) => console.log('Sending data:', data),
    },
  };
}


function App() {
  return (
    <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/mining" element={<Mining />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/leaderboard" element={<Leaders/>} />
        <Route path="/airdrop" element={<Airdrop/>} />
      </Routes>
    </Layout>
  </Router>
  );
}

export default App;
