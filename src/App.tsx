import { Routes, Route } from "react-router-dom";
import SignInUp from "./components/SignInUp/SignInUp.js";
import Trending from "./pages/Trending.js";
import Search from "./pages/Search.js";
import Playlist from "./pages/Playlist.js";
import PrivateRouter from "./middleware/PrivateRouter.js";
function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRouter />}>
          <Route path="/" element={<Trending />}></Route>
          <Route path="/search" element={<Search />}></Route>
          <Route path="/playlist" element={<Playlist />}></Route>
        </Route>
        <Route path="/login" element={<SignInUp />}></Route>
      </Routes>
    </>
  );
}

export default App;
