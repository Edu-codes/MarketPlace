import { useNavigate } from 'react-router-dom';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { IconButton } from '@mui/material';

const BtnLogOut = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('token');
    navigate('/');
  };
  return (
    <>

      <IconButton
        onClick={handleLogout}
        sx={{
          color: 'white',
          backgroundColor: 'rgba(255,255,255,0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,0.3)',
          },
        }}
      >
        <PowerSettingsNewIcon />

      </IconButton>

    </>

  )


};

export default BtnLogOut;