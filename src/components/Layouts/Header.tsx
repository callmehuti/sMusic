import { LuUserCircle } from 'react-icons/lu';
import { useEffect, useRef, useState } from 'react';
import { removeLocalStorage } from '../../utils/localStorage';
import { token } from '../../constants';
import { useNavigate } from 'react-router-dom';
import styles from '@styles/Header.module.scss';

function Header() {
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState(false);
  const menuRef = useRef(null);

  const openMenu = () => {
    setActiveMenu(!activeMenu);
  };

  useEffect(() => {
    const cbf = (e: MouseEvent) => {
      if (menuRef.current && (e.target as Node).contains(menuRef.current)) {
        setActiveMenu(false);
        console.log('click');
      }
    };
    document.addEventListener('click', cbf);
    return () => {
      document.removeEventListener('click', cbf);
    };
  }, []);

  const onLogOut = async () => {
    try {
      // const endpoint = "/user/logout";
      // await get(endpoint);
      removeLocalStorage(token.ACT);
      removeLocalStorage(token.RFT);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.headerContainer}>
      <div className={styles.dropDownMenu} ref={menuRef}>
        <LuUserCircle onClick={openMenu} />
        <div className={`${styles.children} ${activeMenu ? styles.active : null}`}>
          <div>Profile</div>
          <div onClick={onLogOut}>Log out</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
