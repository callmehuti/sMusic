import { Routes, Route } from 'react-router-dom'
import SignInUp from '@pages/SignInUp'
import Trending from '@pages/Trending'
import Search from '@pages/Search'
import Playlist from '@pages/Playlist'
import PrivateRouter from './middleware/PrivateRouter'
import { SkeletonTheme } from 'react-loading-skeleton'
function App() {
  return (
    <SkeletonTheme baseColor='#202020' highlightColor='#444'>
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path='/' element={<Trending />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/playlist' element={<Playlist />}></Route>
        </Route>
        <Route path='/login' element={<SignInUp />}></Route>
      </Routes>
    </SkeletonTheme>
  )
}

export default App
