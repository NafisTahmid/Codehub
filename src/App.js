import { Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import Codes from "./Components/Codes/Codes";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import AuthProvider from "./Context/AuthProvider";
import PrivateOutlet from "./Components/PrivateOutlet/PrivateOutlet";
import Profile from "./Components/Profile/Profile";


function App() {
  return (

    <AuthProvider>
      <Routes>
            <Route path="/" element={<Home/>}/>
          {/* <Route path="/login" element={<Login/>}/> */}
          <Route path="/register" element={<Register/>}/>
          <Route path="/codes" element={<Codes/>}/>

          <Route path="/" element={<PrivateOutlet/>}>
            <Route path="/profile" element={<Profile/>}/>
          </Route>

          <Route path="*" element={<NotFound/>}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
