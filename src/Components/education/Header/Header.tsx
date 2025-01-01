import { Container } from '@mui/material'
import './header.scss'
import logo from '../../../Constants/logo'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import API from '../../../Contexts/TokenRequest';


  const Header = () => {
    const [user, setUser] = useState<{ is_staff: boolean; first_name: string, last_name: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
          const accessToken = localStorage.getItem("access");
          const id = localStorage.getItem("id");
          const is_staff = localStorage.getItem("is_staff");
    
          try {
            const response = await API.get(`/profile/control/${id}/`, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });
            
            setUser(response.data);
            if (is_staff !== null) {
                setUser({ is_staff: JSON.parse(is_staff) , first_name: response.data.first_name, last_name: response.data.last_name});
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchUser();
      }, []);
    
    

    return (
      <div className='header'>
        <Container fixed>
            <div id="navbar">
                <Link to={"/"}><img src={logo.src} alt="" /></Link>
                <div className="links">
                    <Link className='link' to="/courses">Kurslarimiz</Link>
                    <Link className='link' to="/examination">Imtihon tizimi</Link>
                    <Link className='link' to="/about">Biz haqimizda</Link>
                    <Link className='link' to="/contact">Bog'lanish</Link>
                </div>
                {user?.is_staff === true && <Link className='linker' to="/admin-dashboard">{user.first_name} {user.last_name}</Link>}
                {user?.is_staff === false && <Link className='linker' to="/client-dashboard">{user.first_name} {user.last_name}</Link>}
                {!user && <Link className='linker' to="/login">Login</Link>}
            </div>
        </Container>
      </div>
    )
  }

  export default Header
