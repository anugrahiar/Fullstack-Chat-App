import NavBar from "./components/NavBar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route,Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useThemeStore } from "./store/useThemeStore";
import { useEffect } from "react";

import {Loader} from "lucide-react";
import { Toaster } from "react-hot-toast";

const App = () => {

  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
  const { theme } = useThemeStore();
  
  console.log({ onlineUsers });

  // Run the checkAuth function when the component mounts
  useEffect(() => {   // this is hook which parse the fucntion values as true or false from useAuthStore  // checkAuth is the fucntion to check user authentication
     checkAuth()  // Check if the user is authenticated
  }, [checkAuth]);  // Dependency array ensures this runs only once on mount
  
  console.log({ authUser });

  if(isCheckingAuth && !authUser){
        return (
          <div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin" />
           </div>
        )
  }

  return (
    <div data-theme={theme}>

      <NavBar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />

    </div>
  )
  
};
export default App;