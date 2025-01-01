import './login.scss'
import { Box, Button, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Contexts/AuthContext';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InstagramIcon from '@mui/icons-material/Instagram';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
import TextField from '@mui/material/TextField';
import links from '../../../Constants/links';
import CircularProgress from '@mui/material/CircularProgress';
import { initializeCSRF } from '../../../Contexts/csrf_utils';
import API from '../../../Contexts/TokenRequest';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';


interface LoginResponse {
  access: string;
  data:{
    is_staff: boolean;
    id: number;
  }
}

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loader, setLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    const { login } = useAuth();
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
      initializeCSRF();
    }, []);
    

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      setLoader(true);
      try {
        const response = await API.post<LoginResponse>('/profile/login/', {
          username,
          password,
        });
        
        const {is_staff} = response.data.data;
        const access = response.data.access;
        const id = response.data.data.id;
        
        login(access, is_staff, id);
        setLoader(false);
        if (rememberMe === true) {
          localStorage.setItem('access', access);
          localStorage.setItem('is_staff', JSON.stringify(is_staff));
          localStorage.setItem('id', JSON.stringify(id));
        } else {
          sessionStorage.setItem('access', access);
          sessionStorage.setItem('is_staff', JSON.stringify(is_staff));
          sessionStorage.setItem('id', JSON.stringify(id));
        }
        if (is_staff === true) {
          navigate('/admin-dashboard');
        } else {
          navigate('/client-dashboard');
        }
      } catch (error) {
        console.error(error);
        setError('username yoki parol xato');
        setLoader(false);
      }
    };
    

    return (
      <div className='login'>
        <Container fixed>
            <Box className='login-box'>
                <div className="left">
                    <div className="content">
                      <h2>Shaxsiy kabinet</h2>
                      <div className="icons">
                        <Link className='icon' to={links.instagram}><InstagramIcon /></Link>
                        <Link className='icon' to={links.telegram}><TelegramIcon /></Link>
                        <Link className='icon' to={links.github}><GitHubIcon /></Link>
                      </div>

                      <Box onSubmit={handleLogin} component="form" sx={{ '& > :not(style)': { m: 2, width: '50ch', margin: 'auto', marginTop: '20px', display: 'flex', flexDirection: 'column' } }} noValidate autoComplete="off" >
                        <TextField onChange={(e) => setUsername(e.target.value)} id="filled-basic" label="username" variant="filled" color='primary'/>
                        <TextField id="filled-password-input" onChange={(e) => setPassword(e.target.value)} label="parol" type="password" autoComplete="current-password" variant="filled" />
                        <FormGroup>
                          <FormControlLabel control={<Checkbox defaultChecked onChange={(e) => setRememberMe(e.target.checked)} style={{color: '#000'}}/>} label="Eslab qolish" />
                        </FormGroup>
                        {error && <p className='error'>{error}</p>}
                        <Button className='button' type="submit" variant="contained" color="primary" disableElevation>{loader ? <CircularProgress size={20} color="inherit"/> : 'Kirish'}</Button>
                      </Box>

                      <div className="links">
                        <Link className='link' to="/">Bosh sahifa</Link>
                        <Link className='link' to="/forgot">Parolni unutdingizmi ?</Link>
                      </div>
                    </div>
                </div>
                <div className="right">
                  <div className="content">
                    <h1 className='animate__animated animate__fadeIn'>PROHUB - XUSH KELIBSIZ</h1>
                    <p>Ilmingiz ziyoda bo'lishi uchun harakatdamiz !</p>
                    <Link to="/register" className='link'><Button className='button'>Ro'yhatdan o'tish</Button></Link>
                  </div>
                </div>
            </Box>
        </Container>
      </div>
    )
  }
  
  export default Login;