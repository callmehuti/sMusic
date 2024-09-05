import styles from "./nav.module.scss";

// icons
import { VscHome } from "react-icons/vsc";
import { BiSearchAlt } from "react-icons/bi";
import { RiPlayList2Fill } from "react-icons/ri";
import {  NavLink } from "react-router-dom";

function Nav() {
  return (
    <div
      // style={{
      //   display: "flex",
      //   justifyContent: "space-evenly",
      //   alignItems: "center",
      // }}
      className={styles.navContainer}
    >
      <NavLink to="/" className={({ isActive }) => (isActive ? `${styles.active} ${styles.btnContainer}` : styles.btnContainer )}>
        <VscHome />
        <p>Trending</p>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => (isActive ? `${styles.active} ${styles.btnContainer}` : styles.btnContainer )}>
        <BiSearchAlt />
        <p>Search</p>
      </NavLink>
      <NavLink to="/playlist" className={({ isActive }) => (isActive ? `${styles.active} ${styles.btnContainer}` : styles.btnContainer )}>
        <RiPlayList2Fill />
        <p>Playlist</p>
      </NavLink>
    </div>
  );
}

export default Nav;
