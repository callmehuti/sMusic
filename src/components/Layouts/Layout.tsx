import { Outlet } from "react-router-dom";
import Header from "./Header";
import styles from "./layout.module.scss";
import Player from "../Player/Player";
import Nav from "../Nav/Nav";

export default function Layout() {
  return (
    <div className={styles.layoutContainer}>
      <Header />
      <div style={{ height: "90vh" }}>
        <Outlet />
      </div>
      <div style={{ height: "5vh" }}>
        <Player />
      </div>
      <div style={{ height: "5vh" }}>
        <Nav />
      </div>
    </div>
  );
}
