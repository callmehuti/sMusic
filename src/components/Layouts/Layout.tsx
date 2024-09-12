import Header from './Header'
import styles from '@styles/Layout.module.scss'
import Player from '@components/Player/Player'
import Nav from '@components/Nav/Nav'
import { Outlet } from 'react-router-dom'

const Layout = () => (
  <div className={styles.layoutContainer}>
    <Header />
    <div style={{ height: '82vh', overflow: 'hidden' }}>{<Outlet />}</div>
    <div style={{ height: '8vh' }}>
      <Player />
    </div>
    <div style={{ height: '10vh' }}>
      <Nav />
    </div>
  </div>
)

export default Layout
