import { AuthProvider } from "./context/authContext";
import { Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import Signup from "./pages/SignUp";
import Login from "./pages/Login";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<PrivateRoute component={Chat} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  </AuthProvider>
);
}

export default App;