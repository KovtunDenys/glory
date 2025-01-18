import { FC, useEffect, useState } from 'react';
import "./Minig.scss";
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from "@mui/icons-material/Close";
import SendTonTransaction from '../components/SendTonTransaction';
import { useDispatch, useSelector } from 'react-redux';
import { updateMiningInFirebase } from '../firebase/firebaseServices';
import { addPoints} from '../features/userSlice';

const qualifications = [
  {
    title: "3x mining rig power",
    boost: 1000,
    ton: "0.2"
  },
  {
    title: "5x mining rig power",
    boost: 1000,
    ton: '0.5'
  },
  {
    title: "10x mining rig power",
    boost: 1000,
    ton: '1.0'
  },
];

const Mining: FC = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [open, setOpen] = useState(false);
  const [open2, set2Open] = useState(false);
  const [selectedTon, setSelectedTon] = useState<string | null>(null);
  const [selectedBoost, setSelectedBoost] = useState<number | null>(null);

  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handle2Open = () => {
    setOpen(false);
    set2Open(true);
  };
  const handle2Close = () => set2Open(false);

  const handleQualificationSelect = (ton: string, boost: number) => {
    setSelectedTon(ton);
    setSelectedBoost(boost);
    handle2Open();
  };

  useEffect(() => {
    if (user.lastMining) {
      const lastMiningDate = new Date(user.lastMining);
      const now = new Date();
      const difference = now.getTime() - lastMiningDate.getTime();
      const eightHours = 7 * 1000;

      if (difference < eightHours) {
        setTimeLeft(eightHours - difference);
      }
    }
  }, [user.lastMining]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft((prevTime) => Math.max(0, prevTime - 1000));
        setIsAnimating(true)
        if (timeLeft - 1000 <= 0) {
          setIsAnimating(false)
          setTimeLeft(0);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const miningStart = () => {
    if (typeof user.points !== 'number') {
      console.error("User points is not a number!");
      return;
    }

    setIsAnimating(true);
    
    const updatedPoints = user.points + 100;
    const now = new Date();

    dispatch(addPoints({ points: 100}));
    updateMiningInFirebase(user.id, updatedPoints, now);
  };

  const formatTime = (time: number) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="mining-container">
      <div className="mining-animation">
        <div className="minig-balance">
          Balance {user.points}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundImage: `url('/fanbg.webp')`,
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat',
            backgroundPositionY: '6px',
            height: '150px',
            width: '150px',
            borderRadius: '50%',
            border: '4px solid rgb(97 97 97)',
            margin: '10px'
          }}
        >
          <img
            src="/fan.webp"
            alt="example"
            className={isAnimating ? 'circle-animation' : ''}
            style={{
              position: 'absolute',
              height: '150px',
              width: '150px',
              zIndex: 1
            }}
          />
          <div
            style={{
              backgroundImage: `url('/logo.jpg')`,
              backgroundSize: 'contain',
              backgroundRepeat: 'repeat',
              borderRadius: '50%',
              zIndex: 2,
              width: '38px',
              height: '38px'
            }}
          ></div>
        </div>
      </div>
      <div className="mining-info">
        <h2>Mined Tokens</h2>
        <div className="token-count">{user?.points}</div>
      </div>
      <div className="mining-btn">
        <Button
          onClick={miningStart}
          variant="contained"
          disabled={timeLeft > 0}
          sx={{
            borderRadius: '16px',
            display: 'flex',
            textTransform: 'none',
            marginBottom: '20px',
            padding: '10px 20px',
            fontSize: '20px',
            width: '70%',
            backgroundColor: timeLeft > 0 ? '#666' : '#1976d2',
          }}
          className={timeLeft > 0 ? "disabled-button" : "enabled-button"}
        >
          {timeLeft > 0 ? `Wait ${formatTime(timeLeft)}` : 'Start Mining'}
        </Button>
      </div>
      <div className="mining-btn">
        <Button
          onClick={handleOpen}
          sx={{
            borderRadius: '16px',
            display: 'flex',
            textTransform: 'none',
            marginBottom: '20px',
            padding: '10px 20px',
            fontSize: '20px',
            backgroundColor: 'white',
            width: '70%',
          }}
        >
          Boost Mining
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            position: 'fixed',
            bottom: 0,
            margin: 0,
            paddingTop: 20,
            width: '100%',
            backgroundColor: '#333',
            color: 'white',
            borderRadius: '18px 18px 0 0',
          },
        }}
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogTitle style={{ margin: '0 auto' }}>Increase mining power</DialogTitle>
        <div className="boost-list" style={{ padding: '20px 0' }}>
          {qualifications.map((data, index) => (
            <div
              className="boost-col"
              key={index}
              style={{ marginBottom: '15px' }}
              onClick={() => handleQualificationSelect(data.ton, data.boost)}
            >
              <div className="boost-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url('/fanbg.webp')`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'repeat',
                    backgroundPositionY: '6px',
                    height: '50px',
                    width: '50px',
                    borderRadius: '50%',
                    border: '1px solid rgb(97 97 97)',
                    margin: '10px',
                  }}
                >
                  <img
                    src="/fan.webp"
                    alt="example"
                    className={isAnimating ? 'circle-animation' : ''}
                    style={{
                      position: 'absolute',
                      height: '50px',
                      width: '50px',
                      zIndex: 1,
                      paddingRight: '0px',
                    }}
                  />
                  <div
                    style={{
                      backgroundImage: `url('/logo.jpg')`,
                      backgroundSize: 'contain',
                      backgroundRepeat: 'repeat',
                      borderRadius: '50%',
                      zIndex: 2,
                      width: '13px',
                      height: '13px',
                    }}
                  ></div>
                </div>
                <span>{data.title}</span>
                <span style={{ marginLeft: '10px', fontWeight: '700', position: 'relative', left: '30px' }}>
                  +{data.boost}$Glorys
                </span>
              </div>
            </div>
          ))}
        </div>
      </Dialog>
      <Dialog
        open={open2}
        onClose={handle2Close}
        PaperProps={{
          style: {
            paddingTop: 20,
            width: '100%',
            backgroundColor: '#333',
            color: 'white',
            borderRadius: '18px',
          },
        }}
      >
        <SendTonTransaction
          amount={selectedTon || '0'}
          pointNumber={selectedBoost || 0}
          closeModal={handle2Close}
        />
      </Dialog>
    </div>
  );
};

export default Mining;
