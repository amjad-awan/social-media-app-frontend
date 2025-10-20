import "./App.css";
// import Profile from "./components/Profile/Profile";
import Profile from "./pages/profile/Profile";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/chat/chat";
function App() {
  const user = useSelector((state) => {
    return state?.authReducer?.authData;
  });
  console.log("user", user);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth"/>}
        />
        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />
          <Route
          path="/chat"
          element={user ? <Chat /> : <Navigate to="../auth" />}
        />
        
        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />
        <Route path="profile/:id" element={user?<Profile/>:<Navigate to="../auth"/>}/>
      </Routes>
      {/* <Home/> */}
      {/* <Profile/> */}
      {/* <Auth /> */}
    </div>
  );
}

export default App;
