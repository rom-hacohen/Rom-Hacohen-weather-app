import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Favorites from "./pages/Favorites";
import Notification from "./components/Notification";
import { notificationActions } from "./store/notification-slice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.Alert.notification);
  useEffect(() => {
    setTimeout(() => {
      dispatch(notificationActions.hideNotification());
    }, 3000);
  }, [notificationActions, dispatch]);
  return (
    <div>
      <Navbar/>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/favorites" element={<Favorites/>} />
      </Routes>

    </div>
  );
}

export default App;
