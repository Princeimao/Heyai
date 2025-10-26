import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout";
import HomeLayout from "./layout/HomeLayout";
import Ask from "./pages/Ask";
import CreatePass from "./pages/CreatePass";
import Home from "./pages/Home";
import Login from "./pages/Login";
import OtpVerification from "./pages/OtpVerification";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<HomeLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/:chatId" element={<Ask />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="auth/login" element={<Login />} />
          <Route path="auth/create-password" element={<CreatePass />} />
          <Route path="auth/verify-otp" element={<OtpVerification />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
