import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from './interface/Loading';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Message from "./interface/Message";
import Whisper from "./pages/Whisper";
import PrivateRoute from "./components/PrivateRoutes";
import { useAppDispatch } from "./store/store";
import { useEffect, useState } from "react";
import { setLoading } from "./store/slices/loading.slice";
import { setUser } from "./store/slices/user.slice";
import { getUserApi } from "./api/authApi";

function App() {
  const dispatch = useAppDispatch();
  const [userFetched, setUserFetched] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      dispatch(setLoading(true));
      try {
        const res = await getUserApi();
        if (res.success) {
          dispatch(setUser(res.user));
        }
      } finally {
        dispatch(setLoading(false));
        setUserFetched(true);
      }
    };

    getUser();
  }, [dispatch]);

  if (!userFetched) {
    return <Loading />;
  }


  return (
    <>
      <Loading />
      <Message />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/whisper/:username" element={<Whisper />} />
          <Route element={<PrivateRoute />}>
            <Route path="/u/:username" element={<Dashboard />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
