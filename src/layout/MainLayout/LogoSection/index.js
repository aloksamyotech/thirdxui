import { ButtonBase } from '@mui/material';
import logo from '../../../assets/images/ThirdexLogo.png';

const LogoSection = ({ height = '45px', maxWidth = '120px' }) => {
  return (
    <ButtonBase disableRipple>
      <img
        src={logo}
        alt="Logo"
        style={{
          height: height,
          width: 'auto',
          maxWidth: maxWidth,
          display: 'block',
          objectFit: 'contain'
        }}
      />
    </ButtonBase>
  );
};

export default LogoSection;
